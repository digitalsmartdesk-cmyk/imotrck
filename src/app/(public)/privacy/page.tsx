import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0 48px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>Privacy Policy</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)', marginTop: 12 }}>Last updated: September 2026</p>
        </div>
      </section>
      <section style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {[
            { title: '1. Information we collect', body: 'We collect information you provide when creating an account (name, email address, country), information about your children (first name, date of birth, relationship), and the answers your child provides during assessments. We do not collect any information that would allow us to identify your child independently.' },
            { title: '2. How we use your information', body: 'We use your information to provide the ImoTracker service, generate assessment reports, and improve our product. We do not sell your data to third parties. We do not use your child\'s data for advertising purposes.' },
            { title: '3. Data storage and security', body: 'Your data is stored securely using industry-standard encryption. We use Supabase as our database provider, which is compliant with SOC 2 Type II standards. All data is transmitted over HTTPS.' },
            { title: '4. Children\'s privacy (COPPA)', body: 'We take children\'s privacy very seriously. ImoTracker is designed for use by parents on behalf of their children. Parents create and control all accounts. Children\'s assessment data is never shared with third parties. See our COPPA Notice for full details.' },
            { title: '5. Your rights', body: 'You have the right to access, correct, or delete any personal data we hold about you or your child. You can delete your account and all associated data at any time from the Settings page. For requests, contact support@imotracker.com.' },
            { title: '6. Cookies', body: 'We use essential cookies for authentication only. We do not use tracking or advertising cookies.' },
            { title: '7. Contact', body: 'For privacy-related questions, contact us at support@imotracker.com.' },
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
