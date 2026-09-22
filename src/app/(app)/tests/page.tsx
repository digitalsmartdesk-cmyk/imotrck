'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TOPICS } from '@/lib/questions'

const AGE_FILTERS = ['All ages', '7–9', '10–12', '13–15']

export default function TestsPage() {
  const [ageFilter, setAgeFilter] = useState('All ages')
  const [search, setSearch] = useState('')

  const filtered = TOPICS.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false
    if (ageFilter === '7–9') return t.ageMin <= 9
    if (ageFilter === '10–12') return t.ageMin <= 12 && t.ageMax >= 10
    if (ageFilter === '13–15') return t.ageMax >= 13
    return true
  })

  const featured = TOPICS.find(t => t.id === 'emotional-regulation')!
  const freeTest = TOPICS.find(t => t.isFree)!
  const premiumTests = TOPICS.filter(t => !t.isFree && t.id !== 'emotional-regulation')

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1080, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: 'var(--navy)', opacity: 0.5, marginBottom: 24 }}>
        <Link href="/dashboard">Dashboard</Link> <span style={{ margin: '0 6px' }}>›</span> Assessments
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 6, letterSpacing: '-0.02em' }}>Assessment Library</h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.6 }}>Maya · 1 of 8 topics completed · Updated annually</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(44,95,93,0.08)', padding: '8px 16px', borderRadius: 999 }}>
          <span style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>1 credit remaining</span>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
        {AGE_FILTERS.map(f => (
          <button key={f} onClick={() => setAgeFilter(f)} className={`chip ${ageFilter === f ? 'active' : ''}`}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <input className="input" placeholder="Search assessments…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} />
        </div>
      </div>

      {/* Featured card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%)',
        borderRadius: 20, padding: '28px 36px', marginBottom: 20, color: 'var(--cream)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.6)', marginBottom: 8 }}>↑ Up next for Maya</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>{featured.name}</h2>
          <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.7)', maxWidth: 480, lineHeight: 1.6, marginBottom: 16 }}>{featured.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 12, background: 'rgba(245,243,239,0.12)', padding: '4px 12px', borderRadius: 999 }}>Ages {featured.ageMin}+</span>
            <span style={{ fontSize: 12, background: 'rgba(245,243,239,0.12)', padding: '4px 12px', borderRadius: 999 }}>{featured.questionCount} questions</span>
            <span style={{ fontSize: 12, background: 'rgba(245,243,239,0.12)', padding: '4px 12px', borderRadius: 999 }}>~{featured.estimatedMinutes} min</span>
          </div>
        </div>
        <Link href="/tests/premium?topic=emotional-regulation" style={{ background: 'var(--coral)', color: 'var(--navy-ink)', padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', flexShrink: 0 }}>
          Begin →
        </Link>
      </div>

      {/* Free card */}
      <div style={{
        background: 'rgba(232,165,152,0.12)', border: '1.5px solid rgba(232,165,152,0.4)',
        borderRadius: 18, padding: '24px 28px', marginBottom: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>🌟</span>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{freeTest.name}</h3>
            <span className="badge badge-free">FREE</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 12, lineHeight: 1.6 }}>{freeTest.description}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="chip" style={{ fontSize: 12, padding: '3px 10px' }}>Ages {freeTest.ageMin}+</span>
            <span className="chip" style={{ fontSize: 12, padding: '3px 10px' }}>{freeTest.questionCount} questions</span>
            <span className="chip" style={{ fontSize: 12, padding: '3px 10px' }}>~{freeTest.estimatedMinutes} min</span>
          </div>
        </div>
        <Link href="/tests/free" className="btn btn-coral">Start free check-in</Link>
      </div>

      {/* Premium grid */}
      <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.45, marginBottom: 16 }}>Premium topics · 1 credit each</h3>
      <div className="rg-3up" style={{ marginBottom: 48 }}>
        {premiumTests.map(t => (
          <div key={t.id} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{t.name}</h4>
              <span style={{ fontSize: 16 }}>🔒</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.65, lineHeight: 1.55, flex: 1 }}>{t.description}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, background: 'var(--cream-deep)', padding: '3px 8px', borderRadius: 999, color: 'var(--navy)', fontWeight: 600 }}>Ages {t.ageMin}+</span>
              <span style={{ fontSize: 11, background: 'var(--cream-deep)', padding: '3px 8px', borderRadius: 999, color: 'var(--navy)', fontWeight: 600 }}>{t.questionCount}Q</span>
            </div>
            <Link href={`/tests/premium?topic=${t.id}`} className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 0', textAlign: 'center', marginTop: 4 }}>
              Begin →
            </Link>
          </div>
        ))}
      </div>

      {/* Journey strip */}
      <div style={{ background: 'var(--navy)', borderRadius: 18, padding: '28px 36px', color: 'var(--cream)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.4)', marginBottom: 16 }}>8-year emotional journey · Ages 7–15</div>
        <div style={{ display: 'flex', gap: 0, alignItems: 'center', overflowX: 'auto' }}>
          {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((age, i) => (
            <div key={age} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 60 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', margin: '0 auto 6px',
                  background: age <= 9 ? 'var(--coral)' : 'rgba(245,243,239,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: age <= 9 ? 'var(--navy)' : 'rgba(245,243,239,0.4)',
                }}>{age}</div>
                <div style={{ fontSize: 10, color: 'rgba(245,243,239,0.4)' }}>Yr {age - 6}</div>
              </div>
              {i < 8 && <div style={{ width: '100%', height: 2, background: 'rgba(245,243,239,0.1)', flex: 1 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
