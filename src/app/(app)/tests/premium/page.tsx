'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getTopicQuestions, getTopic } from '@/lib/questions'
import { scoreAnswers, generateInsights, getOverallLabel } from '@/lib/scoring'

type Screen = 'pretest' | 'question' | 'generating' | 'done'

const GENERATING_STEPS = [
  'Reading your answers…',
  'Mapping 8 emotional domains…',
  'Finding patterns…',
  'Building your report…',
]

const FREQUENCY_OPTIONS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always']

function PremiumTestInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = searchParams.get('topic') || 'emotional-regulation'
  const topic = getTopic(topicId)
  const questions = getTopicQuestions(topicId)
  const supabase = createClient()

  const [screen, setScreen] = useState<Screen>('pretest')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [selected, setSelected] = useState<string | string[] | null>(null)
  const [genStep, setGenStep] = useState(0)
  const [reportId, setReportId] = useState<string | null>(null)

  const question = questions[currentQ]
  const isAnswered = selected !== null && (Array.isArray(selected) ? selected.length > 0 : selected !== '')

  useEffect(() => {
    const key = `imo-premium-${topicId}`
    const saved = localStorage.getItem(key)
    if (saved) {
      const { answers: a, currentQ: q } = JSON.parse(saved)
      setAnswers(a)
      setCurrentQ(q)
      if (q > 0) setScreen('question')
    }
  }, [topicId])

  useEffect(() => {
    if (screen === 'question') {
      const key = `imo-premium-${topicId}`
      localStorage.setItem(key, JSON.stringify({ answers, currentQ }))
      setSelected(answers[question?.id] ?? null)
    }
  }, [currentQ, screen])

  const handleAnswer = (val: string | string[]) => {
    setSelected(val)
    setAnswers(prev => ({ ...prev, [question.id]: val }))
  }

  const toggleMulti = (val: string) => {
    const current = Array.isArray(selected) ? selected : []
    const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val]
    setSelected(next)
    setAnswers(prev => ({ ...prev, [question.id]: next }))
  }

  const advance = async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      setSelected(answers[questions[currentQ + 1]?.id] ?? null)
    } else {
      setScreen('generating')
      runGenerating()
    }
  }

  const runGenerating = async () => {
    for (let i = 0; i < GENERATING_STEPS.length; i++) {
      setGenStep(i)
      await new Promise(r => setTimeout(r, 750))
    }
    await saveReport()
  }

  const saveReport = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setScreen('done'); return }

      const { data: children } = await supabase.from('children').select('id, name').eq('parent_id', user.id).limit(1)
      if (!children?.length) { setScreen('done'); return }

      const child = children[0]

      const { data: session } = await supabase.from('test_sessions').insert({
        child_id: child.id,
        parent_id: user.id,
        topic: topicId,
        is_free: false,
        status: 'completed',
        answers: answers as unknown as import('@/types/database').Json,
        completed_at: new Date().toISOString(),
      }).select('id').single()

      if (!session) { setScreen('done'); return }

      const domainScores = scoreAnswers(
        answers as Record<string, string | string[]>,
        questions.map(q => ({ id: q.id, type: q.type, domain: q.domain }))
      )
      const avgScore = domainScores.reduce((s, d) => s + d.score, 0) / (domainScores.length || 1)
      const overallLabel = getOverallLabel(avgScore)
      const insights = generateInsights(domainScores, child.name)

      const { data: report } = await supabase.from('reports').insert({
        session_id: session.id,
        child_id: child.id,
        parent_id: user.id,
        topic: topicId,
        overall_label: overallLabel,
        scores: domainScores as unknown as import('@/types/database').Json,
        insights: insights as unknown as import('@/types/database').Json,
      }).select('id').single()

      if (report) setReportId(report.id)

      try { await supabase.rpc('deduct_credit', { p_parent_id: user.id }) } catch { /* ignore */ }

      localStorage.removeItem(`imo-premium-${topicId}`)
    } catch (e) {
      console.error(e)
    }
    setScreen('done')
  }

  if (screen === 'pretest') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)' }}>Premium check-in</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 6, letterSpacing: '-0.02em' }}>{topic?.name}</h1>
          <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6, marginBottom: 32 }}>Ages {topic?.ageMin}+ · {topic?.questionCount} questions · ~{topic?.estimatedMinutes} minutes</p>

          <div className="rg-2col-sm" style={{ marginBottom: 28 }}>
            {[
              ['💬', 'No right or wrong answers', 'Every answer is the right one'],
              ['⏱', 'Take your time', "There's no rush at all"],
              ['🙋', 'Ask a parent if unsure', "It's okay to get help"],
              ['↩', 'You can skip anything', 'Only share what feels okay'],
            ].map(([emoji, title, sub]) => (
              <div key={title} className="card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.6 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(44,95,93,0.06)', border: '1px solid rgba(44,95,93,0.15)', borderRadius: 12, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--teal)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>🔒</span>
            <span>Your answers are private — only your parent can see the full report.</span>
          </div>

          <button className="btn btn-coral btn-lg" style={{ width: '100%' }} onClick={() => setScreen('question')}>
            Start check-in →
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'generating') {
    const circumference = 327
    const progress = ((genStep + 1) / GENERATING_STEPS.length) * circumference
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <svg width="120" height="120" style={{ marginBottom: 28 }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--teal)" strokeWidth="8"
              strokeDasharray={circumference} strokeDashoffset={circumference - progress}
              strokeLinecap="round" transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset .6s ease' }} />
            <text x="60" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--navy)">
              {Math.round(((genStep + 1) / GENERATING_STEPS.length) * 100)}%
            </text>
          </svg>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>Building your report…</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {GENERATING_STEPS.map((step, i) => (
              <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: i <= genStep ? 1 : 0.3, transition: 'opacity .4s' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: i < genStep ? 'var(--teal)' : i === genStep ? 'var(--navy)' : 'var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 700, flexShrink: 0 }}>
                  {i < genStep ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 14, color: 'var(--navy)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'done') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>✨</div>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🌟⭐🌟</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '16px 0 8px' }}>Your report is ready!</h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 36, lineHeight: 1.6 }}>
            That took courage. Great job completing the {topic?.name} check-in!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={reportId ? `/reports/${reportId}` : '/reports'} className="btn btn-coral btn-lg" style={{ display: 'block', textAlign: 'center' }}>
              View your report →
            </a>
            <a href="/tests" className="btn btn-ghost btn-lg" style={{ display: 'block', textAlign: 'center' }}>
              Back to assessments
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '14px 24px', zIndex: 10 }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600 }}>✓ Auto-saved</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{currentQ + 1} / {questions.length}</span>
            <span style={{ fontSize: 12, background: 'rgba(44,95,93,0.1)', color: 'var(--teal)', padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>{question?.domain}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} /></div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', lineHeight: 1.45, marginBottom: 36 }}>
          {question?.text}
        </h2>

        {question?.type === 'single-choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {question.options?.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} style={{
                padding: '13px 18px', borderRadius: 12, textAlign: 'left', fontSize: 15,
                border: `2px solid ${selected === opt ? 'var(--teal)' : 'var(--line)'}`,
                background: selected === opt ? 'rgba(44,95,93,0.08)' : 'var(--paper)',
                color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit', fontWeight: 500,
              }}>{opt}</button>
            ))}
          </div>
        )}

        {question?.type === 'multi-select' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', width: '100%' }}>
            {question.options?.map(opt => {
              const isSel = Array.isArray(selected) && selected.includes(opt)
              return (
                <button key={opt} onClick={() => toggleMulti(opt)} style={{
                  padding: '10px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  border: `2px solid ${isSel ? 'var(--teal)' : 'var(--line)'}`,
                  background: isSel ? 'rgba(44,95,93,0.1)' : 'var(--paper)',
                  color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>{opt}</button>
              )
            })}
          </div>
        )}

        {question?.type === 'scale' && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => handleAnswer(String(n))} style={{
                  width: 64, height: 64, borderRadius: 14, fontSize: 20, fontWeight: 800, fontFamily: 'inherit',
                  border: `2px solid ${selected === String(n) ? 'var(--teal)' : 'var(--line)'}`,
                  background: selected === String(n) ? 'var(--teal)' : 'var(--paper)',
                  color: selected === String(n) ? 'white' : 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>{n}</button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5 }}>
              <span>Not at all</span><span>Very much</span>
            </div>
          </div>
        )}

        {question?.type === 'frequency' && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {FREQUENCY_OPTIONS.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} style={{
                padding: '11px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                border: `2px solid ${selected === opt ? 'var(--teal)' : 'var(--line)'}`,
                background: selected === opt ? 'rgba(44,95,93,0.1)' : 'var(--paper)',
                color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
              }}>{opt}</button>
            ))}
          </div>
        )}

        {question?.type === 'open-text' && (
          <div style={{ width: '100%' }}>
            <textarea className="input" style={{ minHeight: 120, resize: 'vertical' }}
              placeholder="Write anything you'd like to share… (optional)"
              value={typeof selected === 'string' ? selected : ''}
              onChange={e => { setSelected(e.target.value); setAnswers(prev => ({ ...prev, [question.id]: e.target.value })) }}
            />
            <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 8 }}>Optional — skip if you prefer</p>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', background: 'var(--paper)', display: 'flex', justifyContent: 'space-between', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <button className="btn btn-ghost" onClick={() => { if (currentQ > 0) { setCurrentQ(q => q - 1); setSelected(answers[questions[currentQ - 1]?.id] ?? null) } }} disabled={currentQ === 0}>← Back</button>
        <button className="btn btn-ghost" style={{ opacity: 0.6 }} onClick={() => advance()}>Skip</button>
        <button className="btn btn-primary" onClick={() => advance()} disabled={!isAnswered && question?.type !== 'open-text'}>
          {currentQ === questions.length - 1 ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

export default function PremiumTestPage() {
  return <Suspense><PremiumTestInner /></Suspense>
}
