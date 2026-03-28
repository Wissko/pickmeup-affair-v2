'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

// Placeholder market schedule
const markets = [
  { day: 'Sat', market: 'Jan Powers Farmers Market', location: 'Powerhouse, New Farm', time: '6am – 12pm' },
  { day: 'Sat', market: 'West End Markets', location: 'Davies Park, West End', time: '6am – 2pm' },
  { day: 'Sun', market: 'Northey Street Organic Market', location: 'Windsor', time: '6am – 12pm' },
  { day: 'Sun', market: 'Manly Harbour Village Markets', location: 'Cambridge Parade, Manly', time: '8am – 1pm' },
]

export default function Markets() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        background: '#0f0c0a',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
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
          Find us
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#f5ede0',
          }}
        >
          Brisbane Market Pop-ups
        </h2>
      </motion.div>

      {/* Market list */}
      <div>
        {markets.map((m, i) => (
          <MarketRow key={i} item={m} index={i} />
        ))}
      </div>

      {/* Follow note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-dm)',
          fontWeight: 300,
          fontSize: '0.8rem',
          color: 'rgba(245,237,224,0.4)',
          marginTop: '2.5rem',
          letterSpacing: '0.04em',
        }}
      >
        Market schedule subject to change. Follow us on Instagram for the latest pop-up dates.
      </motion.p>
    </section>
  )
}

function MarketRow({ item, index }: { item: typeof markets[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '4rem 1fr auto',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.5rem 0',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
        cursor: 'default',
        transition: 'background 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,169,110,0.04)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Day badge */}
      <div
        style={{
          width: '3.5rem',
          height: '3.5rem',
          border: '1px solid rgba(201,169,110,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#c9a96e',
          }}
        >
          {item.day}
        </span>
      </div>

      {/* Name + location */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 500,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#f5ede0',
            marginBottom: '0.25rem',
          }}
        >
          {item.market}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.78rem',
            color: 'rgba(245,237,224,0.45)',
            letterSpacing: '0.04em',
          }}
        >
          {item.location}
        </p>
      </div>

      {/* Time */}
      <p
        style={{
          fontFamily: 'var(--font-dm)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: 'rgba(201,169,110,0.7)',
          whiteSpace: 'nowrap',
        }}
      >
        {item.time}
      </p>
    </motion.div>
  )
}
