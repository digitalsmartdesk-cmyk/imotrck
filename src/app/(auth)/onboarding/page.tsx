'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/Brand'
import Link from 'next/link'

type Step = 1 | 2 | 3 | 4

const FIRST_TEST_OPTIONS = [
  { id: 'emotional-awareness', label: 'Emotional Awareness', sub: 'Free · Ages 7+ · 15 questions', recommended: true },
  { id: 'emotional-regulation', label: 'Emotional Regulation', sub: '1 credit · Ages 7+ · 18 questions', recommended: false },
  { id: 'stress-resilience', label: 'Stress & Resilience', sub: '1 credit · Ages 8+ · 18 questions', recommended: false },
]

const STEP_LABELS = ['Verify', 'Add child', 'First test', 'Done']

function Stepper({ step }: { step: Step }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              background: n < step ? 'var(--teal)' : n === step ? 'var(--navy)' : 'var(--sage-soft)',
              color: n <= step ? 'white' : 'rgba(30,58,95,0.5)',
              boxShadow: n === step ? '0 0 0 5px rgba(30,58,95,0.12)' : 'none',
              transition: 'all .3s',
            }}>
              {n < step ? '✓' : n}
            </div>
            {n < 4 && <div style={{ width: 32, height: 2, background: n < step ? 'var(--teal)' : 'var(--line)', borderRadius: 1, transition: 'background .3s' }} />}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 28, textAlign: 'center',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              color: n === step ? 'var(--teal)' : 'rgba(30,58,95,0.35)',
              transition: 'color .3s',
            }}>{STEP_LABELS[n - 1]}</span>
            {n < 4 && <div style={{ width: 32 }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState<Step>(1)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const [childName, setChildName] = useState('')
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('9')
  const [relationship, setRelationship] = useState('parent')
  const [selectedTest, setSelectedTest] = useState('emotional-awareness')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (step === 1) otpRefs.current[0]?.focus()
  }, [step])

  const handleOtp = (val: string, idx: number) => {
    const digits = val.replace(/\D/g, '').slice(0, 1)
    const next = [...otp]
    next[idx] = digits
    setOtp(next)
    if (digits && idx < 5) otpRefs.current[idx + 1]?.focus()
  }

  const verifyEmail = async () => {
    setLoading(true)
    // In production: verify OTP via supabase.auth.verifyOtp
    // For prototype: skip straight to step 2
    setStep(2)
    setLoading(false)
  }

  const saveChild = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      await supabase.from('children').insert({
        parent_id: user.id,
        name: childName,
        date_of_birth: dob,
        age: parseInt(age),
        relationship,
      })

      // Ensure credits row exists
      await supabase.from('credits').upsert({ parent_id: user.id, balance: 0 }, { onConflict: 'parent_id' })

      setStep(3)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const finish = () => {
    if (selectedTest === 'emotional-awareness') {
      router.push('/tests/free')
    } else {
      router.push(`/tests/premium?topic=${selectedTest}`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ marginBottom: 32 }}>
          <BrandLogo />
        </div>
        <Stepper step={step} />

        {/* Step 1: Verify email */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div style={{ fontSize: 48, marginBottom: 20 }}>📧</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Check your inbox</h1>
            <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 32 }}>
              We sent a 6-digit verification code to your email. Enter it below to confirm your account.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el }}
                  value={digit}
                  onChange={e => handleOtp(e.target.value, i)}
                  onKeyDown={e => { if (e.key === 'Backspace' && !digit && i > 0) otpRefs.current[i - 1]?.focus() }}
                  style={{
                    width: 52, height: 60, textAlign: 'center',
                    fontSize: 28, fontWeight: 400,
                    fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                    border: `2px solid ${digit ? 'var(--navy)' : 'var(--line)'}`,
                    borderRadius: 14,
                    background: 'var(--paper)', color: 'var(--navy)',
                    outline: 'none',
                    transition: 'border-color .15s',
                  }}
                  maxLength={1}
                />
              ))}
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={verifyEmail} disabled={loading}>
              {loading ? 'Verifying…' : 'Verify email →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--navy-ink)', opacity: 0.55, marginTop: 16 }}>
              Didn't get the email? <button style={{ background: 'none', border: 'none', color: 'var(--teal)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Resend</button>
            </p>
            <p style={{ textAlign: 'center', marginTop: 12 }}>
              <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--navy)', opacity: 0.5, fontSize: 13, cursor: 'pointer' }}>Skip for now →</button>
            </p>
          </div>
        )}

        {/* Step 2: Add child */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Tell us about your child</h1>
            <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 32 }}>
              We'll use this to make check-ins and reports age-appropriate.
            </p>
            {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label>Child's first name</label>
                <input className="input" value={childName} onChange={e => setChildName(e.target.value)} placeholder="e.g. Maya" />
              </div>
              <div className="rg-2col-sm">
                <div>
                  <label>Date of birth</label>
                  <input className="input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                </div>
                <div>
                  <label>Age</label>
                  <select className="input" value={age} onChange={e => setAge(e.target.value)}>
                    {Array.from({ length: 9 }, (_, i) => i + 7).map(a => <option key={a} value={a}>{a} years old</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label>Your relationship</label>
                <select className="input" value={relationship} onChange={e => setRelationship(e.target.value)}>
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other caregiver</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }} onClick={saveChild} disabled={loading || !childName || !dob}>
              {loading ? 'Saving…' : 'Continue →'}
            </button>
          </div>
        )}

        {/* Step 3: Pick first check-in */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Choose your first check-in</h1>
            <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 32 }}>
              We recommend starting with the free Emotional Awareness check-in.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {FIRST_TEST_OPTIONS.map(opt => (
                <label key={opt.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 20px', borderRadius: 14, cursor: 'pointer',
                  border: `2px solid ${selectedTest === opt.id ? 'var(--teal)' : 'var(--line)'}`,
                  background: selectedTest === opt.id ? 'rgba(44,95,93,0.06)' : 'var(--paper)',
                  transition: 'all .15s',
                }}>
                  <input type="radio" name="test" value={opt.id} checked={selectedTest === opt.id} onChange={() => setSelectedTest(opt.id)} style={{ display: 'none' }} />
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selectedTest === opt.id ? 'var(--teal)' : 'var(--line)'}`, background: selectedTest === opt.id ? 'var(--teal)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selectedTest === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{opt.label}
                      {opt.recommended && <span style={{ marginLeft: 8, fontSize: 11, background: 'rgba(44,95,93,0.12)', color: 'var(--teal)', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>Recommended</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6, marginTop: 2 }}>{opt.sub}</div>
                  </div>
                </label>
              ))}
            </div>
            <button className="btn btn-coral btn-lg" style={{ width: '100%' }} onClick={() => setStep(4)}>Let's go! →</button>
          </div>
        )}

        {/* Step 4: Done */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }} className="animate-fade-up">
            <div className="animate-pop" style={{
              width: 80, height: 80, borderRadius: '50%', background: 'var(--coral-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
              margin: '0 auto 20px',
              boxShadow: '0 0 0 12px rgba(232,165,152,0.18)',
            }}>🌟</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px' }}>You're all set!</h1>
            <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6, marginBottom: 36 }}>
              {childName ? `${childName}'s` : "Your child's"} emotional journey starts today. Take the first check-in whenever you're both ready.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn btn-coral btn-lg" onClick={finish}>Start {childName ? `${childName}'s` : 'the'} first check-in →</button>
              <Link href="/dashboard" className="btn btn-ghost btn-lg">Go to dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
