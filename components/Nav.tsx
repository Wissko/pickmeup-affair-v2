'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const links = [
  { label: 'Story', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Contact', href: '#contact' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 60)
  })

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 2.9 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 5vw, 3.5rem)',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
          background: scrolled ? 'rgba(10,8,6,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/images/logopickmeup.PNG"
            alt="Pick Me Up Affair"
            width={140}
            height={40}
            unoptimized
            style={{ objectFit: 'contain', height: '36px', width: 'auto', filter: 'brightness(1)' }}
          />
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,237,224,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,237,224,0.75)')}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0a0806',
                background: '#c9a96e',
                padding: '0.55rem 1.25rem',
                textDecoration: 'none',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e8c98a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a96e')}
            >
              Order
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: '#c9a96e',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimateMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function AnimateMobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        background: 'rgba(10,8,6,0.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
      }}
    >
      {links.map((link, i) => (
        <motion.a
          key={link.href}
          href={link.href}
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
          transition={{ delay: open ? i * 0.07 : 0, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 400,
            fontSize: '2.5rem',
            letterSpacing: '0.06em',
            color: '#f5ede0',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f5ede0')}
        >
          {link.label}
        </motion.a>
      ))}
      <motion.a
        href="#contact"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ delay: open ? 0.4 : 0, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-dm)',
          fontWeight: 400,
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#0a0806',
          background: '#c9a96e',
          padding: '0.75rem 2rem',
          textDecoration: 'none',
          marginTop: '1rem',
        }}
      >
        Place an Order
      </motion.a>
    </motion.div>
  )
}
