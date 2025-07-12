import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReWear - Sustainable Fashion Community',
  description: 'Join our community of conscious fashion lovers. Exchange clothing, reduce waste, and discover your next favorite piece while making a positive impact on the planet.',
  keywords: ['sustainable fashion', 'clothing exchange', 'eco-friendly', 'fashion community', 'clothing swap'],
  authors: [{ name: 'ReWear Team' }],
  openGraph: {
    title: 'ReWear - Sustainable Fashion Community',
    description: 'Join our community of conscious fashion lovers. Exchange clothing, reduce waste, and discover your next favorite piece.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReWear - Sustainable Fashion Community',
    description: 'Join our community of conscious fashion lovers. Exchange clothing, reduce waste, and discover your next favorite piece.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
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