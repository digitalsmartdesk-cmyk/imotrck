'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/Brand'

type Tab = 'login' | 'signup'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw] = useState(false)
  const [showSignupPw, setShowSignupPw] = useState(false)

  // Signup form
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')
  const [childName, setChildName] = useState('')
  const [childDob, setChildDob] = useState('')
  const [relationship, setRelationship] = useState('Parent')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  useEffect(() => {
    const t = searchParams.get('tab')
    if (t === 'signup') setTab('signup')
    const msg = searchParams.get('msg')
    if (msg === 'check-email') setError('✉️ Check your email and click the confirmation link to activate your account.')
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { name: signupName },
        emailRedirectTo: `${siteUrl}/onboarding`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const userId = data.user?.id
    if (userId) {
      // Insert profile
      await supabase.from('profiles').insert({
        id: userId,
        name: signupName,
        email: signupEmail,
      })

      // Insert child if provided
      if (childName && childDob) {
        const age = Math.floor(
          (Date.now() - new Date(childDob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
        )
        await supabase.from('children').insert({
          parent_id: userId,
          name: childName,
          date_of_birth: childDob,
          age,
          relationship,
        })
      }

      // Seed credits
      await supabase.from('credits').insert({ parent_id: userId, balance: 0 })
    }

    // If email confirmation is required, show check-email message
    if (data.user && !data.session) {
      setError('')
      router.push('/login?msg=check-email')
      setLoading(false)
      return
    }

    router.push('/onboarding')
    setLoading(false)
  }

  return (
    <div className="login-layout" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* LEFT PANEL */}
      <div className="login-left" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(44,95,93,0.25)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'rgba(232,165,152,0.12)', pointerEvents: 'none',
        }} />

        <BrandLogo dark={true} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="serif" style={{
            fontSize: 'clamp(28px, 3vw, 40px)',
            lineHeight: 1.2,
            color: '#F5F3EF',
            marginBottom: 48,
          }}>
            &ldquo;Every child deserves to be{' '}
            <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>understood.</span>&rdquo;
          </p>

          {/* 3-step process */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { num: '1', text: 'Child takes 5-min check-in' },
              { num: '2', text: 'AI analyzes patterns' },
              { num: '3', text: 'Parent gets insights' },
            ].map(({ num, text }) => (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(44,95,93,0.5)',
                  border: '1px solid rgba(44,95,93,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'var(--coral)', fontWeight: 700, fontSize: 14 }}>{num}</span>
                </div>
                <span style={{ color: 'rgba(245,243,239,0.85)', fontSize: 15, fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {['COPPA', 'GDPR', 'SSL'].map(badge => (
            <div key={badge} style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(245,243,239,0.08)',
              border: '1px solid rgba(245,243,239,0.18)',
              color: 'rgba(245,243,239,0.7)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}>
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: 460 }}>
          {/* Tab bar */}
          <div style={{
            display: 'flex',
            background: 'rgba(30,58,95,0.07)',
            borderRadius: 12,
            padding: 4,
            marginBottom: 32,
          }}>
            {(['login', 'signup'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError('') }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 9,
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 14.5,
                  cursor: 'pointer',
                  transition: 'all .18s',
                  background: tab === t ? 'var(--paper)' : 'transparent',
                  color: tab === t ? 'var(--navy)' : 'rgba(30,58,95,0.5)',
                  boxShadow: tab === t ? '0 1px 4px rgba(30,58,95,0.1)' : 'none',
                }}
              >
                {t === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ marginBottom: 4 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Welcome back.</h1>
                <p style={{ fontSize: 14, color: 'rgba(30,58,95,0.55)', margin: 0 }}>Log in to see your children's reports.</p>
              </div>
              <div>
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label htmlFor="login-password" style={{ marginBottom: 0 }}>Password</label>
                  <a href="/forgot-password" style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    className="input"
                    type={showLoginPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: 56 }}
                  />
                  <button type="button" onClick={() => setShowLoginPw(v => !v)} style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 12, fontWeight: 600, color: 'var(--teal)',
                  }}>{showLoginPw ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                disabled={loading}
              >
                {loading ? 'Logging in…' : 'Log in'}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Parent section */}
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: '20px 20px 16px',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 14 }}>
                  Your account
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label htmlFor="su-name">Full name</label>
                    <input
                      id="su-name"
                      className="input"
                      type="text"
                      placeholder="Alex Johnson"
                      value={signupName}
                      onChange={e => setSignupName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="su-email">Email address</label>
                    <input
                      id="su-email"
                      className="input"
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={e => setSignupEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="rg-2col-sm">
                    <div>
                      <label htmlFor="su-pass">Password</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          id="su-pass"
                          className="input"
                          type={showSignupPw ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={e => setSignupPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                          minLength={8}
                          style={{ paddingRight: 56 }}
                        />
                        <button type="button" onClick={() => setShowSignupPw(v => !v)} style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: 12, fontWeight: 600, color: 'var(--teal)',
                        }}>{showSignupPw ? 'Hide' : 'Show'}</button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="su-confirm">Confirm</label>
                      <input
                        id="su-confirm"
                        className="input"
                        type="password"
                        placeholder="••••••••"
                        value={signupConfirm}
                        onChange={e => setSignupConfirm(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Child section */}
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: '20px 20px 16px',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 14 }}>
                  Your child
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label htmlFor="child-name">Child&apos;s name</label>
                    <input
                      id="child-name"
                      className="input"
                      type="text"
                      placeholder="Maya"
                      value={childName}
                      onChange={e => setChildName(e.target.value)}
                    />
                  </div>
                  <div className="rg-2col-sm">
                    <div>
                      <label htmlFor="child-dob">Date of birth</label>
                      <input
                        id="child-dob"
                        className="input"
                        type="date"
                        value={childDob}
                        onChange={e => setChildDob(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label htmlFor="relationship">Relationship</label>
                      <select
                        id="relationship"
                        className="input"
                        value={relationship}
                        onChange={e => setRelationship(e.target.value)}
                        style={{ appearance: 'auto' }}
                      >
                        <option>Parent</option>
                        <option>Guardian</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 2px' }}>
                <label style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontWeight: 400, fontSize: 13.5, color: 'var(--navy-ink)', cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    required
                    style={{ marginTop: 2, accentColor: 'var(--teal)', flexShrink: 0 }}
                  />
                  <span>
                    I agree to the{' '}
                    <a href="/terms" style={{ color: 'var(--teal)', fontWeight: 600 }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" style={{ color: 'var(--teal)', fontWeight: 600 }}>Privacy Policy</a>
                  </span>
                </label>
                <label style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontWeight: 400, fontSize: 13.5, color: 'rgba(30,58,95,0.6)', cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={e => setNewsletter(e.target.checked)}
                    style={{ marginTop: 2, accentColor: 'var(--teal)', flexShrink: 0 }}
                  />
                  <span>Send me tips on supporting my child&apos;s emotional growth (optional)</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 13, color: 'rgba(30,58,95,0.4)', fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          {/* OAuth buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🌐', label: 'Continue with Google' },
              { icon: '🍎', label: 'Continue with Apple' },
            ].map(({ icon, label }) => (
              <button
                key={label}
                disabled
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 10,
                  padding: '11px 20px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  color: 'rgba(30,58,95,0.35)',
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: 'not-allowed',
                  fontFamily: 'inherit',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
                <span style={{
                  position: 'absolute', right: 14,
                  fontSize: 11, fontWeight: 600,
                  background: 'rgba(30,58,95,0.07)',
                  padding: '2px 8px', borderRadius: 999,
                  color: 'rgba(30,58,95,0.4)',
                  letterSpacing: '0.04em',
                }}>
                  Soon
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  )
}
