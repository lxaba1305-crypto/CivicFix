import { useState } from 'react';
import ReportCard from '../components/ReportCard';
import { reports } from '../data/reports';

const CATEGORIES = ['All', ...new Set(reports.map(r => r.category))];
const STATUSES = ['All', 'pending', 'in progress', 'resolved'];

function ReportsPage({ role }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = reports.filter(r => {
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
    return matchStatus && matchCategory;
  })

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
      <div className='flex flex-col'>
        {role === "user" ? (
          <>
            <h1 className='text-2xl font-bold'>Recent community reports</h1>
            <span className='text-sm font-meduim text-stone-500'>See what your neighbors are reporting in real time.</span>
          </>
        ) : (
          <h1 className='text-2xl font-bold'>Reports</h1>
        )}
      </div>

      <hr className='border-0 border-t border-stone-200' />

      {/* FILTER */}
      <div className='flex items-center gap-3 flex-wrap'>
        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          className='text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition'
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>
              {s === 'All' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className='text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition'
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c === 'All' ? 'All categories' : c}
            </option>
          ))}
        </select>

        <span className='text-xs text-stone-400 ml-auto'>
          {filtered.length} report{filtered.length !== 1 ? 's' : ''}
        </span>
        {(statusFilter !== 'All' || categoryFilter !== 'All') && (
          <button
            onClick={() => { setStatusFilter('All'); setCategoryFilter('All'); }}
            className='text-xs text-red-500 hover:text-red-600 transition'
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filtered.map(report => (
          <ReportCard key={report.id} report={report} role={role} />
        ))}
      </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 text-stone-400 gap-2'>
          <p className='text-sm'>No reports match your filters.</p>
          <button
            onClick={() => { setStatusFilter('All'); setCategoryFilter('All'); }}
            className='text-xs text-green-600 hover:text-green-700 transition'
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;