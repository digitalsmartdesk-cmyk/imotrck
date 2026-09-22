import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const DOMAINS = [
  { name: 'Emotional Awareness', desc: 'Can your child name and notice their feelings in the moment?' },
  { name: 'Emotional Regulation', desc: 'How effectively can your child manage their emotional reactions?' },
  { name: 'Stress & Resilience', desc: 'How does your child handle pressure and bounce back from setbacks?' },
  { name: 'Empathy & Social Sense', desc: "Does your child understand and care about others' feelings?" },
  { name: 'Relationships & Trust', desc: 'How does your child build and maintain meaningful relationships?' },
  { name: 'Self-Perception', desc: 'How does your child see themselves — strengths, values, identity?' },
  { name: 'Identity & Authenticity', desc: 'Is your child developing a confident, authentic sense of self?' },
  { name: 'Meaning & Purpose', desc: 'Does your child have a sense of what matters to them in life?' },
]

const TEAM = [
  { name: 'Dr. Amara Okafor', role: 'Child Psychologist', bio: '15 years in developmental psychology, specialising in emotional literacy for school-age children.' },
  { name: 'Ravi Menon', role: 'Co-founder & CEO', bio: "Former ed-tech founder and parent of two who wanted better tools for understanding children's inner lives." },
  { name: 'Dr. Lena Hartman', role: 'Developmental Science', bio: 'Research scientist focused on longitudinal emotional development and the science of wellbeing in children.' },
  { name: 'Sofia Reyes', role: 'Parent Experience', bio: 'Family counsellor who ensures every word, design choice, and insight is grounded in what parents actually need.' },
]

export default function AboutPage() {
  return (
    <>
      <Nav />

      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '96px 0 80px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-label" style={{ color: 'var(--coral)', marginBottom: 16 }}>Our Mission</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 24px' }}>
            Built for the emotional<br /><span className="serif" style={{ color: 'var(--coral)' }}>journey of childhood</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(245,243,239,0.75)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>
            We believe every child deserves to be understood — not just achieved. ImoTracker gives families a shared language for emotions and a way to watch that language grow over time.
          </p>
          <Link href="/tests/free" className="btn btn-coral btn-lg">Try the free check-in</Link>
        </div>
      </section>

      <section style={{ background: 'var(--coral-soft)', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
          <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.5 }}>
            &ldquo;Academic achievement gets measured constantly. Emotional growth barely gets measured at all. We wanted to change that.&rdquo;
          </p>
          <p style={{ marginTop: 12, fontSize: 14, color: 'var(--navy)', opacity: 0.6 }}>— Ravi Menon, Co-founder</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-label" style={{ textAlign: 'center' }}>What we believe</div>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Three ideas at our core</h2>
          <div className="rg-3up">
            {[
              { num: '01', title: 'Emotions need language', body: 'Children who can name their feelings are better equipped to manage them. Emotional literacy is a learnable skill — and it starts with vocabulary.' },
              { num: '02', title: 'Parents are the key', body: "Therapists and teachers play a role, but parents are the constant. Our job is to give parents insight and language, not replace their judgment." },
              { num: '03', title: 'Data over time reveals what a moment cannot', body: 'One snapshot tells you little. Eight years of annual check-ins reveals patterns, growth, and the quiet shifts that matter most.' },
            ].map(b => (
              <div key={b.num} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--coral)', opacity: 0.4, marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>{b.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.6 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream-deep)', padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Our approach</h2>
          <div className="rg-about-approach">
            <div className="card" style={{ borderColor: 'rgba(44,95,93,0.3)', padding: 32 }}>
              <h3 style={{ color: 'var(--teal)', marginBottom: 20, fontSize: 18, fontWeight: 700 }}>✓ What ImoTracker is</h3>
              {['A wellness and emotional literacy tool', 'Grounded in developmental psychology', 'Designed for longitudinal, annual tracking', 'Parent-empowering — not parent-replacing', 'Warm, non-judgmental, and age-appropriate'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--navy-ink)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ borderColor: 'rgba(192,57,43,0.2)', padding: 32 }}>
              <h3 style={{ color: '#c0392b', marginBottom: 20, fontSize: 18, fontWeight: 700 }}>✗ What we are not</h3>
              {['A diagnostic or clinical tool', 'A replacement for therapy or counselling', 'A pass/fail test with right or wrong answers', 'A surveillance or monitoring system', 'A substitute for talking with your child'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ color: '#c0392b', fontWeight: 700, flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 14, color: 'var(--navy-ink)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0' }}>
        <div className="container">
          <div className="rg-4up" style={{ textAlign: 'center' }}>
            {[
              { val: '10,000+', label: 'Families trust ImoTracker' },
              { val: '8', label: 'Developmental domains assessed' },
              { val: '7–15', label: 'Age range covered' },
              { val: '4.9★', label: 'Average parent rating' },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--coral)', letterSpacing: '-0.02em' }}>{s.val}</div>
                <div style={{ fontSize: 14, color: 'rgba(245,243,239,0.65)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="science" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-label" style={{ textAlign: 'center' }}>The science</div>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 16 }}>8 domains. One picture.</h2>
          <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.6 }}>
            Each assessment tracks these eight areas of emotional development, drawn from decades of child psychology research.
          </p>
          <div className="rg-4up">
            {DOMAINS.map((d, i) => (
              <div key={d.name} className="card" style={{ padding: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--teal)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{i + 1}</div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{d.name}</h4>
                <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.65, lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream-deep)', padding: '80px 0' }}>
        <div className="container">
          <div className="section-label" style={{ textAlign: 'center' }}>The team</div>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Built by people who care</h2>
          <div className="rg-4up">
            {TEAM.map(t => (
              <div key={t.name} className="card" style={{ padding: 24, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--teal)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, margin: '0 auto 16px' }}>
                  {t.name[0]}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.role}</div>
                <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.55 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', textAlign: 'center', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Start your child&apos;s emotional journey</h2>
          <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 32, lineHeight: 1.6 }}>
            One free check-in. No credit card. A first step toward understanding the child in front of you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/tests/free" className="btn btn-coral btn-lg">Try free check-in</Link>
            <Link href="/login?tab=signup" className="btn btn-primary btn-lg">Sign up free</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
