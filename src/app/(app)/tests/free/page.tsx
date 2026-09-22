'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FREE_QUESTIONS, type Question } from '@/lib/questions'

type Screen = 'intro' | 'question' | 'done'

const EMOJI_OPTIONS = [
  { value: 1, emoji: '😢', label: 'Not at all' },
  { value: 2, emoji: '😕', label: 'A little' },
  { value: 3, emoji: '😊', label: 'Okay' },
  { value: 4, emoji: '😄', label: 'Pretty good' },
  { value: 5, emoji: '🤗', label: 'Amazing!' },
]

export default function FreeTestPage() {
  const router = useRouter()
  const supabase = createClient()
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [selected, setSelected] = useState<string | string[] | null>(null)
  const [saving, setSaving] = useState(false)

  const question = FREE_QUESTIONS[currentQ]
  const isAnswered = selected !== null && (Array.isArray(selected) ? selected.length > 0 : selected !== '')

  useEffect(() => {
    const saved = localStorage.getItem('imo-free-test')
    if (saved) {
      const { answers: savedAnswers, currentQ: savedQ } = JSON.parse(saved)
      setAnswers(savedAnswers)
      setCurrentQ(savedQ)
      if (savedQ > 0) setScreen('question')
    }
  }, [])

  useEffect(() => {
    if (screen === 'question') {
      localStorage.setItem('imo-free-test', JSON.stringify({ answers, currentQ }))
      setSelected(answers[question?.id] ?? null)
    }
  }, [currentQ, screen])

  const handleAnswer = (val: string | string[]) => {
    setSelected(val)
    const updated = { ...answers, [question.id]: val }
    setAnswers(updated)
    if (question.type === 'emoji-scale') {
      setTimeout(() => advance(updated), 350)
    }
  }

  const toggleMulti = (val: string) => {
    const current = Array.isArray(selected) ? selected : []
    const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val]
    setSelected(next)
    setAnswers(prev => ({ ...prev, [question.id]: next }))
  }

  const advance = (updatedAnswers?: Record<number, string | string[]>) => {
    const ans = updatedAnswers ?? answers
    if (currentQ < FREE_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1)
      setSelected(ans[FREE_QUESTIONS[currentQ + 1]?.id] ?? null)
    } else {
      saveAndFinish(ans)
    }
  }

  const saveAndFinish = async (finalAnswers: Record<number, string | string[]>) => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: children } = await supabase.from('children').select('id').eq('parent_id', user.id).limit(1)
        if (children?.length) {
          await supabase.from('test_sessions').insert({
            child_id: children[0].id,
            parent_id: user.id,
            topic: 'emotional-awareness',
            is_free: true,
            status: 'completed',
            answers: finalAnswers as unknown as import('@/types/database').Json,
            completed_at: new Date().toISOString(),
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
    localStorage.removeItem('imo-free-test')
    setSaving(false)
    setScreen('done')
  }

  const skip = () => {
    if (currentQ < FREE_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1)
      setSelected(answers[FREE_QUESTIONS[currentQ + 1]?.id] ?? null)
    } else {
      saveAndFinish(answers)
    }
  }

  if (screen === 'intro') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌟</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--navy)', marginBottom: 12, letterSpacing: '-0.02em' }}>My Feelings Discovery</h1>
          <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 32 }}>
            This is a chance to explore your feelings — there are <strong>no right or wrong answers</strong>!
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
            {[['💚', 'Be honest'], ['⏰', 'Take your time'], ['🙋', 'Ask if unsure'], ['↩', 'Skip anything']].map(([emoji, label]) => (
              <div key={label} style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>
                {emoji} {label}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 36, fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6 }}>
            <span>10 questions</span><span>·</span><span>3–4 minutes</span><span>·</span><span>Ages 7–8</span>
          </div>
          <button className="btn btn-coral btn-lg" style={{ width: '100%' }} onClick={() => setScreen('question')}>
            Ready? Let&apos;s go! →
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'done') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>⭐</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Amazing job! You did it!</h1>
          <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 36 }}>Here&apos;s a little peek at your emotional snapshot.</p>

          <div className="card" style={{ marginBottom: 20, padding: 28, textAlign: 'left' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Your Emotional Awareness</h3>
            {[
              { label: 'Understanding feelings', pct: 80 },
              { label: 'Talking about feelings', pct: 65 },
              { label: 'Caring for others', pct: 75 },
              { label: 'Asking for help', pct: 70 },
            ].map(({ label, pct }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>
                  <span>{label}</span><span style={{ color: 'var(--teal)' }}>{pct}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: 'var(--teal)' }} /></div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(30,58,95,0.04)', border: '1px dashed var(--line)', borderRadius: 14, padding: 20, marginBottom: 28 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🔒</div>
            <p style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 600, marginBottom: 4 }}>Your parent&apos;s full report is ready</p>
            <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6 }}>Sign up to unlock the complete report with detailed insights and conversation starters.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="/tests" className="btn btn-teal btn-lg" style={{ display: 'block', textAlign: 'center' }}>See what&apos;s next →</a>
            <a href="/login?tab=signup" className="btn btn-coral btn-lg" style={{ display: 'block', textAlign: 'center' }}>Sign up for full report</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '14px 24px', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, maxWidth: 640, margin: '0 auto 10px' }}>
          <span style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600 }}>✓ Auto-saved</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Question {currentQ + 1} of {FREE_QUESTIONS.length}</span>
          <span style={{ fontSize: 12, background: 'rgba(44,95,93,0.1)', color: 'var(--teal)', padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>{question.domain}</span>
        </div>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentQ + 1) / FREE_QUESTIONS.length) * 100}%` }} /></div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {FREE_QUESTIONS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < currentQ ? 'var(--teal)' : i === currentQ ? 'var(--coral)' : 'var(--line)', transition: 'background .3s' }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.6vw, 34px)', fontWeight: 700, color: 'var(--navy)', textAlign: 'center', lineHeight: 1.4, marginBottom: 8 }}>
          {question.text}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.5, textAlign: 'center', marginBottom: 36 }}>
          {question.type === 'emoji-scale' ? 'Tap the face that shows how you feel.' :
           question.type === 'multi-select' ? 'Choose all that apply.' :
           question.type === 'single-choice' ? 'Choose one answer.' : ' '}
        </p>

        {question.type === 'emoji-scale' && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {EMOJI_OPTIONS.map(opt => {
              const isSel = selected === String(opt.value)
              return (
                <button key={opt.value} onClick={() => handleAnswer(String(opt.value))} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '18px 20px', borderRadius: 22,
                  border: `2px solid ${isSel ? 'var(--coral)' : 'var(--line)'}`,
                  background: isSel ? 'var(--coral-soft)' : 'var(--paper)',
                  cursor: 'pointer', minWidth: 88,
                  transform: isSel ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: isSel ? '0 4px 16px rgba(232,165,152,0.4)' : 'none',
                  transition: 'all .18s cubic-bezier(.4,0,.2,1)',
                }}>
                  <span style={{ fontSize: 36 }}>{opt.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)' }}>{opt.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {question.type === 'single-choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {question.options?.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} style={{
                padding: '14px 20px', borderRadius: 12, textAlign: 'left', fontSize: 15, fontWeight: 500,
                border: `2px solid ${selected === opt ? 'var(--teal)' : 'var(--line)'}`,
                background: selected === opt ? 'rgba(44,95,93,0.08)' : 'var(--paper)',
                color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit',
              }}>{opt}</button>
            ))}
          </div>
        )}

        {question.type === 'multi-select' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', width: '100%' }}>
            {question.options?.map(opt => {
              const isSelected = Array.isArray(selected) && selected.includes(opt)
              return (
                <button key={opt} onClick={() => toggleMulti(opt)} style={{
                  padding: '10px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                  border: `2px solid ${isSelected ? 'var(--teal)' : 'var(--line)'}`,
                  background: isSelected ? 'rgba(44,95,93,0.1)' : 'var(--paper)',
                  color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>{opt}</button>
              )
            })}
          </div>
        )}

        {question.type === 'scale' && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => handleAnswer(String(n))} style={{
                  width: 60, height: 60, borderRadius: 12, fontSize: 18, fontWeight: 700, fontFamily: 'inherit',
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

        {question.type === 'open-text' && (
          <div style={{ width: '100%' }}>
            <textarea
              className="input"
              style={{ minHeight: 120, resize: 'vertical' }}
              placeholder="Write anything you'd like to share… (optional)"
              value={typeof selected === 'string' ? selected : ''}
              onChange={e => { setSelected(e.target.value); setAnswers(prev => ({ ...prev, [question.id]: e.target.value })) }}
            />
            <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 8 }}>Optional — skip if you prefer</p>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', background: 'var(--paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <button className="btn btn-ghost" onClick={() => { if (currentQ > 0) { setCurrentQ(q => q - 1); setSelected(answers[FREE_QUESTIONS[currentQ - 1]?.id] ?? null) } }} disabled={currentQ === 0}>← Back</button>
        <button className="btn btn-ghost" style={{ opacity: 0.6 }} onClick={skip}>Skip</button>
        <button className="btn btn-primary" onClick={() => advance()} disabled={!isAnswered && question.type !== 'open-text'}>
          {currentQ === FREE_QUESTIONS.length - 1 ? (saving ? 'Saving…' : 'Finish ✓') : 'Next →'}
        </button>
      </div>
    </div>
  )
}
