'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useNav } from '@/app/providers'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const inclusions = [
  'Full tiramisu assembly from scratch',
  'Expert guidance from the maker',
  'Take your creation home',
  'Recipe card to keep',
  'All equipment and premium ingredients provided',
  'Small groups of up to 10 people',
]

export default function Workshops({ standalone = false }: { standalone?: boolean }) {
  const { navigate } = useNav()

  return (
    <section
      id="workshops"
      style={{
        background: '#f5ede0',
        color: '#0a0806',
        padding: standalone
          ? 'calc(clamp(5rem, 10vw, 9rem) + 80px) clamp(1.25rem, 5vw, 5rem) clamp(5rem, 10vw, 9rem)'
          : 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 7rem)',
          alignItems: 'center',
          maxWidth: '1200px',
        }}
      >
        {/* Text side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.6rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#c9a96e',
              }}
            >
              Workshops
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#0a0806',
              }}
            >
              Learn the craft. Keep the memories.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 300,
                fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
                lineHeight: 1.85,
                color: 'rgba(10,8,6,0.65)',
                maxWidth: '400px',
              }}
            >
              Hands-on tiramisu workshops held at Brisbane markets and private venues. You will learn the real method, use premium ingredients, and assemble your own creation to take home.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 300,
                fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
                lineHeight: 1.85,
                color: 'rgba(10,8,6,0.65)',
                maxWidth: '400px',
              }}
            >
              Perfect for dates, birthday activities, hen parties, and team experiences. Private group bookings available.
            </p>
          </FadeUp>

          {/* Inclusions */}
          <FadeUp delay={0.4}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#7a6a58',
                  marginBottom: '1rem',
                }}
              >
                What is included
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {inclusions.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontFamily: 'var(--font-dm)',
                      fontWeight: 300,
                      fontSize: '0.88rem',
                      color: 'rgba(10,8,6,0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '1px',
                        background: '#c9a96e',
                        flexShrink: 0,
                        marginTop: '0.7em',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <button
              onClick={() => navigate('/contact')}
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                fontFamily: 'var(--font-dm)',
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#f5ede0',
                background: '#0a0806',
                border: 'none',
                padding: '1rem 2.25rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1a1410')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0a0806')}
            >
              Book a workshop
            </button>
          </FadeUp>
        </div>

        {/* Image side — stacked pair */}
        <FadeUp delay={0.2}>
          <div style={{ position: 'relative' }}>
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/craft.jpg"
                alt="Workshop hands crafting tiramisu"
                fill
                unoptimized
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Floating second image */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-1.5rem',
                width: '55%',
                aspectRatio: '1/1',
                overflow: 'hidden',
                border: '4px solid #f5ede0',
                boxShadow: '0 20px 60px rgba(10,8,6,0.15)',
              }}
            >
              <Image
                src="/images/spoon.jpg"
                alt="Tiramisu slice on a spoon"
                fill
                unoptimized
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Gold accent line */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '-1rem',
                left: '-1rem',
                width: '40%',
                height: '40%',
                border: '1px solid rgba(201,169,110,0.4)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
