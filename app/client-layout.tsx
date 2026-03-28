'use client'

import { NavigationProvider } from './providers'
import NavMenu from '@/components/NavMenu'
import PageCurtain from '@/components/PageCurtain'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <NavMenu />
      <PageCurtain />
      {children}
      <Footer />
    </NavigationProvider>
  )
}
