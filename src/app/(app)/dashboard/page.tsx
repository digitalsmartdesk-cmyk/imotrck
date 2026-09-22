import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const MOCK_REPORTS = [
  { id: 1, topic: 'Emotional Awareness', date: 'May 28, 2025', result: 'strong', resultLabel: 'Strong' },
  { id: 2, topic: 'Emotional Regulation', date: 'May 14, 2025', result: 'developing', resultLabel: 'Developing' },
  { id: 3, topic: 'Stress & Resilience', date: 'Apr 30, 2025', result: 'support', resultLabel: 'Needs Support' },
]

const MAYA_DOMAINS = [
  { name: 'Emotional Awareness', score: 4 },
  { name: 'Emotional Regulation', score: 3 },
  { name: 'Empathy & Social Sense', score: 4 },
  { name: 'Stress & Resilience', score: 2 },
]

function DomainBar({ name, score }: { name: string; score: number }) {
  const pct = (score / 5) * 100
  const color = score >= 4 ? 'var(--teal)' : score === 3 ? 'var(--sage)' : 'var(--coral)'
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy-ink)' }}>{name}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{score}/5</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const hour = today.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Top Bar */}
      <div className="dash-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Maya', 'Leo'].map((child, i) => (
            <button key={child} style={{
              padding: '7px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
              border: '1px solid',
              borderColor: i === 0 ? 'var(--teal)' : 'var(--line)',
              background: i === 0 ? 'var(--teal)' : 'transparent',
              color: i === 0 ? 'var(--cream)' : 'var(--navy)',
              cursor: 'pointer',
            }}>
              {child}
            </button>
          ))}
        </div>
        <div className="dash-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--line)',
            background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 18,
          }}>🔔</button>
          <Link href="/tests">
            <button className="btn btn-coral">Take new test</button>
          </Link>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          {greeting}, Sara 👋
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(30,58,95,0.55)', fontSize: 14 }}>
          <span>{dateStr}</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          <span>💡 Small wins matter — celebrate progress, not perfection.</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="rg-stats">
        {[
          { label: 'Total assessments', value: '3', sub: 'completed so far' },
          { label: 'Last assessment', value: 'May 28', sub: '4 days ago' },
          { label: 'Wellness trend', value: '↑ Improving', sub: 'vs. last month', highlight: true },
          { label: 'Credits remaining', value: '2 credits', sub: 'add more anytime' },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ padding: '20px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(30,58,95,0.45)', marginBottom: 8 }}>
              {stat.label}
            </div>
            <div className="serif" style={{ fontSize: 32, color: stat.highlight ? 'var(--teal)' : 'var(--navy)', marginBottom: 3, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(30,58,95,0.5)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Next Up Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--teal) 0%, #1f4745 100%)',
        borderRadius: 20, padding: '28px 32px',
        marginBottom: 28,
      }}>
        <div className="nextup-inner">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.6)', marginBottom: 8 }}>
            Recommended next
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--cream)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Emotional Regulation
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.75)', margin: '0 0 0', maxWidth: 480 }}>
            Learn how Maya manages her emotional reactions. This 18-question check-in takes about 6 minutes and uses 1 credit.
          </p>
        </div>
          <Link href="/tests/premium?topic=emotional-regulation" className="nextup-btn">
            <button style={{
              background: 'var(--cream)', color: 'var(--teal)', fontWeight: 700,
              fontSize: 14.5, padding: '12px 22px', borderRadius: 999,
              border: 'none', cursor: 'pointer',
            }}>
              Start this check-in →
            </button>
          </Link>
        </div>
      </div>

      {/* Two-column section */}
      <div className="rg-dash2">

        {/* Recent Reports */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Recent Reports</h3>
            <Link href="/reports" style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {MOCK_REPORTS.map(report => (
              <div key={report.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 0', borderBottom: '1px solid var(--line)',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy-ink)', marginBottom: 3 }}>{report.topic}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(30,58,95,0.5)' }}>{report.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge badge-${report.result}`}>{report.resultLabel}</span>
                  <Link href={`/reports/${report.id}`} style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maya's Snapshot */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Maya&apos;s Snapshot</h3>
            <span style={{ fontSize: 12, color: 'rgba(30,58,95,0.45)', fontWeight: 500 }}>Age 9</span>
          </div>
          {MAYA_DOMAINS.map(d => <DomainBar key={d.name} {...d} />)}
          <Link href="/progress">
            <button className="btn btn-ghost" style={{ marginTop: 6, width: '100%', justifyContent: 'center', fontSize: 13.5 }}>
              View full progress
            </button>
          </Link>
        </div>
      </div>

      {/* My Children */}
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', margin: '0 0 16px', letterSpacing: '-0.01em' }}>My Children</h3>
        <div className="rg-children">

          {/* Maya */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--teal), var(--sage))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>🌸</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Maya</div>
                <div style={{ fontSize: 13, color: 'rgba(30,58,95,0.5)' }}>Age 9</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--teal)' }}>2</div>
                <div style={{ fontSize: 12, color: 'rgba(30,58,95,0.5)' }}>Tests taken</div>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)' }}>May 28</div>
                <div style={{ fontSize: 12, color: 'rgba(30,58,95,0.5)' }}>Last test</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/progress" style={{ flex: 1 }}>
                <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '9px 12px' }}>
                  View Progress
                </button>
              </Link>
              <Link href="/tests" style={{ flex: 1 }}>
                <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '9px 12px' }}>
                  Take Test
                </button>
              </Link>
            </div>
          </div>

          {/* Leo */}
          <div className="card" style={{ padding: '22px', opacity: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #b8d4f0, var(--sage))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>🚀</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Leo</div>
                <div style={{ fontSize: 13, color: 'rgba(30,58,95,0.5)' }}>Age 6</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(143,165,152,0.15)', borderRadius: 10,
              padding: '12px 14px', marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600, marginBottom: 3 }}>
                Coming soon for Leo
              </div>
              <div style={{ fontSize: 12.5, color: 'rgba(30,58,95,0.55)', lineHeight: 1.4 }}>
                ImoTracker assessments are designed for children aged 7 and up.
              </div>
            </div>
            <button className="btn btn-ghost" disabled style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '9px 12px', opacity: 0.5, cursor: 'not-allowed' }}>
              Not yet available
            </button>
          </div>

          {/* Add child */}
          <Link href="/settings?section=children">
            <div style={{
              border: '2px dashed var(--line)', borderRadius: 18,
              padding: '22px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12,
              minHeight: 180, cursor: 'pointer', transition: 'border-color .15s',
              background: 'transparent',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px dashed var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, color: 'rgba(30,58,95,0.35)',
              }}>+</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(30,58,95,0.55)' }}>Add another child</div>
                <div style={{ fontSize: 12.5, color: 'rgba(30,58,95,0.4)', marginTop: 3 }}>Track multiple children</div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}
