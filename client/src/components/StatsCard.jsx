import React from 'react'
import { reports } from '../data/reports'

function StatsCard() {
  const stats = [
    {
      label: "Total Reports",
      value: reports.length,
    },
    {
      label: "Pending Reports",
      value: reports.filter(r => r.status === "pending").length,
    },
    {
      label: "In Progress Reports",
      value: reports.filter(r => r.status === "in progress").length,
    },
    {
      label: "Resolved Reports",
      value: reports.filter(r => r.status === "resolved").length,
    },
  ]

  return (
    <div>
      <div className='flex gap-4'>
        {stats.map((stat) => (
        <div key={stat.label} className='border border-stone-200 p-2 rounded-xl'>
          <h1>{stat.label}</h1>
          <p>{stat.value}</p>
        </div>
        ))}
        
      </div>
    </div>
  )
}

export default StatsCard
