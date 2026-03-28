'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null)
  const inView = useInView(imgRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      style={{
        background: '#0a0806',
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Top label */}
      <FadeUp>
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.6rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          Our Story
        </p>
      </FadeUp>

      {/* Split layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
          maxWidth: '1200px',
        }}
      >
        {/* Image side */}
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: -40, scale: 0.96 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/craft.jpg"
            alt="Hands placing cherries on tiramisu — the craft"
            fill
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Gold frame accent */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-12px',
              width: '50%',
              height: '50%',
              border: '1px solid rgba(201,169,110,0.3)',
              pointerEvents: 'none',
            }}
          />
          {/* Caption */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(10,8,6,0.85), transparent)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(201,169,110,0.8)',
              }}
            >
              Every layer, by hand
            </p>
          </div>
        </motion.div>

        {/* Text side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <FadeUp delay={0.15}>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#f5ede0',
              }}
            >
              Born from a love of{' '}
              <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>
                real flavour
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 300,
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.85,
                color: 'rgba(245,237,224,0.65)',
              }}
            >
              Pick Me Up Affair started as a kitchen obsession. A belief that tiramisu, done with care and exceptional ingredients, could be something truly transportive. Not a slice from a buffet. A moment.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 300,
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.85,
                color: 'rgba(245,237,224,0.65)',
              }}
            >
              From Brisbane market pop-ups to weddings and intimate gatherings, each creation is assembled to order. No shortcuts. Every layer placed with intention.
            </p>
          </FadeUp>

          {/* Gold divider + quote */}
          <FadeUp delay={0.45}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '1px',
                  height: '80px',
                  background: 'linear-gradient(to bottom, #c9a96e, transparent)',
                  flexShrink: 0,
                  marginTop: '0.2rem',
                }}
              />
              <blockquote
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  lineHeight: 1.55,
                  color: 'rgba(245,237,224,0.8)',
                }}
              >
                &ldquo;Tiramisu means pick me up in Italian. We take that seriously.&rdquo;
              </blockquote>
            </div>
          </FadeUp>

          {/* Stats row */}
          <FadeUp delay={0.5}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(201,169,110,0.15)',
              }}
            >
              {[
                { n: '100%', label: 'Handmade' },
                { n: 'BNE', label: 'Markets' },
                { n: 'Custom', label: 'Every order' },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      fontWeight: 600,
                      color: '#c9a96e',
                      lineHeight: 1,
                    }}
                  >
                    {item.n}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,237,224,0.45)',
                      marginTop: '0.4rem',
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
