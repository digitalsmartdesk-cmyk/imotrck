'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Plan = 'four_pack' | 'single'

const PLANS = {
  four_pack: { label: 'Four Tests Pack', credits: 4, price: 299, qr: '/assets/qr-pack.png' },
  single: { label: 'Single Test', credits: 1, price: 99, qr: '/assets/qr-single.png' },
}

export default function CheckoutPage() {
  const supabase = createClient()
  const [plan, setPlan] = useState<Plan>('four_pack')
  const [upiRef, setUpiRef] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const selected = PLANS[plan]
  const tax = Math.round(selected.price * 0.18)
  const total = selected.price + tax

  const handleConfirm = async () => {
    if (!upiRef) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('transactions').insert({
          parent_id: user.id,
          plan,
          amount: total,
          credits_added: selected.credits,
          upi_ref: upiRef,
          status: 'pending',
        })
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'var(--cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40,
      }}>
        <div className="animate-rise" style={{ maxWidth: 440, textAlign: 'center' }}>
          <div className="animate-pop" style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, color: 'white',
            margin: '0 auto 24px',
            boxShadow: '0 0 0 16px rgba(44,95,93,0.1)',
          }}>✓</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', marginBottom: 12 }}>Payment received!</h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.65, marginBottom: 32 }}>
            We've received your UPI reference <span className="mono" style={{ background: 'var(--cream-deep)', padding: '1px 6px', borderRadius: 4 }}>{upiRef}</span>. Your {selected.credits} credit{selected.credits > 1 ? 's' : ''} will be added within a few minutes after verification.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ display: 'block', textAlign: 'center' }}>Go to dashboard →</Link>
            <Link href="/tests" className="btn btn-ghost btn-lg" style={{ display: 'block', textAlign: 'center' }}>Browse assessments</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ marginBottom: 32, fontSize: 13, color: 'var(--navy)', opacity: 0.5 }}>
          <Link href="/tests">Assessments</Link> <span style={{ margin: '0 6px' }}>›</span> Checkout
        </div>
        <div className="rg-checkout">
          {/* Left */}
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 4, letterSpacing: '-0.02em' }}>Complete your <span className="serif">purchase</span></h1>
        <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.55, marginBottom: 28 }}>Secure checkout · 256-bit SSL</p>

            {/* Plan picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {(['four_pack', 'single'] as Plan[]).map(p => {
                const pl = PLANS[p]
                const isSel = plan === p
                return (
                  <label key={p} style={{
                    display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', borderRadius: 16, cursor: 'pointer',
                    border: `2px solid ${isSel ? 'var(--teal)' : 'var(--line)'}`,
                    background: isSel ? 'rgba(44,95,93,0.05)' : 'var(--paper)',
                    transition: 'all .15s', position: 'relative',
                  }}>
                    <input type="radio" name="plan" value={p} checked={isSel} onChange={() => setPlan(p)} style={{ display: 'none' }} />
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSel ? 'var(--teal)' : 'var(--line)'}`, background: isSel ? 'var(--teal)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {isSel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>{pl.label}</span>
                        {p === 'four_pack' && <span style={{ fontSize: 11, background: 'var(--teal)', color: 'white', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>Best value</span>}
                      </div>
                      <span style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6 }}>{pl.credits} assessment credit{pl.credits > 1 ? 's' : ''} · use on any topic · never expire</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="serif" style={{ fontSize: 26, color: 'var(--navy)' }}>₹{pl.price}</div>
                      <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5 }}>+ GST</div>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* QR Payment */}
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Scan & pay with UPI</h2>
              <div className="qr-row">
                <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 12, padding: 12, flexShrink: 0 }}>
                  <img src={selected.qr} alt={`QR code for ${selected.label}`} style={{ width: 160, height: 160, display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div style={{ width: 160, height: 160, background: 'var(--cream-deep)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--navy)', opacity: 0.5, marginTop: 0 }}>
                    QR code
                  </div>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 32, color: 'var(--teal)', marginBottom: 4 }}>₹{total}</div>
                  <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6, marginBottom: 16 }}>Payable to Vikas Gupta · ImoTracker</div>
                  <ol style={{ paddingLeft: 20, margin: 0 }}>
                    {['Open GPay, PhonePe, Paytm, or BHIM', 'Scan the QR code above', `Enter ₹${total} if not auto-filled`, 'Complete payment & note the UTR/reference ID'].map((step, i) => (
                      <li key={i} style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.75, marginBottom: 8 }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div className="card" style={{ padding: 24, marginTop: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Confirm your payment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label>UPI Reference / UTR number *</label>
                  <input className="input mono" placeholder="e.g. 411234567890" maxLength={22} value={upiRef} onChange={e => setUpiRef(e.target.value)} />
                  <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 6 }}>Found in your UPI app's payment confirmation</p>
                </div>
                <div>
                  <label>Email for receipt (optional)</label>
                  <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ borderRadius: 20, padding: 28, background: 'var(--navy)', color: 'var(--cream)' }}>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: 'rgba(245,243,239,0.6)', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Order summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'rgba(245,243,239,0.85)' }}>
                  <span>{selected.label}</span>
                  <span>₹{selected.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'rgba(245,243,239,0.5)' }}>
                  <span>GST (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(245,243,239,0.15)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: 'rgba(245,243,239,0.8)', fontSize: 14 }}>Total due</span>
                  <span className="serif" style={{ fontSize: 38, color: 'var(--coral)' }}>₹{total}</span>
                </div>
              </div>
              <div style={{ background: 'rgba(232,165,152,0.15)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
                <span className="serif" style={{ fontSize: 30, color: 'var(--coral)', display: 'block', lineHeight: 1 }}>{selected.credits}</span>
                <span style={{ fontSize: 13, color: 'rgba(245,243,239,0.7)' }}>credit{selected.credits > 1 ? 's' : ''} added after verification</span>
              </div>
              <button
                className="btn btn-coral btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleConfirm}
                disabled={!upiRef || loading}
              >
                {loading ? 'Confirming…' : "I've completed payment ✓"}
              </button>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                <span style={{ fontSize: 12, color: 'rgba(245,243,239,0.4)' }}>🛡 30-day money-back guarantee</span>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
                {['UPI', 'BHIM', 'Razorpay'].map(b => (
                  <span key={b} style={{ fontSize: 11, background: 'rgba(245,243,239,0.1)', padding: '3px 8px', borderRadius: 6, color: 'rgba(245,243,239,0.6)', fontWeight: 600 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
