import React from 'react'

function ReportChart() {
  return (
    <div>
       <div className='flex gap-4'>
      {/* Reports this week - line graph */}
        <div className='border border-gray-300'>
          <h1>Reports this week</h1>
        </div>

      {/* Status overview - circle chart */}
        <div className='border border-gray-300'>
          <h1>Status overview</h1>
        </div>
      </div>
    </div>
  )
}

export default ReportChart
