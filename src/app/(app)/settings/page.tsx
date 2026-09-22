'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Section = 'profile' | 'children' | 'billing' | 'privacy' | 'deletion'

const NAV_SECTIONS: { id: Section; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'children', label: 'My Children' },
  { id: 'billing', label: 'Billing & Credits' },
  { id: 'privacy', label: 'Privacy & Notifications' },
  { id: 'deletion', label: 'Data & Deletion' },
]

const TRANSACTIONS = [
  { id: 't1', date: 'May 14, 2026', plan: 'Four Tests Pack', amount: 352, credits: 4, status: 'confirmed' },
  { id: 't2', date: 'Mar 1, 2026', plan: 'Single Test', amount: 117, credits: 1, status: 'confirmed' },
]

export default function SettingsPage() {
  const supabase = createClient()
  const [activeSection, setActiveSection] = useState<Section>('profile')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('India')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toggles, setToggles] = useState({ emailReminders: true, newsletter: false, research: true, analytics: true })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email || '')
        supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
          if (data) { setName(data.name || ''); setPhone(data.phone || ''); setCountry(data.country || 'India') }
        })
      }
    })
  }, [])

  const saveProfile = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const profileData = { id: user.id, name, phone, country, updated_at: new Date().toISOString() }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('profiles') as any).upsert(profileData)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="settings-layout">
      {/* Left nav */}
      <div className="settings-sidenav">
        <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)', marginBottom: 20, letterSpacing: '-0.01em' }}>Settings</h1>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              padding: '9px 12px', borderRadius: 10, textAlign: 'left', fontSize: 14, fontFamily: 'inherit',
              fontWeight: activeSection === s.id ? 700 : 500,
              background: activeSection === s.id ? 'rgba(44,95,93,0.1)' : 'transparent',
              color: activeSection === s.id ? 'var(--teal)' : 'var(--navy)',
              border: 'none', cursor: 'pointer', transition: 'all .15s',
            }}>{s.label}</button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="settings-content">
        {activeSection === 'profile' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 24 }}>Profile</h2>
            {saved && <div className="alert alert-success" style={{ marginBottom: 16 }}>Changes saved!</div>}
            <div className="card" style={{ padding: 32 }}>
              <div className="rg-2col-sm" style={{ marginBottom: 16 }}>
                <div><label>Full name</label><input className="input" value={name} onChange={e => setName(e.target.value)} /></div>
                <div><label>Email</label><input className="input" value={email} readOnly style={{ opacity: 0.6 }} /></div>
                <div><label>Phone</label><input className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" /></div>
                <div><label>Country</label>
                  <select className="input" value={country} onChange={e => setCountry(e.target.value)}>
                    <option>India</option><option>United Kingdom</option><option>United States</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 8 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Change password</h3>
                <div className="rg-2col-sm">
                  <div><label>New password</label><input className="input" type="password" placeholder="••••••••" /></div>
                  <div><label>Confirm new password</label><input className="input" type="password" placeholder="••••••••" /></div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={saveProfile} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        )}

        {activeSection === 'children' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 24 }}>My Children</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { name: 'Maya', age: 9, tests: 3, lastTest: 'May 28, 2026' },
                { name: 'Leo', age: 6, tests: 0, lastTest: 'Never' },
              ].map(child => (
                <div key={child.name} className="card" style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>{child.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{child.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6 }}>Age {child.age} · {child.tests} assessment{child.tests !== 1 ? 's' : ''} · Last: {child.lastTest}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href="/progress" className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 14px' }}>Progress</Link>
                    <button className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 14px' }}>Edit</button>
                    <button className="btn btn-danger" style={{ fontSize: 13, padding: '8px 14px' }} onClick={() => setShowDeleteModal(true)}>Delete</button>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', padding: '12px 20px' }}>+ Add another child</button>
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 24 }}>Billing & Credits</h2>
            <div style={{ background: 'var(--teal)', borderRadius: 18, padding: '24px 28px', color: 'white', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Available credits</div>
                <div style={{ fontSize: 36, fontWeight: 800 }}>3</div>
                <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>Credits never expire · Use on any assessment · Any child</div>
              </div>
              <Link href="/checkout" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 20px', borderRadius: 999, fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
                Buy more credits
              </Link>
            </div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)', marginBottom: 14, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Transaction history</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TRANSACTIONS.map(t => (
                <div key={t.id} className="card" style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(44,95,93,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>₹</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14 }}>{t.plan}</div>
                    <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.55 }}>{t.date} · {t.credits} credit{t.credits > 1 ? 's' : ''} added</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)' }}>₹{t.amount}</div>
                  <span style={{ fontSize: 11, background: 'rgba(44,95,93,0.1)', color: 'var(--teal)', padding: '3px 8px', borderRadius: 999, fontWeight: 700 }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 24 }}>Privacy & Notifications</h2>
            <div className="card" style={{ padding: 28 }}>
              {[
                { key: 'emailReminders' as const, label: 'Assessment reminders', desc: 'Annual check-in reminders based on your assessment schedule' },
                { key: 'newsletter' as const, label: 'Monthly newsletter', desc: 'Parenting tips, new articles, and platform updates' },
                { key: 'research' as const, label: 'Research data (anonymised)', desc: 'Help improve ImoTracker by contributing anonymised data to our research' },
                { key: 'analytics' as const, label: 'Analytics', desc: 'Help us understand how the platform is used to make it better' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 15 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6, marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <button onClick={() => toggle(item.key)} className={`toggle-switch ${toggles[item.key] ? 'on' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'deletion' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 24 }}>Data & Deletion</h2>
            <div className="card" style={{ padding: 28, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Export your data</h3>
              <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 16 }}>Download a full export of all your account data, child profiles, and assessment reports in JSON format.</p>
              <button className="btn btn-ghost">Export all data</button>
            </div>
            <div className="card" style={{ padding: 28, marginBottom: 16, borderColor: 'rgba(192,57,43,0.2)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#c0392b', marginBottom: 8 }}>Delete child data</h3>
              <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 16 }}>Permanently delete a child profile and all associated assessments and reports. This cannot be undone.</p>
              <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete child data</button>
            </div>
            <div className="card" style={{ padding: 28, borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.03)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#c0392b', marginBottom: 8 }}>Delete account</h3>
              <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 16 }}>Permanently delete your account and all data, including all child profiles and assessments. This cannot be undone.</p>
              <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Delete account</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div className="card" style={{ maxWidth: 440, width: '100%', padding: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#c0392b', marginBottom: 12 }}>Confirm deletion</h2>
            <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.6, marginBottom: 20 }}>
              This action is permanent and cannot be undone. All data will be deleted within 30 days. Type <strong>DELETE</strong> below to confirm.
            </p>
            <input className="input" placeholder="Type DELETE" value={deleteInput} onChange={e => setDeleteInput(e.target.value)} style={{ marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => { setShowDeleteModal(false); setDeleteInput('') }}>Cancel</button>
              <button className="btn btn-danger" disabled={deleteInput !== 'DELETE'} onClick={() => { setShowDeleteModal(false); alert('Data deletion requested.') }}>Confirm deletion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
