
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate('/')}>
          <div className="text-2xl">🐧</div>
          <div className="font-bold text-lg">HabitBuilder</div>
        </div>

        <div className="hidden md:flex gap-4">
          <button onClick={()=>navigate('/')} className="hover:underline">Home</button>
          <button onClick={()=>navigate('/dashboard')} className="hover:underline">Dashboard</button>
          <button onClick={()=>navigate('/login')} className="hover:underline">Login</button>
        </div>

        <div className="md:hidden">
          <button onClick={()=>setOpen(!open)} className="p-2">{ open ? <X/> : <Menu/> }</button>
        </div>
      </div>
      <div className="h-16" />
    </header>
  )
}
