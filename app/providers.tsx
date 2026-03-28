'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

const pageLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'Our Story',
  '/experiences': 'Experiences',
  '/occasions': 'Occasions',
  '/workshops': 'Workshops',
  '/gallery': 'Gallery',
  '/contact': 'Contact',
}

export type CurtainPhase = 'idle' | 'in' | 'out'

interface NavContextValue {
  navigate: (href: string) => void
  curtainPhase: CurtainPhase
  curtainLabel: string
}

const NavigationContext = createContext<NavContextValue>({
  navigate: () => {},
  curtainPhase: 'idle',
  curtainLabel: '',
})

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>('idle')
  const [curtainLabel, setCurtainLabel] = useState('')
  const isNavigating = useRef(false)

  const navigate = useCallback(
    (href: string) => {
      if (isNavigating.current) return
      isNavigating.current = true

      const label = pageLabels[href] ?? ''
      setCurtainLabel(label)
      setCurtainPhase('in')

      // curtain closes → navigate → curtain opens
      setTimeout(() => {
        router.push(href)
        setTimeout(() => {
          setCurtainPhase('out')
          setTimeout(() => {
            setCurtainPhase('idle')
            setCurtainLabel('')
            isNavigating.current = false
          }, 600)
        }, 80)
      }, 520)
    },
    [router],
  )

  return (
    <NavigationContext.Provider value={{ navigate, curtainPhase, curtainLabel }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNav() {
  return useContext(NavigationContext)
}
