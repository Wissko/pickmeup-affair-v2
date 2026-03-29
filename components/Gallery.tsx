'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const slides = [
  { src: '/images/hero.jpg',   alt: 'Handcrafted tiramisu',       caption: 'Handcrafted Tiramisu' },
  { src: '/images/coeur.jpg',  alt: 'Three tiramisus with heart', caption: 'Made with intention' },
  { src: '/images/custom.jpg', alt: 'Custom pot with candles',    caption: 'Personalized creations' },
  { src: '/images/gift.jpg',   alt: 'Luxury gifting box',         caption: 'Luxury gifting' },
  { src: '/images/craft.jpg',  alt: 'Artisan at work',            caption: 'The craft' },
  { src: '/images/events.jpg', alt: 'Just Married tiramisu',      caption: 'Events' },
  { src: '/images/raise.jpg',  alt: 'Corporate tiramisu',         caption: 'Corporate' },
  { src: '/images/spoon.jpg',  alt: 'Spoon detail',               caption: 'Every detail counts' },
  { src: '/images/can.jpg',    alt: 'Artisan can',                caption: 'Artisan made' },
]

const AUTOPLAY_MS = 4000

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Gallery({ standalone = false }: { standalone?: boolean }) {
  const [[index, dir], setSlide] = useState([0, 1])
  const hovering = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback(
    (nextDir: number) => {
      setSlide(([prev]) => {
        const next = (prev + nextDir + slides.length) % slides.length
        return [next, nextDir]
      })
    },
    [],
  )

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (!hovering.current) go(1)
    }, AUTOPLAY_MS)
  }, [go])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [index, resetTimer])

  const handlePrev = () => { go(-1); resetTimer() }
  const handleNext = () => { go(1); resetTimer() }
  const handleDot  = (i: number) => {
    const d = i > index ? 1 : -1
    setSlide([i, d])
    resetTimer()
  }

  const topPad = standalone
    ? 'calc(clamp(5rem, 10vw, 9rem) + 80px)'
    : 'clamp(5rem, 10vw, 9rem)'

  return (
    <section
      style={{
        background: '#0d0b09',
        paddingTop: topPad,
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(2rem, 4vw, 3.5rem)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          padding: '0 clamp(1.25rem, 4vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
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
      </div>

      {/* Carousel */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(280px, 85vw, 100%)',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: '#0d0b09',
        }}
        onMouseEnter={() => { hovering.current = true }}
        onMouseLeave={() => { hovering.current = false }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              unoptimized
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Caption overlay — glassmorphism bottom-left */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(1rem, 3vw, 2rem)',
                left: 'clamp(1rem, 3vw, 2rem)',
                padding: '0.55rem 1rem',
                background: 'rgba(10,8,6,0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderLeft: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,169,110,0.9)',
                  margin: 0,
                }}
              >
                {slides[index].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow — prev */}
        <button
          onClick={handlePrev}
          aria-label="Previous"
          style={{
            position: 'absolute',
            left: 'clamp(0.75rem, 2vw, 1.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(10,8,6,0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.2)',
            color: 'rgba(201,169,110,0.7)',
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'opacity 0.3s',
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8 2L2 8L8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Arrow — next */}
        <button
          onClick={handleNext}
          aria-label="Next"
          style={{
            position: 'absolute',
            right: 'clamp(0.75rem, 2vw, 1.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(10,8,6,0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.2)',
            color: 'rgba(201,169,110,0.7)',
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'opacity 0.3s',
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M2 2L8 8L2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === index ? '1.6rem' : '0.4rem',
              height: '0.4rem',
              borderRadius: '999px',
              background: i === index ? '#c9a96e' : 'rgba(201,169,110,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
