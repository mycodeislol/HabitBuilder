
import React, { useState } from 'react'
import PebbyMascot from '../components/PebbyMascot'
import LineChart from '../components/LineChart'
import DoughnutChart from '../components/DoughnutChart'
import Confetti from '../components/Confetti'
import { Flame, TrendingUp, Target, Calendar, CheckCircle2, Circle } from 'lucide-react'

const mockHabits = [
  { id: 1, name: 'Morning Meditation', category: 'Wellness', streak: 12, color: '#14b8a6' },
  { id: 2, name: 'Read 30 Minutes', category: 'Learning', streak: 8, color: '#f97316' },
  { id: 3, name: 'Exercise', category: 'Fitness', streak: 15, color: '#06b6d4' },
  { id: 4, name: 'Write Journal', category: 'Creativity', streak: 5, color: '#8b5cf6' },
  { id: 5, name: 'Drink Water (8 cups)', category: 'Health', streak: 20, color: '#3b82f6' },
  { id: 6, name: 'No Social Media', category: 'Mindfulness', streak: 3, color: '#ec4899' },
]

const completionData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (6 - i))
  return { date: date.toLocaleDateString('en-US', { weekday: 'short' }), completed: Math.floor(Math.random()*6)+1 }
})

export default function Dashboard(){
  const [habits] = useState(mockHabits)
  const [activeTab, setActiveTab] = useState('overview')
  const [showConfetti, setShowConfetti] = useState(false)
  const [completedToday, setCompletedToday] = useState({})

  const toggleHabit = (id)=>{
    const newState = !completedToday[id]
    setCompletedToday({...completedToday, [id]: newState })
    if(newState){ setShowConfetti(true); setTimeout(()=> setShowConfetti(false), 1600); alert('🎉 Habit completed! (mock)') }
  }

  const totalStreak = habits.reduce((s,h)=> s+h.streak, 0)
  const completedCount = Object.values(completedToday).filter(Boolean).length
  const completionRate = Math.round((completedCount / habits.length)*100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-teal-50 to-orange-50 py-8 px-4">
      <Confetti show={showConfetti} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">Your Habit Dashboard</h1>
              <p className="text-gray-600 mt-2">Track your progress and build your world!</p>
            </div>
            <PebbyMascot size="md" animate />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[ { label: 'Total Streak', value: `${totalStreak} days`, icon: Flame, color: 'from-orange-500 to-red-500' }, { label: 'Completion Rate', value: `${completionRate}%`, icon: TrendingUp, color: 'from-teal-500 to-cyan-500' }, { label: 'Active Habits', value: habits.length, icon: Target, color: 'from-purple-500 to-pink-500' } ].map((stat,i)=>(
            <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}><stat.icon className="text-white" size={24} /></div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['overview','habits','analytics'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-6 py-3 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${ activeTab===tab ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-white' }`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="text-orange-500" /> Weekly Progress</h3>
              <LineChart data={completionData} />
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-teal-500" /> Today's Completion</h3>
              <DoughnutChart completed={completedCount} total={habits.length} />
            </div>
          </div>
        )}

        {activeTab === 'habits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit,i)=>(
              <div key={habit.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div><h4 className="font-bold text-lg text-gray-800">{habit.name}</h4><p className="text-sm text-gray-600">{habit.category}</p></div>
                  <button onClick={()=>toggleHabit(habit.id)} className={`p-2 rounded-full transition-all ${ completedToday[habit.id] ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white' : 'bg-gray-200 text-gray-400' }`}>{ completedToday[habit.id] ? <CheckCircle2 size={24} /> : <Circle size={24} /> }</button>
                </div>
                <div className="flex items-center gap-2 text-orange-500"><Flame size={20} /><span className="font-semibold">{habit.streak} day streak</span></div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${habit.color}, ${habit.color}dd)`, width: `${(habit.streak/30)*100}%` }} /></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-teal-500" /> Detailed Analytics</h3>
            <div className="space-y-6">
              {habits.map((habit,i)=>(
                <div key={habit.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2"><span className="font-semibold text-gray-800">{habit.name}</span><span className="text-sm text-gray-600">{habit.streak} days</span></div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ backgroundColor: habit.color, width: `${(habit.streak/30)*100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
