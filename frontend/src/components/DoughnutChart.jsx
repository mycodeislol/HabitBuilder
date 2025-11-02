
import React from 'react'
import { motion } from 'framer-motion'

export default function DoughnutChart({ completed, total }){
  const percentage = (completed/total)*100
  const circumference = 2*Math.PI*70
  const strokeDashoffset = circumference - (percentage/100)*circumference
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="96" cy="96" r="70" stroke="#e5e7eb" strokeWidth="20" fill="none" />
        <motion.circle cx="96" cy="96" r="70" stroke="url(#dg)" strokeWidth="20" fill="none" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset }} transition={{ duration: 1, ease: 'easeOut' }} strokeLinecap="round" />
        <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#14b8a6"/></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">{completed}/{total}</span><span className="text-sm text-gray-600">Completed</span></div>
    </div>
  )
}
