
import React from 'react'
import { motion } from 'framer-motion'

export default function Confetti({ show }){
  if(!show) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(40)].map((_, i) => (
        <motion.div key={i} className="absolute w-3 h-3 rounded-full" style={{ left: Math.random()*100 + '%', top: '-10px', background: ['#f97316','#14b8a6','#06b6d4','#8b5cf6'][i%4] }} animate={{ y: [0, window.innerHeight + 100], opacity: [1,0], rotate: [0,360] }} transition={{ duration: 1.6 + Math.random(), delay: Math.random()*0.6, ease: 'easeOut' }} />
      ))}
    </div>
  )
}
