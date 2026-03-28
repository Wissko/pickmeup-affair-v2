'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const enquiryTypes = ['Wedding', 'Corporate', 'Birthday / Gift', 'Workshop', 'Market info', 'Other']

export default function Contact({ standalone = false }: { standalone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        background: '#0a0806',
        padding: standalone
          ? 'calc(clamp(5rem, 10vw, 9rem) + 80px) clamp(1.25rem, 5vw, 5rem) clamp(5rem, 10vw, 9rem)'
          : 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background image — blurred */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
        <Image
          src="/images/coeur.jpg"
          alt=""
          fill
          unoptimized
          style={{ objectFit: 'cover', filter: 'blur(8px)', scale: '1.05' }}
          aria-hidden
        />
      </div>

      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
          maxWidth: '1100px',
        }}
      >
        {/* Left — context */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div>
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
              Get in touch
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#f5ede0',
              }}
            >
              Let us create something for you
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontWeight: 300,
              fontSize: 'clamp(0.88rem, 1.2vw, 0.95rem)',
              lineHeight: 1.85,
              color: 'rgba(245,237,224,0.58)',
              maxWidth: '360px',
            }}
          >
            Whether it is a wedding cake, a last-minute birthday gift, or a private workshop for your team, we would love to hear from you. All orders are made to order.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { label: 'Instagram', value: '@pickmeupaffair' },
              { label: 'Based in', value: 'Brisbane, Queensland' },
              { label: 'Markets', value: 'Every weekend across Brisbane' },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#7a6a58',
                    marginBottom: '0.3rem',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm)',
                    fontSize: '0.9rem',
                    color: 'rgba(245,237,224,0.75)',
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          {submitted ? (
            <div
              style={{
                padding: '3rem 2rem',
                border: '1px solid rgba(201,169,110,0.25)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 500,
                  fontSize: '1.8rem',
                  color: '#f5ede0',
                }}
              >
                Thank you
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: 'rgba(245,237,224,0.55)',
                  lineHeight: 1.7,
                }}
              >
                We have received your message and will be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Enquiry type */}
              <div>
                <label style={labelStyle}>Type of enquiry</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                  {enquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelected(type)}
                      style={{
                        fontFamily: 'var(--font-dm)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        padding: '0.45rem 0.9rem',
                        border: selected === type ? '1px solid #c9a96e' : '1px solid rgba(201,169,110,0.25)',
                        background: selected === type ? 'rgba(201,169,110,0.12)' : 'transparent',
                        color: selected === type ? '#c9a96e' : 'rgba(245,237,224,0.55)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField label="Name" type="text" placeholder="Your name" />
                <FormField label="Email" type="email" placeholder="your@email.com" />
              </div>
              <FormField label="Date (if applicable)" type="text" placeholder="Event or delivery date" />
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Tell us about your occasion..."
                  rows={4}
                  style={inputStyle}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: 'var(--font-dm)',
                  fontWeight: 400,
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#0a0806',
                  background: '#c9a96e',
                  border: 'none',
                  padding: '1rem 2rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8c98a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#c9a96e')}
              >
                Send enquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm)',
  fontSize: '0.6rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#7a6a58',
  display: 'block',
  marginBottom: '0.6rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(201,169,110,0.2)',
  color: '#f5ede0',
  fontFamily: 'var(--font-dm)',
  fontSize: '0.9rem',
  padding: '0.75rem 1rem',
  outline: 'none',
  resize: 'vertical' as const,
  transition: 'border-color 0.25s ease',
}

function FormField({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.6)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
      />
    </div>
  )
}
