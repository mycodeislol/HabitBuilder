
import React from 'react'
import { motion } from 'framer-motion'

export default function PebbyMascot({ size='md', animate=false }){
  const sizes = { sm: 'text-4xl', md: 'text-6xl', lg: 'text-8xl' }
  return (
    <motion.div className={sizes[size] + ' flex items-center justify-center'} animate={ animate ? { y: [0, -8, 0], rotate: [0, -4, 4, 0] } : {} } transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}>
      🐧
    </motion.div>
  )
}
