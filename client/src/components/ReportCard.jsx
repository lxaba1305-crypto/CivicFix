import { useState } from 'react';
import { GoTag } from 'react-icons/go';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import { supabase } from '../supabaseClient';

function ReportCard({ report, role, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);

  // UPDATE STATUS
  const updateStatus = async (newStatus) => {
    setLoading(true);

    const { error } = await supabase
      .from("Reports")
      .update({ status: newStatus })
      .eq("id", report.id);

    if (error) {
      console.log("Status update error:", error.message);
    } else {
      onUpdate?.();
    }

    setLoading(false);
  };

  // DELETE REPORT
  const deleteReport = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("Reports")
      .delete()
      .eq("id", report.id);

    if (error) {
      console.log("Delete error:", error.message);
    } else {
      onDelete?.();
    }

    setLoading(false);
  };

  return (
    <div> 
      <div className='flex flex-col gap-4 w-full bg-white border border-gray-300 rounded-xl p-5'>

        {/* REPORTS */}
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-stone-500'>RPN - 0{report.id}</p>

            <span className={`text-xs rounded-full font-meduim p-2 shrink-0
              ${report.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : ''}
              ${report.status === 'in progress' ? 'bg-blue-50 text-blue-700' : ''}
              ${report.status === 'resolved' ? 'bg-green-50 text-green-700' : ''}
              `}>
              {report.status}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className='text-xs text-stone-500 my-4 wrap-break-words'>
            {report.description}
          </div>

          <div className='grid grid-cols-2 gap-y-1 text-xs text-stone-500 mb-2'>
              <p className='flex items-center gap-2'><GoTag />{report.category}</p>
              <p className='flex items-center gap-2 text-right'><CiLocationOn />{report.location}</p>
              <p className='flex items-center gap-2 truncate'><BsPerson />{report.full_name}</p>
              <p className='flex items-center gap-2 text-right'>
                <CiCalendarDate />
                {new Date(report.created_at)
                  .toISOString()
                  .split('T')[0]}
              </p>
          </div>

          {/* Admin only actions */}
          {role === "admin" && (
            <div>
              <hr className='border-stone-300'/>

              <div className='flex gap-4 mt-3 flex-wrap'>
                {/* IN PROGESS */}
                <button
                  onClick={() =>
                    updateStatus('in progress')
                  } 
                  className='flex-1 text-xs font-medium bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 rounded-lg px-4 py-2 transition'>
                  Mark as In Progress
                </button>

                {/* RESOLVED */}
                <button
                  onClick={() => updateStatus('resolved')} 
                  className='text-xs font-medium px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition'>
                  Resolved Report
                </button>

                {/* Pending */}
                <button
                  onClick={() => updateStatus('pending')} 
                  className='text-xs font-medium px-4 py-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded-lg transition'>
                  Pending Report
                </button>

                {/* DELETE */}
                <button
                  onClick={deleteReport}
                  className='w-full text-xs font-medium px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition'
                >
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
