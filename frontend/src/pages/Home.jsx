
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Target, Flame, Award, Mail, ArrowRight } from 'lucide-react'
import PebbyMascot from '../components/PebbyMascot'

const quotes = [
  { text: "Every small step builds your world.", author: "Pebby" },
  { text: "Consistency is the bridge between goals and accomplishment.", author: "Ancient Wisdom" },
  { text: "Your future self will thank you for starting today.", author: "Pebby's Journal" },
  { text: "Habits are the compound interest of self-improvement.", author: "World Builders" },
]

export default function Home(){ 
  const [email, setEmail] = useState('')
  const [currentQuote, setCurrentQuote] = useState(0)
  const pulseRef = useRef(null)

  useEffect(()=>{
    const t = setInterval(()=> setCurrentQuote(i=> (i+1)%quotes.length), 5000)
    return ()=> clearInterval(t)
  },[])

  const handleNewsletterSubmit = ()=>{
    if(email){
      if(pulseRef.current){ pulseRef.current.classList.add('pulse-anim'); setTimeout(()=> pulseRef.current.classList.remove('pulse-anim'), 1600) }
      setEmail('')
      alert('🎉 Welcome to Pebby World! (mock) Check your email.')
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-teal-50 to-orange-50 py-20 px-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <PebbyMascot size="lg" animate />
            <h1 className="text-5xl md:text-7xl font-bold mt-6 mb-4 bg-gradient-to-r from-orange-600 via-teal-600 to-orange-600 bg-clip-text text-transparent">Welcome to Pebby World</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">Build your dream life, one habit at a time. Join Pebby on an adventure to create lasting change!</p>
            <motion.button className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 mx-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Start Your Journey <ArrowRight size={20} /></motion.button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuote} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-teal-50">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">"{quotes[currentQuote].text}"</p>
              <p className="text-lg text-teal-600">— {quotes[currentQuote].author}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">{quotes.map((_,i)=>(<button key={i} onClick={()=> setCurrentQuote(i)} className={`w-3 h-3 rounded-full transition-all ${ i===currentQuote ? 'bg-orange-500 w-8' : 'bg-gray-300' }`} />))}</div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">Build Your World</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { icon: Target, title: 'Track Progress', desc: 'Monitor your habits with beautiful charts' }, { icon: Flame, title: 'Build Streaks', desc: 'Maintain consistency and watch your streaks grow' }, { icon: Award, title: 'Earn Rewards', desc: 'Unlock achievements as you progress' } ].map((feature,i)=>(
              <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.2 }} viewport={{ once:true }} className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white/50">
                <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500 to-teal-500 rounded-3xl p-12 text-white text-center shadow-2xl">
          <Mail className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Join the Pebby Community</h2>
          <p className="text-xl mb-8 opacity-90">Get weekly tips, motivation, and exclusive content from Pebby!</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50" />
            <motion.button onClick={handleNewsletterSubmit} className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Subscribe</motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
