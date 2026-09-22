'use client'
import { useState } from 'react'
import Link from 'next/link'

type View = 'parent' | 'child'

const DOMAIN_SCORES = [
  { domain: 'Emotional Awareness', score: 4, trend: '↑', benchmark: 'Above typical for age 9', color: '#2C5F5D' },
  { domain: 'Emotional Regulation', score: 3, trend: '→', benchmark: 'Typical for age 9', color: '#8FA598' },
  { domain: 'Stress & Resilience', score: 3, trend: '↑', benchmark: 'Typical for age 9', color: '#2C5F5D' },
  { domain: 'Empathy & Social Sense', score: 4, trend: '↑', benchmark: 'Above typical for age 9', color: '#2C5F5D' },
  { domain: 'Relationships & Trust', score: 3, trend: '→', benchmark: 'Typical for age 9', color: '#8FA598' },
  { domain: 'Self-Perception', score: 4, trend: '↑', benchmark: 'Above typical for age 9', color: '#2C5F5D' },
  { domain: 'Identity & Authenticity', score: 3, trend: '→', benchmark: 'Developing — typical for age 9', color: '#8FA598' },
  { domain: 'Meaning & Purpose', score: 3, trend: '→', benchmark: 'Typical for age 9', color: '#8FA598' },
]

const RADAR_POINTS = DOMAIN_SCORES.map((d, i) => {
  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
  const r = (d.score / 5) * 80
  return { x: 100 + r * Math.cos(angle), y: 100 + r * Math.sin(angle) }
})

const OUTER_POINTS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
  return { x: 100 + 80 * Math.cos(angle), y: 100 + 80 * Math.sin(angle) }
})

function RadarChart() {
  const polyPoints = RADAR_POINTS.map(p => `${p.x},${p.y}`).join(' ')
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {[0.25, 0.5, 0.75, 1].map(r => (
        <polygon key={r} points={OUTER_POINTS.map(p => {
          const dx = p.x - 100, dy = p.y - 100
          return `${100 + dx * r},${100 + dy * r}`
        }).join(' ')} fill="none" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />
      ))}
      {OUTER_POINTS.map((p, i) => <line key={i} x1="100" y1="100" x2={p.x} y2={p.y} stroke="rgba(245,243,239,0.1)" strokeWidth="1" />)}
      <polygon points={polyPoints} fill="rgba(44,95,93,0.4)" stroke="rgba(44,95,93,0.8)" strokeWidth="2" />
      {RADAR_POINTS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--coral)" />)}
    </svg>
  )
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const [view, setView] = useState<View>('parent')
  const [notes, setNotes] = useState('')

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 0 80px' }}>
      <div style={{ padding: '24px 32px', fontSize: 13, color: 'var(--navy)', opacity: 0.5 }}>
        <Link href="/reports">Reports</Link> <span style={{ margin: '0 6px' }}>›</span> Emotional Awareness · Maya
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 32px 24px', gap: 4 }}>
        <button onClick={() => setView('parent')} style={{
          padding: '8px 16px', borderRadius: '8px 0 0 8px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          background: view === 'parent' ? 'var(--navy)' : 'var(--paper)', color: view === 'parent' ? 'white' : 'var(--navy)',
          border: '1px solid var(--line)', cursor: 'pointer',
        }}>Parent view</button>
        <button onClick={() => setView('child')} style={{
          padding: '8px 16px', borderRadius: '0 8px 8px 0', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
          background: view === 'child' ? 'var(--coral)' : 'var(--paper)', color: view === 'child' ? 'var(--navy-ink)' : 'var(--navy)',
          border: '1px solid var(--line)', cursor: 'pointer',
        }}>Child summary</button>
      </div>

      {view === 'child' && (
        <div style={{ padding: '0 32px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--coral) 0%, var(--coral-soft) 100%)', borderRadius: 24, padding: '40px 36px', marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Your Emotional Snapshot</h1>
            <p style={{ fontSize: 16, color: 'var(--navy)', opacity: 0.7 }}>Maya · Age 9 · Emotional Awareness</p>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 16, padding: '0 4px' }}>Your superpowers ✨</h3>
          <div className="rg-3up-sm" style={{ marginBottom: 24 }}>
            {[
              { emoji: '💚', title: 'You really care', body: "You notice when others feel sad or left out, and you try to help. That's a real gift." },
              { emoji: '🌟', title: 'You know your feelings', body: "You're good at noticing how you feel — even when it's hard. That takes courage!" },
              { emoji: '🧘', title: 'You take care of yourself', body: "You've found some things that help when you're upset. Keep using them!" },
            ].map(s => (
              <div key={s.title} className="card" style={{ padding: 20, textAlign: 'center', background: 'rgba(44,95,93,0.06)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="rg-2col-sm" style={{ marginBottom: 32 }}>
            {[
              { emoji: '🌱', title: 'Something growing', body: "It can sometimes be hard to calm down quickly when upset. Lots of people find this tricky — it gets easier with practice!" },
              { emoji: '💡', title: 'A little idea to try', body: 'Next time you feel big feelings, try taking 3 slow breaths. See if that helps!' },
            ].map(s => (
              <div key={s.title} className="card" style={{ padding: 20, background: 'rgba(232,165,152,0.1)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--navy)', borderRadius: 16, padding: '24px 28px', color: 'var(--cream)', textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
            <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Your parent&apos;s full report has more details.</p>
            <p style={{ fontSize: 13, opacity: 0.55 }}>Ask your parent to show you if you&apos;re curious!</p>
          </div>
          <div style={{ background: 'var(--coral-soft)', borderRadius: 16, padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>You&apos;re doing amazing! 🌟</p>
            <p style={{ fontSize: 14, color: 'var(--navy)', opacity: 0.7 }}>Every feeling you notice is a step toward knowing yourself better.</p>
          </div>
        </div>
      )}

      {view === 'parent' && (
        <>
          <div className="rg-report-hdr" style={{ background: 'var(--navy)', margin: '0 32px 24px', borderRadius: 20, padding: '36px 40px', color: 'var(--cream)' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.5)', marginBottom: 10 }}>Parent Report</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>Emotional Awareness</h1>
              <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.65)', marginBottom: 16 }}>Maya · Age 9 · May 28, 2026</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(44,95,93,0.3)', padding: '6px 16px', borderRadius: 999 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 700 }}>Developing Well</span>
              </div>
              <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(245,243,239,0.65)', lineHeight: 1.65, maxWidth: 480 }}>
                Maya shows strong emotional awareness for her age, with particular strengths in empathy and recognising her own feelings. Some gentle support with regulation will help her continue to grow.
              </p>
            </div>
            <RadarChart />
          </div>

          <div style={{ padding: '0 32px 24px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 16 }}>Domain Breakdown</h2>
            <div className="rg-2col-sm" style={{ marginBottom: 0 }}>
              {DOMAIN_SCORES.map(d => (
                <div key={d.domain} className="card" style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14 }}>{d.domain}</span>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 16 }}>{d.trend}</span>
                      <span style={{ fontWeight: 800, color: d.color, fontSize: 16 }}>{d.score}/5</span>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: 8, marginBottom: 8 }}>
                    <div className="progress-fill" style={{ width: `${(d.score / 5) * 100}%`, background: d.color }} />
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.55 }}>{d.benchmark}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '0 32px 24px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 16 }}>Insights & Patterns</h2>
            <div className="rg-3up-sm">
              {[
                { color: 'rgba(44,95,93,0.08)', border: 'rgba(44,95,93,0.2)', label: '✓ Strength', title: 'Strong empathetic awareness', body: "Maya consistently demonstrates awareness of others' emotional states and responds with care and concern." },
                { color: 'rgba(44,95,93,0.08)', border: 'rgba(44,95,93,0.2)', label: '✓ Strength', title: 'Good self-knowledge', body: 'She shows a clear ability to name and describe her own feelings, an important foundation for regulation.' },
                { color: 'rgba(232,165,152,0.15)', border: 'rgba(232,165,152,0.4)', label: '🌱 Growth area', title: 'Regulation in the moment', body: 'Maya may benefit from more tools and practice for managing intense feelings when they arise.' },
              ].map(item => (
                <div key={item.title} style={{ background: item.color, border: `1px solid ${item.border}`, borderRadius: 14, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 8 }}>{item.label}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.55 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '0 32px 24px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 16 }}>Recommended Actions</h2>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, opacity: 0.7 }}>Conversation starters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                '"What\'s one thing that made you feel really good this week, Maya?"',
                '"Is there anything that\'s been worrying you lately? We can talk about it together."',
                '"What does it feel like when you\'re really happy? Where do you feel it in your body?"',
              ].map(q => (
                <div key={q} style={{ display: 'flex', gap: 12, padding: '14px 18px', background: 'var(--paper)', borderRadius: 12, border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 18 }}>💬</span>
                  <p style={{ fontSize: 14, color: 'var(--navy)', fontStyle: 'italic', lineHeight: 1.5 }}>{q}</p>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, opacity: 0.7 }}>Activities</h3>
            <div className="rg-2col-sm" style={{ marginBottom: 24 }}>
              {[
                '📓 Feelings journal — draw or write one feeling per day',
                '🌹 Rose & thorn at dinner — everyone shares one good and one hard thing',
                '🧘 Create a "calm-down kit" with things that help when upset',
                '📚 Read books together that feature characters working through feelings',
              ].map(a => (
                <div key={a} style={{ padding: '12px 16px', background: 'var(--cream-deep)', borderRadius: 12, fontSize: 14, color: 'var(--navy)', lineHeight: 1.5 }}>{a}</div>
              ))}
            </div>
            <div style={{ background: 'rgba(232,165,152,0.12)', border: '1px solid rgba(232,165,152,0.3)', borderRadius: 14, padding: '16px 20px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>🌿 When to consider professional support</p>
              <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.6 }}>
                Maya&apos;s results don&apos;t indicate any immediate concerns. If you ever notice persistent sadness, significant changes in behaviour, or anything that genuinely worries you, speaking with your paediatrician or a child psychologist is always a good step.
              </p>
            </div>
          </div>

          <div style={{ padding: '0 32px 24px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 16 }}>Changes Over Time</h2>
            <div className="card" style={{ padding: 28, textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.55 }}>This is Maya&apos;s first assessment. Longitudinal tracking will appear here after the next check-in.</p>
              <Link href="/tests" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Schedule next check-in</Link>
            </div>
          </div>

          <div style={{ padding: '0 32px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 12 }}>Private Parent Notes</h2>
            <textarea
              className="input"
              style={{ minHeight: 120, resize: 'vertical' }}
              placeholder="Add private notes about this assessment — only you can see these…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={() => alert('Notes saved!')}>Save notes</button>
          </div>
        </>
      )}

      <div style={{ padding: '32px 32px 0', display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" onClick={() => window.print()}>Download PDF</button>
        <button className="btn btn-ghost">Email report</button>
        <button className="btn btn-ghost">Share with therapist</button>
      </div>
    </div>
  )
}
