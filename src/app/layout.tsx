import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ImoTracker — Child Emotional Intelligence Assessments',
  description: 'Track your child\'s emotional growth from ages 7–15 with science-backed assessments. Annual check-ins build a picture that lasts a lifetime.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
