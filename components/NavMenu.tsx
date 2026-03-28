'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useNav } from '@/app/providers'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/about' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Occasions', href: '/occasions' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { navigate } = useNav()

  const close = useCallback(() => setOpen(false), [])

  // Close on route change
  useEffect(() => { close() }, [pathname, close])

  // Keyboard escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = (href: string) => {
    close()
    setTimeout(() => navigate(href), 80)
  }

  return (
    <>
      {/* Trigger — languette gauche */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        animate={{
          x: open ? -60 : 0,
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
        }}
        whileHover={{
          borderColor: 'rgba(201,169,110,0.6)',
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          padding: '20px 14px 20px 8px',
          background: 'rgba(10,8,6,0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '0 20px 20px 0',
          border: '1px solid rgba(201,169,110,0.25)',
          borderLeft: 'none',
          cursor: 'pointer',
          transition: 'border 0.3s ease',
        }}
      >
        {/* "PM" initials */}
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '28px',
            color: '#8B1A2A',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          PM
        </span>

        {/* Separator */}
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '1px',
            background: 'rgba(245,237,224,0.2)',
          }}
        />

        {/* "Menu" vertical */}
        <span
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '8px',
            fontWeight: 400,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            color: 'rgba(245,237,224,0.7)',
            userSelect: 'none',
          }}
        >
          Menu
        </span>
      </motion.button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.75, ease: EASE }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: '#0a0806',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close button — top right */}
            <button
              onClick={close}
              aria-label="Close navigation"
              style={{
                position: 'absolute',
                top: 'clamp(1.5rem, 3vw, 2rem)',
                right: 'clamp(1.5rem, 5vw, 3.5rem)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                opacity: 0.6,
                lineHeight: 0,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <line x1="4" y1="4" x2="24" y2="24" stroke="#f5ede0" strokeWidth="1" />
                <line x1="24" y1="4" x2="4" y2="24" stroke="#f5ede0" strokeWidth="1" />
              </svg>
            </button>

            {/* Navigation links */}
            <nav
              aria-label="Main navigation"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 8vw, 8rem)',
              }}
            >
              {links.map((link, i) => (
                <div
                  key={link.href}
                  style={{
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(201,169,110,0.07)',
                  }}
                >
                  <motion.div
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '105%', opacity: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: i * 0.06,
                      ease: EASE,
                    }}
                  >
                    <NavLink
                      label={link.label}
                      href={link.href}
                      index={i}
                      active={pathname === link.href}
                      onClick={handleNav}
                    />
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: EASE }}
              style={{
                padding: 'clamp(1.25rem, 2.5vw, 2rem) clamp(1.5rem, 8vw, 8rem)',
                borderTop: '1px solid rgba(201,169,110,0.07)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,237,224,0.28)',
                  fontWeight: 300,
                }}
              >
                Farmers Market · Powerhouse · Jan Powers
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: 'rgba(201,169,110,0.35)',
                  fontWeight: 300,
                }}
              >
                @pickmeup.affair
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({
  label,
  href,
  index,
  active,
  onClick,
}: {
  label: string
  href: string
  index: number
  active: boolean
  onClick: (href: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => onClick(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 'clamp(0.75rem, 1.8vw, 1.2rem) 0',
        textAlign: 'left',
        gap: '2rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 4.25rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: active ? '#8B1A2A' : hovered ? '#c9a96e' : '#f5ede0',
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-dm)',
          fontSize: '0.65rem',
          fontWeight: 300,
          letterSpacing: '0.35em',
          color: 'rgba(245,237,224,0.22)',
          flexShrink: 0,
        }}
      >
        0{index + 1}
      </span>
    </button>
  )
}
