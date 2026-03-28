'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const occasions = [
  {
    tag: 'Weddings',
    title: 'The centrepiece they will remember',
    desc: 'A tiramisu wedding cake that actually tastes extraordinary. Customised to your colour palette, flavour profile, and story. From intimate elopements to grand receptions.',
    image: '/images/events.jpg',
    cta: 'Enquire for weddings',
  },
  {
    tag: 'Corporate',
    title: 'Your brand, beautifully edible',
    desc: 'Logo-stencilled creations for product launches, team events, and client gifting. Arrive presentation-ready, leave an impression that outlasts the meeting.',
    image: '/images/raise.jpg',
    cta: 'Corporate enquiries',
  },
  {
    tag: 'Gifting',
    title: 'Luxury, in a jar',
    desc: 'Named, dated, wrapped. A personalised tiramisu pot as a birthday gift, anniversary surprise, or heartfelt thank-you. The kind of gift someone actually wants.',
    image: '/images/gift.jpg',
    cta: 'Order a gift',
  },
]

export default function Occasions() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="occasions"
      style={{
        background: '#0a0806',
        padding: 'clamp(5rem, 10vw, 9rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          padding: '0 clamp(1.25rem, 5vw, 5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          maxWidth: '700px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.6rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: '1rem',
          }}
        >
          Custom Occasions
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f5ede0',
          }}
        >
          Whatever the moment, we craft the memory
        </h2>
      </motion.div>

      {/* Occasions — horizontal scrollable on mobile, stacked on desktop */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
        }}
      >
        {occasions.map((occ, i) => (
          <OccasionRow key={occ.tag} item={occ} index={i} />
        ))}
      </div>
    </section>
  )
}

function OccasionRow({ item, index }: { item: typeof occasions[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
        minHeight: '65vh',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          order: index % 2 === 0 ? 1 : 0,
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Side fade */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: index % 2 === 0
              ? 'linear-gradient(to left, transparent 60%, rgba(10,8,6,0.9) 100%)'
              : 'linear-gradient(to right, transparent 60%, rgba(10,8,6,0.9) 100%)',
          }}
        />
        {/* Tag */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: index % 2 === 0 ? 'auto' : '2rem',
            left: index % 2 === 0 ? '2rem' : 'auto',
            background: 'rgba(10,8,6,0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.3)',
            padding: '0.4rem 1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9a96e',
            }}
          >
            {item.tag}
          </p>
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2.5rem, 6vw, 5.5rem)',
          background: '#0a0806',
          order: index % 2 === 0 ? 0 : 1,
          gap: '1.5rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            lineHeight: 1.15,
            color: '#f5ede0',
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
            lineHeight: 1.85,
            color: 'rgba(245,237,224,0.58)',
            maxWidth: '360px',
          }}
        >
          {item.desc}
        </p>

        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-dm)',
            fontWeight: 400,
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            textDecoration: 'none',
            paddingBottom: '0.3rem',
            borderBottom: '1px solid rgba(201,169,110,0.35)',
            width: 'fit-content',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)')}
        >
          {item.cta}
          <span>&#8594;</span>
        </a>
      </div>
    </motion.div>
  )
}
