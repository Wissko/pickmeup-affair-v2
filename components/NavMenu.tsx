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
      {/* Trigger — pill haut gauche */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        initial={{ opacity: 0 }}
        animate={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
        }}
        transition={{ duration: 0.35, ease: EASE }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,26,42,0.8)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139,26,42,0.4)'
        }}
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
          padding: '7px 14px',
          background: 'rgba(10,8,6,0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '999px',
          border: '1px solid rgba(139,26,42,0.4)',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Cherry SVG — réduit 12×15px */}
        <svg
          width="12"
          height="15"
          viewBox="0 0 20 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M10 11 C10.5 7 13 5 13.5 1.5"
            stroke="#8B1A2A"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            d="M13.5 4 C16 2.5 16.5 6.5 13 6"
            stroke="#8B1A2A"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M13.5 4 C13.2 5 13 6 13 6"
            stroke="#8B1A2A"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="10" cy="16.5" r="5" stroke="#8B1A2A" strokeWidth="0.85" fill="none" />
          <path
            d="M7.5 13.5 C8 12.5 9.5 12.2 10.5 12.8"
            stroke="#8B1A2A"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        {/* Séparateur vertical */}
        <span
          style={{
            display: 'block',
            width: '1px',
            height: '10px',
            background: 'rgba(255,255,255,0.15)',
            flexShrink: 0,
          }}
        />

        {/* "Menu" */}
        <span
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
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
