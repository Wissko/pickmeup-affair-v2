'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
  const [scrolled, setScrolled] = useState(false)
  const { navigate } = useNav()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    setTimeout(() => navigate(href), 80)
  }

  return (
    <>
      {/* Fixed nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 5vw, 3.5rem)',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
          background: scrolled ? 'rgba(10,8,6,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(201,169,110,0.12)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Go to homepage"
        >
          <Image
            src="/images/logopickmeup.PNG"
            alt="Pick Me Up Affair"
            width={140}
            height={40}
            unoptimized
            style={{
              objectFit: 'contain',
              height: '36px',
              width: 'auto',
              filter: 'brightness(1)',
            }}
          />
        </button>

        {/* Trigger — signature pill */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
          }}
        >
          <motion.span
            animate={{ width: open ? '28px' : '28px' }}
            style={{
              display: 'block',
              width: '28px',
              height: '1px',
              background: '#c9a96e',
            }}
          />
          <motion.span
            animate={{ width: open ? '18px' : '18px' }}
            style={{
              display: 'block',
              width: '18px',
              height: '1px',
              background: 'rgba(201,169,110,0.55)',
            }}
          />
        </button>
      </motion.nav>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 199,
              background: '#070503',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top bar inside overlay */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 5vw, 3.5rem)',
                borderBottom: '1px solid rgba(201,169,110,0.1)',
              }}
            >
              <button
                onClick={() => handleNav('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                aria-label="Go to homepage"
              >
                <Image
                  src="/images/logopickmeup.PNG"
                  alt="Pick Me Up Affair"
                  width={130}
                  height={40}
                  unoptimized
                  style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
                />
              </button>

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
                transition={{ delay: 0.3, duration: 0.5 }}
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
                      delay: 0.25 + i * 0.06,
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
              transition={{ delay: 0.7, duration: 0.5 }}
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
