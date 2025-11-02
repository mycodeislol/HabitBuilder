
import React from 'react'

export default function LineChart({ data }){
  const maxValue = Math.max(...data.map(d => d.completed))
  const chartHeight = 200
  const chartWidth = 100
  const points = data.map((d,i)=>{
    const x = (i/(data.length-1))*chartWidth
    const y = chartHeight - (d.completed/maxValue)*chartHeight
    return { x, y, value: d.completed }
  })
  const pathD = points.map((p,i)=> `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`
  return (
    <div className="w-full h-64"><svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full"><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/><stop offset="100%" stopColor="#f97316" stopOpacity="0.05"/></linearGradient></defs><path d={areaD} fill="url(#g)"/><path d={pathD} stroke="#f97316" strokeWidth="2" fill="none"/>{points.map((p,i)=>(<g key={i}><circle cx={p.x} cy={p.y} r="3" fill="#f97316"/><text x={p.x} y={chartHeight+15} textAnchor="middle" fontSize="10" fill="#666">{data[i].date}</text></g>))}</svg></div>
  )
}
