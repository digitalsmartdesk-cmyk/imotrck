'use client'
import { useState } from 'react'
import Link from 'next/link'

const TIMEPOINTS = ["Mar '24", "Sep '24", "Mar '25", "Nov '25"]
const DOMAINS = [
  { name: 'Emotional Awareness', values: [3, 3.5, 4, 4.2], color: '#2C5F5D' },
  { name: 'Emotional Regulation', values: [2.5, 3, 3.2, 3.5], color: '#E8A598' },
  { name: 'Stress & Resilience', values: [3, 3.2, 3.5, 3.8], color: '#8FA598' },
  { name: 'Empathy & Social Sense', values: [4, 4.2, 4.3, 4.5], color: '#1E3A5F' },
  { name: 'Relationships & Trust', values: [3.5, 3.5, 3.8, 4], color: '#f0a86b' },
  { name: 'Self-Perception', values: [3, 3.5, 4, 4], color: '#7b8fa6' },
  { name: 'Identity & Authenticity', values: [2.8, 3, 3.3, 3.5], color: '#a67b8f' },
  { name: 'Meaning & Purpose', values: [3.2, 3.5, 3.6, 3.8], color: '#6b8f8a' },
]

const STATS = [
  { label: 'Overall Index', value: 'Developing Well', sub: "↑ Improving since Mar '24", color: 'var(--teal)' },
  { label: 'Strongest Domain', value: 'Empathy & Social Sense', sub: "4.5 / 5 in Nov '25", color: 'var(--navy)' },
  { label: 'Most Improved', value: 'Emotional Awareness', sub: '+1.2 points over 2 years', color: '#2C5F5D' },
  { label: 'Watch Area', value: 'Emotional Regulation', sub: 'Growing — keep supporting', color: '#b05a40' },
]

const HISTORY = [
  { id: '4', topic: 'Emotional Awareness', date: 'Nov 25, 2025', result: 'Developing Well', score: 4.2 },
  { id: '3', topic: 'Empathy & Social Sense', date: 'Mar 15, 2025', result: 'Strong', score: 4.3 },
  { id: '2', topic: 'Emotional Regulation', date: 'Sep 10, 2024', result: 'Developing Well', score: 3.2 },
  { id: '1', topic: 'Emotional Awareness', date: 'Mar 1, 2024', result: 'Developing Well', score: 3.0 },
]

const CHART_W = 560
const CHART_H = 200
const PAD = { top: 16, right: 24, bottom: 24, left: 40 }

function LineChart({ visibleDomains }: { visibleDomains: Set<string> }) {
  const plotW = CHART_W - PAD.left - PAD.right
  const plotH = CHART_H - PAD.top - PAD.bottom
  const xStep = plotW / (TIMEPOINTS.length - 1)
  const yScale = (v: number) => plotH - ((v - 1) / 4) * plotH

  return (
    <svg width={CHART_W} height={CHART_H} style={{ overflow: 'visible' }}>
      {[1, 2, 3, 4, 5].map(v => (
        <g key={v}>
          <line x1={PAD.left} y1={PAD.top + yScale(v)} x2={PAD.left + plotW} y2={PAD.top + yScale(v)} stroke="var(--line)" strokeDasharray="4 4" />
          <text x={PAD.left - 8} y={PAD.top + yScale(v) + 4} textAnchor="end" fontSize="11" fill="var(--navy-ink)" opacity="0.4">{v}</text>
        </g>
      ))}
      {TIMEPOINTS.map((tp, i) => (
        <text key={tp} x={PAD.left + i * xStep} y={CHART_H - 4} textAnchor="middle" fontSize="11" fill="var(--navy-ink)" opacity="0.5">{tp}</text>
      ))}
      {DOMAINS.filter(d => visibleDomains.has(d.name)).map(d => {
        const pts = d.values.map((v, i) => `${PAD.left + i * xStep},${PAD.top + yScale(v)}`).join(' ')
        return (
          <g key={d.name}>
            <polyline points={pts} fill="none" stroke={d.color} strokeWidth="2" strokeLinejoin="round" />
            {d.values.map((v, i) => (
              <circle key={i} cx={PAD.left + i * xStep} cy={PAD.top + yScale(v)} r="4" fill={d.color} />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export default function ProgressPage() {
  const [visibleDomains, setVisibleDomains] = useState(new Set(DOMAINS.slice(0, 4).map(d => d.name)))

  const toggleDomain = (name: string) => {
    setVisibleDomains(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--navy)', opacity: 0.5 }}>
        <Link href="/dashboard">Dashboard</Link> <span style={{ margin: '0 6px' }}>›</span> Progress
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 6, letterSpacing: '-0.02em' }}>Maya&apos;s Progress</h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.6 }}>4 assessments · March 2024 – November 2025</p>
        </div>
        <Link href="/tests" className="btn btn-primary">New check-in</Link>
      </div>

      <div style={{ background: 'var(--navy)', borderRadius: 18, padding: '24px 28px', marginBottom: 24, color: 'var(--cream)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.4)', marginBottom: 16 }}>Emotional journey · Ages 7–15</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((age, i) => {
            const done = age <= 9
            const curr = age === 9
            return (
              <div key={age} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', margin: '0 auto 6px',
                    background: done ? 'var(--coral)' : 'rgba(245,243,239,0.1)',
                    border: curr ? '2px solid var(--coral)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: done ? 'var(--navy)' : 'rgba(245,243,239,0.3)',
                  }}>{done ? '✓' : age}</div>
                  <div style={{ fontSize: 10, color: 'rgba(245,243,239,0.35)' }}>Age {age}</div>
                </div>
                {i < 8 && <div style={{ flex: 1, height: 2, background: done && age < 9 ? 'var(--coral)' : 'rgba(245,243,239,0.08)' }} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="rg-stats">
        {STATS.map(s => (
          <div key={s.label} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.4, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: s.color, lineHeight: 1.2, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.55 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '28px 32px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Domain scores over time</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {DOMAINS.map(d => (
              <button key={d.name} onClick={() => toggleDomain(d.name)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                border: `1.5px solid ${visibleDomains.has(d.name) ? d.color : 'var(--line)'}`,
                background: visibleDomains.has(d.name) ? `${d.color}15` : 'transparent',
                color: visibleDomains.has(d.name) ? d.color : 'var(--navy)',
                opacity: visibleDomains.has(d.name) ? 1 : 0.5,
                cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                {d.name.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <LineChart visibleDomains={visibleDomains} />
        </div>
      </div>

      <div className="rg-2col" style={{ marginBottom: 32 }}>
        {DOMAINS.map(d => {
          const latest = d.values[d.values.length - 1]
          const first = d.values[0]
          const change = latest - first
          return (
            <div key={d.name} className="card" style={{ padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 4, height: 48, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 6 }}>{d.name}</div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(latest / 5) * 100}%`, background: d.color }} />
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: d.color }}>{latest.toFixed(1)}</div>
                <div style={{ fontSize: 11, color: change > 0 ? 'var(--teal)' : change < 0 ? '#c0392b' : 'var(--navy-ink)', opacity: change === 0 ? 0.5 : 1, fontWeight: 600 }}>
                  {change > 0 ? '+' : ''}{change.toFixed(1)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 32, background: 'rgba(44,95,93,0.05)', borderColor: 'rgba(44,95,93,0.2)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Developmental trajectory</h3>
        <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.7 }}>
          Over the past two years, Maya has shown consistent and encouraging emotional development across all eight domains. Her most notable growth has been in Emotional Awareness (+1.2 points) and Empathy & Social Sense, which now stands as her strongest area. Emotional Regulation continues to develop at the typical pace for her age — sustained support here will yield meaningful progress over the next 1–2 years.
        </p>
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Assessment History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HISTORY.map(h => (
          <Link key={h.id} href={`/reports/${h.id}`} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
            background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)',
            transition: 'all .15s',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{h.topic}</div>
              <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.55 }}>{h.date}</div>
            </div>
            <span style={{ fontSize: 12, background: 'rgba(44,95,93,0.1)', color: 'var(--teal)', padding: '3px 10px', borderRadius: 999, fontWeight: 700 }}>{h.result}</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--navy)' }}>{h.score}/5</span>
            <span style={{ color: 'var(--navy)', opacity: 0.3 }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
