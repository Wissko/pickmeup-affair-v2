'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useNav } from '@/app/providers'

const ease = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Occasions', href: '/occasions' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { navigate } = useNav()

  return (
    <footer
      style={{
        background: '#070503',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 5rem)',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 'fit-content' }}
            aria-label="Go to homepage"
          >
            <Image
              src="/images/logopickmeup.PNG"
              alt="Pick Me Up Affair"
              width={130}
              height={40}
              unoptimized
              style={{ objectFit: 'contain', width: 'auto', height: '32px', objectPosition: 'left' }}
            />
          </button>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontWeight: 300,
              fontSize: '0.82rem',
              lineHeight: 1.75,
              color: 'rgba(245,237,224,0.4)',
              maxWidth: '240px',
            }}
          >
            Artisanal tiramisu handcrafted in Brisbane. Pop-ups, workshops, and custom creations for every occasion.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#7a6a58',
              marginBottom: '1.25rem',
            }}
          >
            Navigation
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => navigate(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'var(--font-dm)',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    color: 'rgba(245,237,224,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,237,224,0.5)')}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + contact */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#7a6a58',
              marginBottom: '1.25rem',
            }}
          >
            Connect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { platform: 'Instagram', handle: '@pickmeupaffair' },
              { platform: 'Facebook', handle: 'Pick Me Up Affair' },
            ].map((s) => (
              <div key={s.platform}>
                <p
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#7a6a58',
                    marginBottom: '0.2rem',
                  }}
                >
                  {s.platform}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    color: 'rgba(245,237,224,0.5)',
                  }}
                >
                  {s.handle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(201,169,110,0.08)',
          paddingTop: '1.5rem',
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
            fontSize: '0.7rem',
            color: 'rgba(245,237,224,0.25)',
            letterSpacing: '0.06em',
          }}
        >
          {new Date().getFullYear()} Pick Me Up Affair. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'rgba(201,169,110,0.4)',
          }}
        >
          Handcrafted in Brisbane
        </p>
      </div>
    </footer>
  )
}
