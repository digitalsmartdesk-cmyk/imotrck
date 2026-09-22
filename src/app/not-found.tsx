import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🌊</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Page not found</h1>
      <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 32 }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">Go home</Link>
    </div>
  )
}
