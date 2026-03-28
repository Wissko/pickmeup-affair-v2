'use client'

import NavMenu from '@/components/NavMenu'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavMenu />
      {children}
      <Footer />
    </>
  )
}
