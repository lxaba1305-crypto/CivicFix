import React from 'react'
import ReportCard from '../components/ReportCard';
import ReportChart from '../components/ReportChart';
import StatsCard from '../components/StatsCard';
import { reports } from '../data/reports';

function AdminDashboard() {
  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>

      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-stone-800'>Overview</h1>
        <p className='text-xs text-green-700 border-green-50 bg-green-200 rounded-full px-3 py-1'>April 2026</p> 
      </div>

      <hr className='border-0 border-t border-stone-200 '/>

      {/* STATS */}
      <StatsCard />

      {/* CHARTS */}
      <ReportChart />

      {/* REPORTS GRID */}
      <div className='grid grid-cols-3 gap-4 p-6'>
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard;
