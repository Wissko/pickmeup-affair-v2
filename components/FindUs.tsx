'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const markets = [
  {
    day: 'Sat',
    market: 'Cathedral Square Markets',
    location: '410 Ann Street, Brisbane',
    time: 'Follow for times',
    frequency: 'Regular',
  },
  {
    day: 'Sat',
    market: 'Brisbane Markets',
    location: '385 Sherwood Rd, Rocklea',
    time: 'Follow for times',
    frequency: 'Regular',
  },
  {
    day: 'Sun',
    market: 'Nundah Markets',
    location: 'Station St, Nundah',
    time: 'Follow for times',
    frequency: 'Regular',
  },
]

const events = [
  {
    date: 'Markets',
    title: 'Pop-ups at Brisbane\'s Best Markets',
    location: 'Various locations, Brisbane',
    note: 'Catch us regularly at Cathedral Square, Rocklea, and Nundah. Follow on Instagram for confirmed dates.',
  },
  {
    date: 'By request',
    title: 'Bespoke Event Creations',
    location: 'Your venue, Brisbane and surrounds',
    note: 'Corporate functions, private celebrations, weddings. A fully tailored experience brought to you.',
  },
  {
    date: 'Workshops',
    title: 'Intimate Making Workshops',
    location: 'Sauce Bistro, Ashgrove, Brisbane',
    note: 'Small-group sessions where you craft your own tiramisu from scratch. Enquire for upcoming dates.',
  },
]

export default function FindUs({ standalone = false }: { standalone?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const marketsRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const followRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)

  const marketsInView = useInView(marketsRef, { once: true, margin: '-80px' })
  const eventsInView = useInView(eventsRef, { once: true, margin: '-80px' })
  const followInView = useInView(followRef, { once: true, margin: '-80px' })
  const bookInView = useInView(bookRef, { once: true, margin: '-80px' })

  const topPad = standalone
    ? 'calc(clamp(5rem, 10vw, 9rem) + 80px)'
    : 'clamp(5rem, 10vw, 9rem)'

  return (
    <div style={{ background: '#0a0806', color: '#f5ede0' }}>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          padding: `${topPad} clamp(1.25rem, 5vw, 5rem) clamp(4rem, 8vw, 7rem)`,
          overflow: 'hidden',
        }}
      >
        {/* Decorative gold line */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          style={{
            display: 'block',
            width: 'clamp(40px, 6vw, 80px)',
            height: '1px',
            background: '#c9a96e',
            marginBottom: '2rem',
            transformOrigin: 'left',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.6rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: '1.25rem',
          }}
        >
          Our presence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#f5ede0',
            maxWidth: '800px',
            marginBottom: '2rem',
          }}
        >
          Where to Find Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.55 }}
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: 'rgba(245,237,224,0.55)',
            maxWidth: '520px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          We come to you. Catch us at farmers markets, curated pop-ups, and private gatherings
          across Brisbane and surrounds.
        </motion.p>
      </section>

      {/* ─── UPCOMING LOCATIONS ──────────────────────────────────── */}
      <section
        ref={marketsRef}
        style={{
          background: '#0f0c0a',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={marketsInView ? { opacity: 1, y: 0 } : {}}
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
            Regular spots
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
            Upcoming Locations
          </h2>
        </motion.div>

        <div>
          {markets.map((m, i) => (
            <MarketRow key={i} item={m} index={i} inView={marketsInView} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={marketsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 300,
            fontSize: '0.8rem',
            color: 'rgba(245,237,224,0.35)',
            marginTop: '2.5rem',
            letterSpacing: '0.04em',
          }}
        >
          Schedule subject to change. Follow us on Instagram for the latest confirmed dates.
        </motion.p>
      </section>

      {/* ─── EVENTS & POP-UPS ────────────────────────────────────── */}
      <section
        ref={eventsRef}
        style={{
          background: '#0a0806',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={eventsInView ? { opacity: 1, y: 0 } : {}}
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
            Coming up
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
            Events & Pop-ups
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(201,169,110,0.08)',
          }}
        >
          {events.map((ev, i) => (
            <EventCard key={i} item={ev} index={i} inView={eventsInView} />
          ))}
        </div>
      </section>

      {/* ─── FOLLOW FOR UPDATES ──────────────────────────────────── */}
      <section
        ref={followRef}
        style={{
          background: '#0f0c0a',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={followInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <span
            style={{
              display: 'block',
              width: '40px',
              height: '1px',
              background: '#c9a96e',
              margin: '0 auto 2rem',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              marginBottom: '1.25rem',
            }}
          >
            Stay in the loop
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#f5ede0',
              marginBottom: '1.5rem',
            }}
          >
            Follow for Updates
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(245,237,224,0.5)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Our schedule lives on Instagram. New markets, surprise drops, seasonal collections
            announced there first.
          </p>
          <motion.a
            href="https://instagram.com/pickmeup.affair"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={followInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-dm)',
              fontWeight: 400,
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#f5ede0',
              border: '1px solid rgba(201,169,110,0.4)',
              padding: '0.85rem 2.25rem',
              textDecoration: 'none',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,169,110,1)'
              e.currentTarget.style.color = '#c9a96e'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
              e.currentTarget.style.color = '#f5ede0'
            }}
          >
            @pickmeup.affair
          </motion.a>
        </motion.div>
      </section>

      {/* ─── BOOK A PRIVATE EVENT ────────────────────────────────── */}
      <section
        ref={bookRef}
        style={{
          background: '#0a0806',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5rem)',
          borderTop: '1px solid rgba(201,169,110,0.08)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={bookInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
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
                marginBottom: '1.25rem',
              }}
            >
              Private events
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#f5ede0',
                marginBottom: '1.5rem',
              }}
            >
              Book a Private Event
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontWeight: 300,
                fontSize: '0.9rem',
                color: 'rgba(245,237,224,0.5)',
                lineHeight: 1.75,
              }}
            >
              We bring the full Pick Me Up Affair experience to your celebration. Weddings,
              corporate functions, intimate gatherings. Enquire to discuss a bespoke setup tailored
              to your event.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-dm)',
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0a0806',
                background: '#c9a96e',
                padding: '1rem 2.25rem',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e8c98a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a96e')}
            >
              Enquire now
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: '0.72rem',
                color: 'rgba(245,237,224,0.3)',
                letterSpacing: '0.04em',
                textAlign: 'center',
              }}
            >
              We reply within 48 hours
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function MarketRow({
  item,
  index,
  inView,
}: {
  item: (typeof markets)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '4rem 1fr auto',
        alignItems: 'center',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
        padding: '1.5rem 0',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
        transition: 'background 0.3s ease',
        cursor: 'default',
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

      {/* Time + frequency */}
      <div style={{ textAlign: 'right' }}>
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
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: 'rgba(245,237,224,0.25)',
            whiteSpace: 'nowrap',
            marginTop: '0.2rem',
          }}
        >
          {item.frequency}
        </p>
      </div>
    </motion.div>
  )
}

function EventCard({
  item,
  index,
  inView,
}: {
  item: (typeof events)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.1 }}
      style={{
        background: '#0a0806',
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#0f0d0b')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '#0a0806')}
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
        {item.date}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 500,
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          color: '#f5ede0',
          marginBottom: '0.5rem',
          lineHeight: 1.1,
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-dm)',
          fontSize: '0.78rem',
          color: 'rgba(245,237,224,0.45)',
          letterSpacing: '0.04em',
          marginBottom: '1.25rem',
        }}
      >
        {item.location}
      </p>
      <span
        style={{
          display: 'block',
          width: '28px',
          height: '1px',
          background: 'rgba(201,169,110,0.4)',
          marginBottom: '1rem',
        }}
      />
      <p
        style={{
          fontFamily: 'var(--font-dm)',
          fontWeight: 300,
          fontSize: '0.78rem',
          color: 'rgba(245,237,224,0.35)',
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        }}
      >
        {item.note}
      </p>
    </motion.div>
  )
}
