import React from 'react'
import ReportCard from '../components/ReportCard';
import StatsCard from '../components/StatsCard';
import { reports } from '../data/reports';


function AdminDasboard() {
  return (
    <div className='m-6'>
      <div className='flex justify-between'>
        <h1>Overview</h1>
        <p className='text-green-400 border-green-400 bg-green-200 rounded-full p-2 text-xs'>April 2026</p> 

        <hr />

      </div>
      <StatsCard />

      <div className='grid grid-cols-3 gap-4 p-6'>
{       reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      
    </div>
  )
}

export default AdminDasboard
