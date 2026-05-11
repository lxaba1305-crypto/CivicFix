import { useState } from 'react';
import { GoTag } from 'react-icons/go';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';
import { BsPerson } from 'react-icons/bs';
import { supabase } from '../supabaseClient';

const STATUS_OPTIONS = [
  'pending',
  'in progress',
  'resolved',
];

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
      <div className='flex flex-col gap-4 w-full bg-white border border-green-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5'>

        {/* REPORTS */}
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-stone-500'>RPN-0{report.id}</p>

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
                {report.created_at
                  ? new Date(report.created_at).toISOString()
                  :"No date"}
              </p>
          </div>

          {/* Admin only actions */}
          {role === "admin" && (
            <div>
              <hr className='border-stone-300'/>

              {/* STATUS DROPDOWN */}
              <select 
                value={report.status} 
                onChange={(e) => updateStatus(e.target.value)}
                disabled={loading}
                className='text-xs border-stone-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400'
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>

              {/* DELETE */}
              <button
                onClick={deleteReport}
                disabled={loading}
                className='w-full text-xs font-medium px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition'
              >
                Delete Report
              </button>
            </div>
        )}
        </div>
      </div>
    
    </div>
  );
}

export default ReportCard
