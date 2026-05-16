import { useState, useEffect } from 'react';
import { GoTag } from 'react-icons/go';
import { CiLocationOn, CiCalendarDate } from 'react-icons/ci';
import { BsPerson, BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { supabase } from '../supabaseClient';
import { AuthSessionMissingError } from '@supabase/supabase-js';

const STATUS_OPTIONS = [
  'pending',
  'in progress',
  'resolved',
];

const statusStyles = {
  pending: { 
    badge: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',  
    select: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200' 
  },
  'in progress': { 
    badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',      
    select: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' 
  },
  resolved: { 
    badge: 'bg-green-50 text-green-700 ring-1 ring-green-200',     
    select: 'bg-green-50 text-green-700 ring-1 ring-green-200' 
  },
};

function ReportCard({ report, role, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(report.status);

  const [upvotes, setUpvotes] = useState(report.upvotes ?? 0);
  const [upvoting, setUpvoting] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteChecked, setUpvoteChecked] = useState(false);

  // LOAD IF USER ALREADY VOTED
  useEffect(() => {
    const checkIfUpvoted = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setUpvoteChecked(true);
        return;
      }

      const { data, error } = await supabase
        .from('report_upvotes')
        .select('id')
        .eq('report_id', report.id)
        .eq('user_id', storedUser.id)
        .maybeSingle();

      if (!error) setHasUpvoted(!!data);
      setUpvoteChecked();
    };

    checkIfUpvoted();
  }, [report.id]);

  // UPDATE STATUS
  const updateStatus = async (newStatus) => {
    setLoading(true);
    setCurrentStatus(newStatus)

    const { error } = await supabase
      .from("Reports")
      .update({ status: newStatus })
      .eq("id", report.id);

    if (error) {
      console.log("Status update error:", error.message);
      setCurrentStatus(report.status);
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
      setLoading(false);
    } else {
      onDelete?.();
    }

    setLoading(false);
  };

  // UPVOTE REPORT
  const handleUpvote = async () => {
  if (upvoting) return;

  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser) {
    alert('Please log in to vote.');
    return;
  }

  setUpvoting(true);

  // CHECK IF VOTE EXIST
  const { data: existingVote, error: checkError } = await supabase
    .from('report_upvotes')
    .select('id')
    .eq('report_id', report.id)
    .eq('user_id', storedUser.id)
    .maybeSingle();

  if (checkError) {
    console.log('Check error:', checkError.message);
    setUpvoting(false);
    return;
  }

  // IF ALREADY VOTED → UNDO VOTE
  if (existingVote) {
    const { error: deleteError } = await supabase
      .from('report_upvotes')
      .delete()
      .eq('id', existingVote.id);

    if (deleteError) {
      console.log('Undo vote error:', deleteError.message);
      setUpvoting(false);
      return;
    }

    const newCount = Math.max(upvotes - 1, 0);

    await supabase
      .from('Reports')
      .update({ upvotes: newCount })
      .eq('id', report.id);

    setHasUpvoted(false);
    setUpvotes(newCount);
    onUpdate?.();
    setUpvoting(false);
    return;
  }

  // INSERT VOTE
  const { error: insertError } = await supabase
    .from('report_upvotes')
    .insert({
      report_id: report.id,
      user_id: storedUser.id,
    });

  if (insertError) {
    console.log('Upvote error:', insertError.message);
    setUpvoting(false);
    return;
  }

  const newCount = upvotes + 1;
 
    await supabase
      .from('Reports')
      .update({ upvotes: newCount })
      .eq('id', report.id);

  setHasUpvoted(true);
  setUpvotes(newCount);

  onUpdate?.();
  setUpvoting(false);
};

  const style = statusStyles[currentStatus] || statusStyles.pending;

  return (
    <div> 
      <div className='flex flex-col gap-4 w-full bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-5 sm:p-5 gap-3'>

        {/* REPORTS */}
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-xs font-mono text-stone-400'>RPN-0{String(report.id).padStart(3, '0')}</p>

            <span className={`text-xs rounded-full font-meduim px-2 py-1 shrink-0
              ${style.badge}`}>
              {currentStatus}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className='text-sm text-stone-700 leading-relaxed my-4 break-words line-clamp-3'>
            {report.description}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-stone-500 mb-4'>
              <p className='flex items-center gap-2 truncate'>
                <GoTag className='shrink-0 text-stone-400' />
                {report.category || '-'}
              </p>
              <p className='flex items-center gap-2 truncate'>
                <CiLocationOn className='shrink-0 text-stone-400' />
                {report.location || '-'}
              </p>
              <p className='flex items-center gap-2 truncate'>
                <BsPerson className='shrink-0 text-stone-400' />
                {report.full_name || '-'}
              </p>
              <p className='flex items-center gap-2'>
                <CiCalendarDate className='shrink-0 text-stone-400' />
                {report.created_at
                  ? new Date(report.created_at).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: 'numeric',
                  })
                : "No date"}
              </p>
          </div>

          {/* UPVOTE BUTTON */}
          <div className='pt-3 border-t border-stone-100'>
            <button
              onClick={handleUpvote}
              disabled={upvoting}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                hasUpvoted
                  ? 'text-green-600'
                  : 'text-stone-600 hover:text-green-600'
              }`}
            >
              {hasUpvoted ? (
                <BsHandThumbsUpFill className='text-green-600 w-5 h-5' />
              ) : (
                <BsHandThumbsUp className='text-stone-400 w-5 h-5' />
              )}

              <span>{upvotes}</span>
              <span>{upvotes === 1 ? 'Upvote' : 'Upvotes'}</span>
            </button>

          </div>

          {/* Admin only actions */}
          {role === "admin" && (
          <div>
              <hr className='border-stone-300'/>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4'> 

              {/* STATUS DROPDOWN */}
              <div className='relative flex-1'>
                <select 
                  value={report.status} 
                  onChange={(e) => updateStatus(e.target.value)}
                  disabled={loading}
                  className={`
                  w-full appearance-none text-xs font-medium rounded-lg px-3 py-2 pr-8 cursor-pointer transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed
                  ${style.select}
                `}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>

              {/* Custom chevron */}
              <svg
                className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-current opacity-60'
                viewBox='0 0 12 12' 
                fill='none' 
                stroke='currentColor' 
                strokeWidth='1.5'
              >
                <path d='M2 4l4 4 4-4' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              </div>

                {/* DELETE */}
                <button
                  onClick={deleteReport}
                  disabled={loading}
                  className='flex-1 sm:flex-none text-xs font-medium px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
                >
                  {loading ? 'Deleting...' : 'Delete report'}
                </button>

            </div>
          </div>
        )}
        </div>
      </div>
    
    </div>
  );
}

export default ReportCard
