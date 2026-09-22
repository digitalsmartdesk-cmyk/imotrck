'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BrandLogo } from './Brand'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { href: '/tests', label: 'Take a test', icon: '✦' },
  { href: '/reports', label: 'View reports', icon: '📋' },
  { href: '/progress', label: 'Progress', icon: '📈' },
  { href: '/settings', label: 'Account', icon: '⚙' },
  { href: '/tips-for-parents', label: 'Resources', icon: '📚' },
  { href: '/faq', label: 'Help & support', icon: '?' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <>
    <aside className="app-sidebar" style={{
      background: 'var(--navy)', color: 'var(--cream)',
      padding: '26px 18px',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh',
      width: 256, flexShrink: 0,
    }}>
      <div style={{ padding: '0 8px 8px' }}>
        <BrandLogo dark />
      </div>

      <nav style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.4)', fontWeight: 700, padding: '14px 12px 8px' }}>Menu</div>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 11,
              fontSize: 14, fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--cream)' : 'rgba(245,243,239,0.75)',
              background: isActive ? 'rgba(232,165,152,0.16)' : 'transparent',
              transition: 'all .15s',
            }}>
              <span style={{ fontSize: 16, opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', borderRadius: 11,
          fontSize: 14, fontWeight: 500,
          color: 'rgba(245,243,239,0.5)',
          background: 'none', border: 'none', cursor: 'pointer',
          transition: 'all .15s',
        }}>
          <span>↗</span> Log out
        </button>
      </div>
    </aside>

    {/* Mobile bottom nav */}
    <nav className="sidebar-bottom-nav">
      {[
        { href: '/dashboard', label: 'Home', icon: '⊞' },
        { href: '/tests', label: 'Tests', icon: '✦' },
        { href: '/reports', label: 'Reports', icon: '📋' },
        { href: '/progress', label: 'Progress', icon: '📈' },
        { href: '/settings', label: 'Account', icon: '⚙' },
      ].map(item => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
    </>
  )
}
