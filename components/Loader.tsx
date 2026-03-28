'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0a0806',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Gold line top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              width: '60px',
              height: '1px',
              background: '#c9a96e',
              transformOrigin: 'left',
            }}
          />

          {/* Brand name */}
          <div style={{ textAlign: 'center', overflow: 'hidden' }}>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#f5ede0',
              }}
            >
              Pick Me Up
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                fontWeight: 400,
                letterSpacing: '0.28em',
                color: '#c9a96e',
                textTransform: 'uppercase',
                marginTop: '0.25rem',
              }}
            >
              Affair
            </motion.p>
          </div>

          {/* Gold line bottom — expanding progress */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'linear', delay: 0.6 }}
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, #c9a96e, #e8c98a)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
