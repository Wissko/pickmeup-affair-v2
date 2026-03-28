import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import ClientLayout from './client-layout'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pick Me Up Affair — Artisanal Tiramisu Brisbane',
  description:
    'Handcrafted tiramisu creations for pop-ups, workshops, and premium events in Brisbane. Custom cakes, gifting, and corporate experiences.',
  openGraph: {
    title: 'Pick Me Up Affair',
    description: 'Artisanal tiramisu. Handcrafted in Brisbane.',
    images: ['/images/hero.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  )
}
