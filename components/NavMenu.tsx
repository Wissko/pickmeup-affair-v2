'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
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

const ease = [0.22, 1, 0.36, 1] as const

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { navigate } = useNav()

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    setTimeout(() => navigate(href), 80)
  }

  // Pulse animation: slower at rest, slightly faster on hover
  const pulseDuration = hovered ? 1.8 : 2.8

  return (
    <>
      {/* Pulsing circle — fixed top-right */}
      <motion.button
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.08, 1],
        }}
        transition={{
          opacity: { duration: 0.6, ease, delay: 0.2 },
          scale: {
            duration: pulseDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          },
        }}
        style={{
          position: 'fixed',
          top: 'clamp(1rem, 2.5vw, 1.5rem)',
          right: 'clamp(1.25rem, 5vw, 3.5rem)',
          zIndex: 300,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(10,8,6,0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: hovered
            ? '1px solid rgba(201,169,110,0.9)'
            : '1px solid rgba(201,169,110,0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'border 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '0.95rem',
            color: '#c9a96e',
            letterSpacing: '0.03em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          PU
        </span>
      </motion.button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Expanding circle backdrop */}
            <motion.div
              key="circle-expand"
              initial={{ clipPath: 'circle(24px at calc(100% - clamp(1.25rem, 5vw, 3.5rem) - 24px) calc(clamp(1rem, 2.5vw, 1.5rem) + 24px))' }}
              animate={{ clipPath: 'circle(200% at calc(100% - clamp(1.25rem, 5vw, 3.5rem) - 24px) calc(clamp(1rem, 2.5vw, 1.5rem) + 24px))' }}
              exit={{ clipPath: 'circle(24px at calc(100% - clamp(1.25rem, 5vw, 3.5rem) - 24px) calc(clamp(1rem, 2.5vw, 1.5rem) + 24px))' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                background: '#0a0806',
                pointerEvents: 'none',
              }}
            />

            {/* Overlay content */}
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.25, ease }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 250,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top bar inside overlay */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 5vw, 3.5rem)',
                  borderBottom: '1px solid rgba(201,169,110,0.1)',
                }}
              >
                {/* Close button — X */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  style={{
                    background: 'none',
                    border: '1px solid rgba(201,169,110,0.3)',
                    cursor: 'pointer',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      width: '18px',
                      height: '1px',
                      background: '#c9a96e',
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      width: '18px',
                      height: '1px',
                      background: '#c9a96e',
                      transform: 'rotate(-45deg)',
                    }}
                  />
                </button>
              </div>

              {/* Main links */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 8vw, 8rem)',
                }}
              >
                {/* Decorative label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,169,110,0.4)',
                    marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
                  }}
                >
                  Navigation
                </motion.p>

                <nav aria-label="Main navigation">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + i * 0.06,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        borderBottom: '1px solid rgba(201,169,110,0.08)',
                      }}
                    >
                      <NavLink label={link.label} href={link.href} onClick={handleNav} />
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 8vw, 8rem)',
                  borderTop: '1px solid rgba(201,169,110,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontSize: '0.72rem',
                    color: 'rgba(245,237,224,0.3)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Brisbane, Queensland
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'rgba(201,169,110,0.4)',
                  }}
                >
                  Artisanal tiramisu, handcrafted
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
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
        padding: 'clamp(0.8rem, 2vw, 1.25rem) 0',
        textAlign: 'left',
        gap: '2rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          lineHeight: 1,
          color: hovered ? '#c9a96e' : '#f5ede0',
          transition: 'color 0.3s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
      <motion.span
        animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.2 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        style={{
          fontFamily: 'var(--font-dm)',
          fontSize: '0.8rem',
          color: '#c9a96e',
        }}
      >
        &#8594;
      </motion.span>
    </button>
  )
}
