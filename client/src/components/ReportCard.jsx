import React from 'react';

function ReportCard({ report }) {
  return (
    <div className=''> 

      <div className='flex flex-col gap-4 w-full bg-white border border-gray-300 rounded-xl p-6'>

        {/* REPORTS */}
        <div>
          <div className='flex items-center justify-between my-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs'>{report.id}</p>
              <h1 className='text-sm'>{report.title}</h1>
            </div>

            <span className={`text-xs rounded-full font-meduim p-2
              ${report.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : ''}
              ${report.status === 'in progress' ? 'bg-blue-50 text-blue-700' : ''}
              ${report.status === 'resolved' ? 'bg-green-50 text-green-700' : ''}
              `}>
              {report.status}
            </span>
          </div>

          <div className='text-sm'>
            {report.description}
          </div>

          <div className='flex gap-6 py-3 mt-1'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-medium'>{report.category}</p>
              <p className='text-xs font-medium'>{report.location}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-medium'>{report.author}</p>
              <p className='text-xs font-medium'>{report.date}</p>
            </div> 
          </div>

          <hr className='border-stone-100'/>

          <div className='flex gap-4 mt-3'>
            <button className='text-xs font-medium bg-green-50 text-green-700 border-green-200 hover:bg-green-100 rounded-lg px-4 py-2'>
              Mark as In Progress
            </button>
            <button className='text-xs font-medium px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg '>
              Delete Report
            </button>
          </div>
          
        </div>
      </div>
    
    </div>
  )
}

export default ReportCard
