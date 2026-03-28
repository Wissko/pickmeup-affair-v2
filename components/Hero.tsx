'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useNav } from '@/app/providers'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const { navigate } = useNav()

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Parallax image */}
      <motion.div style={{ position: 'absolute', inset: '-10%', y: imageY }}>
        <Image
          src="/images/hero.jpg"
          alt="Pick Me Up Affair — handcrafted tiramisu verrine"
          fill
          priority
          unoptimized
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0) 50%, rgba(10,8,6,0.7) 100%), linear-gradient(to top, rgba(10,8,6,1) 0%, rgba(10,8,6,0) 40%)',
        }}
      />

      {/* Content bottom-left */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '100svh',
          padding: 'clamp(1.5rem, 5vw, 4.5rem)',
          paddingTop: '8rem',
          paddingBottom: 'clamp(3rem, 7vw, 6rem)',
          y: textY,
          opacity,
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 3.0 }}
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: '1.25rem',
          }}
        >
          Artisanal Tiramisu · Brisbane
        </motion.p>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease, delay: 3.1 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 600,
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#f5ede0',
            }}
          >
            Pick Me Up
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease, delay: 3.2 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#c9a96e',
            }}
          >
            Affair
          </motion.h1>
        </div>

        {/* Tagline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 3.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
              color: 'rgba(245,237,224,0.65)',
              maxWidth: '320px',
              lineHeight: 1.7,
            }}
          >
            Handcrafted for those who believe dessert should be an experience, not an afterthought.
          </p>

          <button
            onClick={() => navigate('/contact')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-dm)',
              fontWeight: 400,
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f5ede0',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.5)',
              paddingBottom: '0.25rem',
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#c9a96e'
              e.currentTarget.style.borderColor = '#c9a96e'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#f5ede0'
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'
            }}
          >
            Make it yours — order yours now
            <span style={{ fontSize: '1.2em' }}>&#8594;</span>
          </button>


        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: 'clamp(1.5rem, 5vw, 4.5rem)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.6)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </p>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #c9a96e, transparent)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  )
}
