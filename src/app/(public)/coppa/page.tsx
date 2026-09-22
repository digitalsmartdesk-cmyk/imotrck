import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function CoppaPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0 48px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>COPPA Notice</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)', marginTop: 12 }}>Children&apos;s Online Privacy Protection Act — Last updated: September 2026</p>
        </div>
      </section>
      <section style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ background: 'rgba(44,95,93,0.08)', border: '1px solid rgba(44,95,93,0.2)', borderRadius: 14, padding: '20px 24px', marginBottom: 40 }}>
            <p style={{ fontSize: 15, color: 'var(--navy)', fontWeight: 600, marginBottom: 8 }}>ImoTracker is designed to be used by parents, not directly by children.</p>
            <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.6 }}>All accounts are created and controlled by parents or legal guardians aged 18 or over. Children never create accounts independently or provide personal information directly to ImoTracker.</p>
          </div>
          {[
            { title: 'Our approach to children\'s data', body: 'ImoTracker collects minimal information about children: only a first name and date of birth (to ensure age-appropriate assessments). This information is provided by the parent. Assessment responses are stored securely and associated with the parent\'s account.' },
            { title: 'Parental consent', body: 'By creating an ImoTracker account and adding a child profile, the parent provides verifiable parental consent for any data collection related to their child. Parents can revoke this consent and delete all child data at any time from the Settings page.' },
            { title: 'What we do not do', body: 'We do not allow children under 13 to create accounts. We do not collect personal information from children without parental consent. We do not share children\'s data with third parties. We do not use children\'s data for advertising.' },
            { title: 'Data deletion', body: 'Parents can delete all data associated with a child profile at any time from Settings > Children > Delete child profile. This permanently removes all assessment history, scores, and reports for that child.' },
            { title: 'Contact', body: 'For COPPA-related questions or to request deletion of your child\'s data, contact support@imotracker.com. We will respond within 5 business days.' },
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
