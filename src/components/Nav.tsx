'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogo } from './Brand'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const NAV_LINKS = [
    { href: '/about', label: 'Our mission' },
    { href: '/tests', label: 'Assessments' },
    { href: '/tips-for-parents', label: 'Resources' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(14px)',
        background: 'rgba(245, 243, 239, 0.82)',
        borderBottom: '1px solid var(--line-soft)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
            <BrandLogo />

            {/* Desktop links */}
            <div className="nav-links" style={{ display: 'flex', gap: 36 }}>
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  fontSize: 14.5, fontWeight: 500, color: 'var(--navy)',
                  opacity: pathname === href ? 1 : 0.78,
                  transition: 'opacity .2s',
                }}>{label}</Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="nav-ctas" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {user ? (
                <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-ghost">Log in</Link>
                  <Link href="/login?tab=signup" className="btn btn-primary">Sign up</Link>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                display: 'none',
                width: 44, height: 44,
                alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                flexDirection: 'column', gap: 5, padding: 10,
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--navy)',
                borderRadius: 1, transition: 'all .3s',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--navy)',
                borderRadius: 1, transition: 'all .3s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 22, height: 2, background: 'var(--navy)',
                borderRadius: 1, transition: 'all .3s',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'rgba(20,40,69,0.35)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity .3s',
        }}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
        width: 'min(340px, 88vw)',
        background: 'var(--cream)',
        boxShadow: '-8px 0 40px rgba(20,40,69,0.15)',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .32s cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 28px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <BrandLogo />
          <button onClick={() => setMenuOpen(false)} style={{
            width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--line)',
            background: 'var(--paper)', cursor: 'pointer', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              fontSize: 22, fontWeight: 700, color: pathname === href ? 'var(--teal)' : 'var(--navy)',
              padding: '16px 0', borderBottom: '1px solid var(--line)',
              transition: 'color .15s',
            }}>{label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
          {user ? (
            <Link href="/dashboard" className="btn btn-primary btn-lg" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center' }}>Dashboard</Link>
          ) : (
            <>
              <Link href="/login?tab=signup" className="btn btn-primary btn-lg" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center' }}>Sign up</Link>
              <Link href="/login" className="btn btn-ghost btn-lg" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center' }}>Log in</Link>
            </>
          )}
        </div>
      </div>


    </>
  )
}
