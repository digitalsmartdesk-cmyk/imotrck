'use client'
import Link from 'next/link'
import { BrandLogo } from './Brand'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <BrandLogo dark />
            <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(245,243,239,0.6)', lineHeight: 1.6, maxWidth: 260 }}>
              Science-backed emotional wellness assessments for children ages 7–15.
            </p>
            <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>
              support@imotracker.com
            </p>
          </div>
          {[
            { title: 'Product', links: [
              { href: '/tests', label: 'Assessments' },
              { href: '/tests/free', label: 'Free Test' },
              { href: '/checkout', label: 'Pricing' },
              { href: '/reports', label: 'Reports' },
            ]},
            { title: 'Company', links: [
              { href: '/about', label: 'Our Mission' },
              { href: '/tips-for-parents', label: 'Resources' },
              { href: '/faq', label: 'FAQ' },
              { href: '/about#science', label: 'Science' },
            ]},
            { title: 'Legal', links: [
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/coppa', label: 'COPPA Notice' },
            ]},
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.4)', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(({ href, label }) => (
                  <Link key={href} href={href} style={{ fontSize: 14, color: 'rgba(245,243,239,0.65)', transition: 'color .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,243,239,0.65)')}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(245,243,239,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>© 2026 ImoTracker. All rights reserved.</p>
          <p style={{ fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>COPPA · GDPR · SSL Secured</p>
        </div>
      </div>
    </footer>
  )
}
