
import React, { useEffect } from 'react'
import { XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Toast({ message, onClose }){
  useEffect(()=>{ const t = setTimeout(onClose, 3000); return ()=> clearTimeout(t) }, [onClose])
  return (
    <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3">
      <span className="text-2xl">🐧</span>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2"><XCircle size={20} /></button>
    </motion.div>
  )
}
