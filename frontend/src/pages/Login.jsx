import API from "../api"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e)=>{
    e.preventDefault()
    if(email && password){ alert('Logged in (mock)'); navigate('/dashboard') }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full card p-8">
        <h2 className="text-2xl font-bold mb-4" style={{color:'var(--teal)'}}>Sign in</h2>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded" required />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="p-3 border rounded" required />
          <button className="px-4 py-2 rounded text-white" style={{background:'var(--coral)'}}>Sign in</button>
        </form>
      </div>
    </main>
  )
}
