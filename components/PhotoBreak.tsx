'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface PhotoBreakProps {
  src: string
  alt: string
  quote?: string
  quoteSource?: string
  objectPosition?: string
  tint?: string
}

export default function PhotoBreak({
  src,
  alt,
  quote,
  quoteSource,
  objectPosition = 'center',
  tint = 'rgba(10,8,6,0.45)',
}: PhotoBreakProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: 'clamp(280px, 50vw, 560px)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{ position: 'absolute', inset: '-12%', y: imageY }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          style={{ objectFit: 'cover', objectPosition }}
        />
      </motion.div>

      {/* Tint overlay */}
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: tint }}
      />

      {/* Quote overlay */}
      {quote && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '30px', height: '1px', background: '#c9a96e', marginBottom: '1.5rem' }} />
          <blockquote
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
              lineHeight: 1.45,
              color: '#f5ede0',
              maxWidth: '700px',
            }}
          >
            {quote}
          </blockquote>
          {quoteSource && (
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.6rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#c9a96e',
                marginTop: '1.25rem',
              }}
            >
              {quoteSource}
            </p>
          )}
          <div style={{ width: '30px', height: '1px', background: '#c9a96e', marginTop: '1.5rem' }} />
        </div>
      )}
    </div>
  )
}
