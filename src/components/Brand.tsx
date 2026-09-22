'use client'
import Link from 'next/link'

export function BrandMark({ size = 36, bg = 'var(--navy)' }: { size?: number; bg?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: size * 0.16,
        borderRadius: '50%',
        background: `radial-gradient(circle at 60% 35%, #E8A598 0 ${size * 0.1}px, transparent ${size * 0.14}px),
          linear-gradient(180deg, #f4e9d8 0%, #b9c8be 45%, #2C5F5D 100%)`,
      }} />
      <div style={{
        position: 'absolute', left: '50%', bottom: size * 0.1,
        width: size * 0.08, height: size * 0.5,
        background: '#F5F3EF',
        transform: 'translateX(-50%) rotate(-8deg)',
        borderRadius: 2,
      }} />
    </div>
  )
}

export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <BrandMark bg={dark ? '#F5F3EF' : 'var(--navy)'} />
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: dark ? '#F5F3EF' : 'var(--navy)' }}>
          Im<span style={{ color: dark ? '#E8A598' : 'var(--teal)' }}>o</span>Tracker
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'rgba(245,243,239,0.6)' : 'var(--teal)', fontWeight: 600 }}>
          Mapping Your Inner World
        </div>
      </div>
    </Link>
  )
}
