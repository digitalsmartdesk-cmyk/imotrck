import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0 48px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>Terms of Service</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)', marginTop: 12 }}>Last updated: September 2026</p>
        </div>
      </section>
      <section style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {[
            { title: '1. Acceptance of terms', body: 'By creating an account or using ImoTracker, you agree to these Terms of Service. If you do not agree, please do not use the service.' },
            { title: '2. Service description', body: 'ImoTracker provides emotional wellness assessments for children aged 7–15. Our service is a wellness tool and is not a substitute for professional psychological assessment, therapy, or medical advice.' },
            { title: '3. Account requirements', body: 'You must be at least 18 years old to create an account. You are responsible for maintaining the security of your account credentials. You may only create accounts for children for whom you are a parent or legal guardian.' },
            { title: '4. Credits and payments', body: 'Credits are purchased in advance and used to access premium assessments. Credits are non-refundable once used. Unused credits do not expire. All prices are displayed in USD unless otherwise stated.' },
            { title: '5. Acceptable use', body: 'You agree not to use ImoTracker for any unlawful purpose, to attempt to access other users\' accounts, or to reverse-engineer our service.' },
            { title: '6. Disclaimer', body: 'ImoTracker provides wellness information for educational purposes only. Results should not be used as the sole basis for making decisions about your child\'s mental health. Always consult a qualified professional for clinical concerns.' },
            { title: '7. Limitation of liability', body: 'To the maximum extent permitted by law, ImoTracker shall not be liable for any indirect, incidental, or consequential damages arising from use of the service.' },
            { title: '8. Changes to terms', body: 'We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.' },
            { title: '9. Contact', body: 'For questions about these terms, contact support@imotracker.com.' },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
