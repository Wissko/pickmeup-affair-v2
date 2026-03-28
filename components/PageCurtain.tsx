'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNav } from '@/app/providers'

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number]

export default function PageCurtain() {
  const { curtainPhase, curtainLabel } = useNav()

  const visible = curtainPhase !== 'idle'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={
            curtainPhase === 'in'
              ? { clipPath: 'inset(0 0% 0 0)' }
              : { clipPath: 'inset(0 0% 0 100%)' }
          }
          transition={{ duration: 0.55, ease }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: '#0a0806',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all',
          }}
        >
          {/* Gold vertical line — left */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '7vw',
              top: 0,
              bottom: 0,
              width: '1px',
              background:
                'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5) 30%, rgba(201,169,110,0.5) 70%, transparent)',
            }}
          />

          {/* Page name */}
          {curtainLabel && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                letterSpacing: '-0.01em',
                color: 'rgba(245,237,224,0.12)',
                userSelect: 'none',
              }}
            >
              {curtainLabel}
            </motion.p>
          )}

          {/* Gold line — horizontal thin */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={curtainPhase === 'in' ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease, delay: 0.15 }}
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '12vh',
              left: '7vw',
              width: '60px',
              height: '1px',
              background: '#c9a96e',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
