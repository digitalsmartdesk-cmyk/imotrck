'use client'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const assessments = [
  {
    name: 'Emotional Awareness',
    tier: 'Free',
    minAge: 7,
    questions: 15,
    href: '/tests/free',
    question: 'Can my child name what they feel?',
    icon: '💛',
  },
  {
    name: 'Emotional Regulation',
    tier: 'Premium',
    minAge: 7,
    questions: 18,
    href: '/tests',
    question: 'How does my child handle big emotions?',
    icon: '🌊',
  },
  {
    name: 'Stress & Resilience',
    tier: 'Premium',
    minAge: 8,
    questions: 18,
    href: '/tests',
    question: 'How does my child cope under pressure?',
    icon: '🌿',
  },
  {
    name: 'Empathy & Social Sense',
    tier: 'Premium',
    minAge: 7,
    questions: 16,
    href: '/tests',
    question: 'Does my child tune in to others?',
    icon: '🤝',
  },
  {
    name: 'Relationships & Trust',
    tier: 'Premium',
    minAge: 7,
    questions: 17,
    href: '/tests',
    question: 'How does my child build connections?',
    icon: '🔗',
  },
  {
    name: 'Self-Perception',
    tier: 'Premium',
    minAge: 7,
    questions: 16,
    href: '/tests',
    question: 'How does my child see themselves?',
    icon: '🪞',
  },
  {
    name: 'Identity & Authenticity',
    tier: 'Premium',
    minAge: 10,
    questions: 20,
    href: '/tests',
    question: 'Is my child secure in who they are?',
    icon: '✨',
  },
  {
    name: 'Meaning & Purpose',
    tier: 'Premium',
    minAge: 10,
    questions: 15,
    href: '/tests',
    question: 'Does my child feel their life has direction?',
    icon: '🌟',
  },
]

const domainBars = [
  { label: 'Emotional Awareness', score: 4, max: 5, color: '#2C5F5D' },
  { label: 'Emotional Regulation', score: 3, max: 5, color: '#8FA598' },
  { label: 'Empathy', score: 4, max: 5, color: '#2C5F5D' },
  { label: 'Relationships', score: 3, max: 5, color: '#8FA598' },
]

const reviews = [
  {
    name: 'Sarah M.',
    role: 'Mum of two, ages 8 & 11',
    rating: 5,
    quote: "The report gave us vocabulary we didn't have before. We now talk about 'big wave feelings' at dinner — it's completely changed how we connect.",
  },
  {
    name: 'Priya K.',
    role: 'Parent of a 9-year-old',
    rating: 5,
    quote: 'I was skeptical at first, but the insights were surprisingly accurate. The conversation starters alone were worth it — my son actually opened up.',
  },
  {
    name: 'James T.',
    role: 'Dad, London',
    rating: 5,
    quote: "We've done it twice now, a year apart. Seeing the growth mapped out visually was genuinely moving. Highly recommend to any parent who cares.",
  },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <section style={{ padding: '96px 0 80px', overflow: 'hidden' }}>
        <div className="container">
          <div className="rg-hero">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(44,95,93,0.1)', borderRadius: 999,
                padding: '6px 14px', marginBottom: 28,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.01em' }}>
                  ✦ Trusted by 10,000+ families
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(38px, 5vw, 58px)', fontWeight: 800,
                letterSpacing: '-0.03em', lineHeight: 1.08,
                color: 'var(--navy-ink)', margin: '0 0 24px',
              }}>
                Understand your child's{' '}
                <span className="serif" style={{ color: 'var(--teal)' }}>emotional journey</span>
              </h1>

              <p style={{
                fontSize: 18, lineHeight: 1.65, color: 'var(--navy)',
                opacity: 0.75, maxWidth: 480, margin: '0 0 36px',
              }}>
                Track emotional growth from ages 7–15 with science-backed assessments — one check-in a year builds a picture that lasts a lifetime.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/tests/free" className="btn btn-coral btn-lg">
                  Try Free Test
                </Link>
                <Link href="/login?tab=signup" className="btn btn-primary btn-lg">
                  Sign up free
                </Link>
                <Link href="/about" className="btn btn-ghost btn-lg">
                  Learn more
                </Link>
              </div>
            </div>

            {/* Report Card Visual */}
            <div className="rg-hero-visual" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'var(--navy)',
                borderRadius: 24,
                padding: '32px',
                width: '100%',
                maxWidth: 380,
                boxShadow: '0 32px 80px rgba(30,58,95,0.25)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <p style={{ fontSize: 13, color: 'rgba(245,243,239,0.5)', margin: '0 0 4px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Assessment Report</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--cream)', margin: 0 }}>Maya, 9</p>
                  </div>
                  <div style={{
                    background: 'rgba(44,95,93,0.3)', borderRadius: 12,
                    padding: '8px 14px', textAlign: 'center',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--sage)', margin: '0 0 2px', fontWeight: 700, letterSpacing: '0.1em' }}>OVERALL</p>
                    <p style={{ fontSize: 13, color: 'var(--cream)', margin: 0, fontWeight: 700 }}>Developing Well 🌱</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {domainBars.map(({ label, score, max, color }) => (
                    <div key={label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: 'rgba(245,243,239,0.75)', fontWeight: 500 }}>{label}</span>
                        <span style={{ fontSize: 13, color: 'var(--cream)', fontWeight: 700 }}>{score}/{max}</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(245,243,239,0.12)', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${(score / max) * 100}%`,
                          background: color === '#2C5F5D' ? 'var(--teal)' : 'var(--sage)',
                          borderRadius: 999,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 24, paddingTop: 20,
                  borderTop: '1px solid rgba(245,243,239,0.1)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 12, color: 'rgba(245,243,239,0.4)', fontWeight: 600 }}>October 2025</span>
                  <span style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 700 }}>View full report →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: 'var(--teal)', padding: '16px 0' }}>
        <div className="container">
          <p style={{
            textAlign: 'center', margin: 0,
            fontSize: 14, fontWeight: 600,
            color: 'rgba(245,243,239,0.9)',
            letterSpacing: '0.03em',
          }}>
            Grounded in developmental psychology · COPPA &amp; GDPR compliant · 30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label">How it works</p>
            <h2 className="section-title">Three steps to deeper understanding</h2>
          </div>

          <div className="rg-steps">
            {[
              {
                num: '1',
                title: 'Child takes 5-minute check-in',
                desc: 'Designed for ages 7–15, no right or wrong answers. Child-friendly language builds confidence throughout.',
              },
              {
                num: '2',
                title: 'AI analyzes emotional patterns',
                desc: 'Scored across 8 developmental domains using validated frameworks from child psychology research.',
              },
              {
                num: '3',
                title: 'Parents receive detailed insights',
                desc: 'Conversation starters, age-appropriate activities, and professional guidance tailored to your child.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--teal)', color: 'var(--cream)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 800, margin: '0 auto 24px',
                  boxShadow: '0 8px 24px rgba(44,95,93,0.3)',
                }}>
                  {num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--navy)', opacity: 0.65, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT LIBRARY */}
      <section style={{ padding: '80px 0 100px', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label">Assessment library</p>
            <h2 className="section-title">Eight windows into your child's world</h2>
            <p style={{ fontSize: 16, color: 'var(--navy)', opacity: 0.65, marginTop: 16, maxWidth: 500, margin: '16px auto 0' }}>
              Each assessment explores a different dimension of emotional development.
            </p>
          </div>

          <div className="rg-4up">
            {assessments.map((a) => (
              <Link key={a.name} href={a.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{
                  height: '100%', transition: 'transform .2s, box-shadow .2s',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(30,58,95,0.12)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <span className={`badge ${a.tier === 'Free' ? 'badge-free' : 'badge-premium'}`}>
                      {a.tier === 'Free' ? 'Free' : '🔒'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                    {a.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--navy)', opacity: 0.55, margin: '0 0 12px', lineHeight: 1.5, flex: 1 }}>
                    {a.question}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--teal)', background: 'rgba(44,95,93,0.08)', padding: '3px 8px', borderRadius: 999 }}>
                      Ages {a.minAge}+
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--navy)', background: 'rgba(30,58,95,0.07)', padding: '3px 8px', borderRadius: 999 }}>
                      {a.questions} questions
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ background: 'var(--navy)', padding: '100px 0' }}>
        <div className="container">
          <div className="rg-insights">
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 16 }}>
                Insights
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--cream)', margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Your child,{' '}
                <span className="serif" style={{ color: 'var(--coral)' }}>understood</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(245,243,239,0.65)', margin: '0 0 40px' }}>
                Reports go beyond scores. They translate emotional data into practical guidance that helps you have better conversations, not just better numbers.
              </p>
              <Link href="/login?tab=signup" className="btn btn-coral btn-lg">
                Start for free
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '📈', title: 'Longitudinal tracking', desc: 'Watch growth over months and years with side-by-side comparisons.' },
                { icon: '🧠', title: '8 developmental domains', desc: 'Comprehensive coverage of emotional intelligence dimensions.' },
                { icon: '👨‍👩‍👧', title: 'Parent + child report views', desc: 'Age-appropriate reports for children, detailed insights for parents.' },
                { icon: '📄', title: 'PDF download', desc: 'Save and share reports with educators or therapists.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  background: 'rgba(245,243,239,0.05)', borderRadius: 16,
                  padding: '20px 24px', border: '1px solid rgba(245,243,239,0.08)',
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--cream)', margin: '0 0 4px' }}>{title}</p>
                    <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.55)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label">Reviews</p>
            <h2 className="section-title">Families who've made it part of their year</h2>
          </div>

          <div className="rg-3up">
            {reviews.map(({ name, role, rating, quote }) => (
              <div key={name} className="card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--navy)', opacity: 0.8, margin: '0 0 24px', fontStyle: 'italic' }}>
                  "{quote}"
                </p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', margin: '0 0 2px' }}>{name}</p>
                  <p style={{ fontSize: 13, color: 'var(--navy)', opacity: 0.5, margin: 0 }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '80px 0 100px', background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label">Pricing</p>
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: 'var(--navy)', opacity: 0.65, marginTop: 16 }}>
              No subscription required. Pay only for what you use.
            </p>
          </div>

          <div className="rg-pricing">
            {[
              {
                name: 'Discover',
                price: 'Free',
                priceNote: 'forever',
                highlight: false,
                features: ['Try the Emotional Awareness check-in', '15-question assessment', 'Basic summary report', 'Child-friendly experience'],
                cta: 'Start free',
                ctaClass: 'btn-ghost',
                href: '/tests/free',
              },
              {
                name: 'Single Test',
                price: '₹99',
                priceNote: 'per assessment',
                highlight: false,
                features: ['One premium assessment of your choice', 'Full detailed parent report', 'Conversation starters & activities', 'No subscription required'],
                cta: 'Get started',
                ctaClass: 'btn-primary',
                href: '/checkout',
              },
              {
                name: 'Four Tests Pack',
                price: '₹299',
                priceNote: 'save ₹97',
                highlight: true,
                badge: 'Best value',
                features: ['Any 4 premium assessments', 'Full detailed reports for each', 'Credits never expire', 'Longitudinal comparison view'],
                cta: 'Get the pack',
                ctaClass: 'btn-teal',
                href: '/checkout',
              },
            ].map((plan) => (
              <div key={plan.name} className="card" style={{
                padding: 32, position: 'relative',
                border: plan.highlight ? '2px solid var(--teal)' : '1px solid var(--line)',
                boxShadow: plan.highlight ? '0 16px 48px rgba(44,95,93,0.15)' : undefined,
              }}>
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--teal)', color: 'var(--cream)',
                    padding: '4px 14px', borderRadius: 999,
                    fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                  }}>
                    {plan.badge}
                  </div>
                )}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--navy-ink)', letterSpacing: '-0.02em' }}>{plan.price}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--navy)', opacity: 0.5, margin: '0 0 28px' }}>{plan.priceNote}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 14, color: 'var(--navy)', opacity: 0.75, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={plan.href} className={`btn ${plan.ctaClass}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section style={{ background: 'var(--coral)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--navy-ink)', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Ready to understand your child better?
            </h2>
            <p style={{ fontSize: 17, color: 'var(--navy-ink)', opacity: 0.7, margin: '0 0 36px', lineHeight: 1.6 }}>
              Join thousands of families building emotional intelligence — one conversation at a time.
            </p>
            <Link href="/tests/free" className="btn btn-primary btn-lg">
              Start free check-in
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
