'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const experiences = [
  {
    id: '01',
    title: 'Classic Tiramisu',
    subtitle: 'The original, perfected',
    desc: 'Espresso-soaked savoiardi, mascarpone cream that holds its shape, a cocoa veil applied fresh. This is the one that started everything.',
    image: '/images/spoon.jpg',
    position: 'center 50%',
  },
  {
    id: '02',
    title: 'Cherry Verrine',
    subtitle: 'Seasonal signatures',
    desc: 'Dark cherry, amarena, kirsch. Layered in a cocktail glass at our market pop-ups. Disappears within the hour.',
    image: '/images/hero.jpg',
    position: 'center 40%',
  },
  {
    id: '03',
    title: 'Thai Tea Creation',
    subtitle: 'The unexpected',
    desc: 'Bright, warming, unlike anything you expect from tiramisu. Thai tea mascarpone against a crispy biscuit base. Bold and unapologetic.',
    image: '/images/can.jpg',
    position: 'center 50%',
  },
]

function ExperienceCard({ item, index }: { item: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease, delay: index * 0.15 }}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        minHeight: '70vh',
        overflow: 'hidden',
      }}
    >
      {/* Image block */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          order: index % 2 === 0 ? 0 : 1,
          aspectRatio: '4/5',
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          style={{
            objectFit: 'cover',
            objectPosition: item.position,
            transition: 'transform 0.6s ease',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: index % 2 === 0
              ? 'linear-gradient(to right, transparent 70%, rgba(10,8,6,1) 100%)'
              : 'linear-gradient(to left, transparent 70%, rgba(10,8,6,1) 100%)',
          }}
        />
      </div>

      {/* Text block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 6vw, 5rem)',
          background: '#0a0806',
          order: index % 2 === 0 ? 1 : 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.12)',
            lineHeight: 1,
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
          }}
        >
          {item.id}
        </span>

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
          {item.subtitle}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.1,
            color: '#f5ede0',
            marginBottom: '1.5rem',
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
            lineHeight: 1.8,
            color: 'rgba(245,237,224,0.6)',
            maxWidth: '340px',
          }}
        >
          {item.desc}
        </p>

        <div
          style={{
            width: '40px',
            height: '1px',
            background: '#c9a96e',
            marginTop: '2rem',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Experiences({ standalone = false }: { standalone?: boolean }) {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="experiences"
      style={{
        background: '#0a0806',
        paddingTop: standalone
          ? 'calc(clamp(5rem, 10vw, 8rem) + 80px)'
          : 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      {/* Header */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          padding: '0 clamp(1.25rem, 5vw, 5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '0.6rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#c9a96e',
          }}
        >
          The menu
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#f5ede0',
          }}
        >
          Experiences
        </h2>
      </motion.div>

      {/* Experience cards stacked */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experiences.map((item, i) => (
          <ExperienceCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
