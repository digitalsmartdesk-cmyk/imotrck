import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const FAQS = [
  { q: 'What age range is ImoTracker designed for?', a: 'ImoTracker is designed for children aged 7–15. Different assessments have different minimum age requirements — some topics like Identity & Authenticity are suited to ages 10 and up.' },
  { q: 'Is this a clinical or diagnostic tool?', a: 'No. ImoTracker is a wellness and emotional literacy tool, not a clinical assessment. It is designed to help parents understand and support their child\'s emotional development, not to diagnose any conditions.' },
  { q: 'How often should my child take an assessment?', a: 'We recommend one check-in per topic per year. This allows you to track meaningful development over time without over-testing.' },
  { q: 'Who sees the results?', a: 'Only the parent who creates the account can see the full report. Your child sees a brief, age-appropriate summary designed to be encouraging and non-alarming.' },
  { q: 'What happens to my child\'s data?', a: 'Your child\'s data is stored securely and never sold or shared with third parties. You can delete all data at any time from the Settings page.' },
  { q: 'How does the credit system work?', a: 'Each premium assessment requires 1 credit. The free Emotional Awareness check-in doesn\'t require any credits. You can purchase credit packs from the Pricing page.' },
  { q: 'Is there a free option?', a: 'Yes! The Emotional Awareness check-in is completely free and doesn\'t require an account. You can try it at any time.' },
  { q: 'What if my child scores low in an area?', a: 'A lower score is not a cause for alarm — it\'s a starting point. Each report includes specific suggestions for how to support your child in that area. If you have genuine concerns, we always recommend speaking with your child\'s paediatrician or a child psychologist.' },
]

export default function FAQPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '72px 0 64px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: 17, color: 'rgba(245,243,239,0.7)', lineHeight: 1.6 }}>Everything you need to know about ImoTracker.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="card" style={{ padding: '24px 28px' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{faq.q}</h3>
                <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 16 }}>Still have questions?</p>
            <a href="mailto:support@imotracker.com" className="btn btn-primary">Contact support</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
