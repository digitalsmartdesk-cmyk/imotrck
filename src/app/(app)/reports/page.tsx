'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type ResultFilter = 'all' | 'strong' | 'developing' | 'support'

const MOCK_REPORTS = [
  { id: 'r1', topic: 'Emotional Awareness', date: 'May 28, 2026', child: 'Maya', result: 'strong' as ResultFilter, resultLabel: 'Strong', score: 4, emoji: '🌟', questions: 15 },
  { id: 'r2', topic: 'Emotional Regulation', date: 'May 14, 2026', child: 'Maya', result: 'developing' as ResultFilter, resultLabel: 'Developing Well', score: 3, emoji: '💫', questions: 18 },
  { id: 'r3', topic: 'Stress & Resilience', date: 'Apr 30, 2026', child: 'Maya', result: 'support' as ResultFilter, resultLabel: 'Needs Support', score: 2, emoji: '🌱', questions: 18 },
]

const RESULT_LABELS: Record<ResultFilter, { label: string; color: string; bg: string }> = {
  all: { label: 'All', color: 'var(--navy)', bg: 'transparent' },
  strong: { label: 'Strong', color: 'var(--teal)', bg: 'rgba(44,95,93,0.1)' },
  developing: { label: 'Developing Well', color: '#5a7a6a', bg: 'rgba(143,165,152,0.2)' },
  support: { label: 'Needs Support', color: '#b05a40', bg: 'rgba(232,165,152,0.25)' },
}

export default function ReportsPage() {
  const supabase = createClient()
  const [reports, setReports] = useState(MOCK_REPORTS)
  const [childFilter, setChildFilter] = useState('all')
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    supabase.from('reports').select('*').then(({ data }) => {
      if (data && data.length > 0) {
        // map to display format when real data exists
      }
    })
  }, [])

  const filtered = reports
    .filter(r => {
      if (childFilter !== 'all' && r.child.toLowerCase() !== childFilter) return false
      if (resultFilter !== 'all' && r.result !== resultFilter) return false
      if (search && !r.topic.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => sort === 'newest' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id))

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--navy)', opacity: 0.5 }}>
        <Link href="/dashboard">Dashboard</Link> <span style={{ margin: '0 6px' }}>›</span> Reports
      </div>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 6, letterSpacing: '-0.02em' }}>Your Reports</h1>
        <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.6 }}>{filtered.length} assessment{filtered.length !== 1 ? 's' : ''} completed</p>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', padding: '16px 20px', background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'Maya', 'Leo'].map(c => (
            <button key={c} onClick={() => setChildFilter(c.toLowerCase())} className={`chip ${childFilter === c.toLowerCase() ? 'active' : ''}`}>{c === 'all' ? 'All children' : c}</button>
          ))}
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--line)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'strong', 'developing', 'support'] as ResultFilter[]).map(r => (
            <button key={r} onClick={() => setResultFilter(r)} className={`chip ${resultFilter === r ? 'active' : ''}`}>
              {r === 'all' ? 'All results' : RESULT_LABELS[r].label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input className="input" style={{ width: 200 }} placeholder="Search topics…" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input" style={{ width: 150 }} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px', color: 'var(--navy-ink)', opacity: 0.5 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--navy)' }}>No reports yet</h3>
          <p style={{ fontSize: 15, marginBottom: 24 }}>Complete an assessment to see your first report here.</p>
          <Link href="/tests" className="btn btn-primary">Browse assessments</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map(r => {
            const resultInfo = RESULT_LABELS[r.result]
            return (
              <Link key={r.id} href={`/reports/${r.id}`} style={{ display: 'block' }}>
                <div className="card" style={{ cursor: 'pointer', transition: 'all .15s', padding: '20px 24px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--teal)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(44,95,93,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--cream-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{r.emoji}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{r.topic}</div>
                        <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 2 }}>{r.date}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: 'var(--navy)', opacity: 0.3 }}>→</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, background: 'var(--cream-deep)', padding: '3px 8px', borderRadius: 999, color: 'var(--navy)', fontWeight: 600 }}>{r.child}</span>
                    <span style={{ fontSize: 12, background: resultInfo.bg, color: resultInfo.color, padding: '3px 10px', borderRadius: 999, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.resultLabel}</span>
                    <span style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginLeft: 'auto' }}>Score: {r.score}/5</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
