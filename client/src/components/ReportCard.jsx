import { GoTag } from "react-icons/go";
import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";

function ReportCard({ report, role }) {
  return (
    <div> 
      <div className='flex flex-col gap-4 w-full bg-white border border-gray-300 rounded-xl p-5'>

        {/* REPORTS */}
        <div>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-stone-500'>{report.id}</p>
              <h1 className='text-sm font-medium text-stone-800 wrap-break-word'>{report.title}</h1>
            </div>

            <span className={`text-xs rounded-full font-meduim p-2 shrink-0
              ${report.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : ''}
              ${report.status === 'in progress' ? 'bg-blue-50 text-blue-700' : ''}
              ${report.status === 'resolved' ? 'bg-green-50 text-green-700' : ''}
              `}>
              {report.status}
            </span>
          </div>

          <div className='text-xs text-stone-500 my-4 wrap-break-words'>
            {report.description}
          </div>

          <div className='grid grid-cols-2 gap-y-1 text-xs text-stone-500 mb-2'>
              <p className='flex items-center gap-2'><GoTag />{report.category}</p>
              <p className='flex items-center gap-2 text-right'><CiLocationOn />{report.location}</p>
              <p className='flex items-center gap-2 truncate'><BsPerson />{report.author}</p>
              <p className='flex items-center gap-2 text-right'><CiCalendarDate />{report.date}</p>
          </div>

          {/* Admin only actions */}
          {role === "admin" && (
            <div>
              <hr className='border-stone-300'/>
              <div className='flex gap-4 mt-3 flex-wrap'>
                <button className='flex-1 text-xs font-medium bg-green-50 text-green-700    border-green-200 hover:bg-green-100 rounded-lg px-4 py-2 transition'>
                  Mark as In Progress
                </button>
                <button className='text-xs font-medium px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition'>
                  Delete Report
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    
    </div>
  )
}

export default ReportCard
