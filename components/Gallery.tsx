'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        background: '#0f0c0a',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              marginBottom: '0.75rem',
            }}
          >
            Gallery
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#f5ede0',
            }}
          >
            Each one, a story
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 300,
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: 'rgba(245,237,224,0.5)',
            maxWidth: '260px',
          }}
        >
          From intimate gifts to grand event centrepieces. No two creations are alike.
        </p>
      </motion.div>

      {/* Masonry-style grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'auto',
          gap: '12px',
        }}
      >
        {/* Large hero image — left, tall */}
        <GalleryItem
          src="/images/coeur.jpg"
          alt="Three tiramisus with icing sugar heart"
          caption="Made with intention"
          style={{ gridColumn: '1 / 7', gridRow: '1 / 3', aspectRatio: '4/5' }}
          delay={0}
        />

        {/* Top right stack */}
        <GalleryItem
          src="/images/custom.jpg"
          alt="Custom pot with candles"
          caption="Personalized"
          style={{ gridColumn: '7 / 10', gridRow: '1 / 2', aspectRatio: '1/1' }}
          delay={0.1}
        />
        <GalleryItem
          src="/images/gift.jpg"
          alt="Be Mine gifting box"
          caption="Luxury gifting"
          style={{ gridColumn: '10 / 13', gridRow: '1 / 2', aspectRatio: '1/1' }}
          delay={0.15}
        />

        {/* Bottom right — wide */}
        <GalleryItem
          src="/images/raise.jpg"
          alt="Corporate tiramisu"
          caption="Corporate"
          style={{ gridColumn: '7 / 13', gridRow: '2 / 3', aspectRatio: '16/9' }}
          delay={0.2}
        />

        {/* Full width banner */}
        <GalleryItem
          src="/images/events.jpg"
          alt="Just Married tiramisu"
          caption="Events"
          style={{ gridColumn: '1 / 13', gridRow: '3', aspectRatio: '21/9' }}
          delay={0.25}
          objectPosition="center 35%"
        />
      </div>
    </section>
  )
}

function GalleryItem({
  src,
  alt,
  caption,
  style,
  delay,
  objectPosition = 'center',
}: {
  src: string
  alt: string
  caption: string
  style: React.CSSProperties
  delay?: number
  objectPosition?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        style={{
          objectFit: 'cover',
          objectPosition,
          transition: 'transform 0.7s ease',
        }}
      />
      {/* Hover overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,8,6,0)',
          transition: 'background 0.4s ease',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
        }}
        onMouseEnter={(e) => {
          const div = e.currentTarget
          div.style.background = 'rgba(10,8,6,0.45)'
          const img = div.previousElementSibling as HTMLImageElement
          if (img) img.style.transform = 'scale(1.04)'
        }}
        onMouseLeave={(e) => {
          const div = e.currentTarget
          div.style.background = 'rgba(10,8,6,0)'
          const img = div.previousElementSibling as HTMLImageElement
          if (img) img.style.transform = 'scale(1)'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,237,224,0)',
            transition: 'color 0.4s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(201,169,110,0.9)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,237,224,0)')}
        >
          {caption}
        </p>
      </div>
    </motion.div>
  )
}
