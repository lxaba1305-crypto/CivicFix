import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import ReportCard from '../components/ReportCard';
import BackButton from '../buttons/BackButton';

const STATUSES = ['All', 'Pending', 'In Progress', 'Resolved'];

function ReportsPage({ role }) {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  //FETCH REPORTS
  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('Reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setReports(data || []);
    setLoading(false);
  };

  //UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('Reports')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    // REFRESH REPORTS
    fetchReports();
  };

  // DELETE REPORT
  const deleteReport = async (id) => {
    const { error } = await supabase
      .from('Reports')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    fetchReports();
  };

  // CATEGIRY FILTERS
  const CATEGORIES = [
    'All',
    ...new Set(
      (reports ?? [])
      .map(r => r.category)
      .filter(Boolean)
    )
  ];

  // FILTER REPORTS
  const filtered = reports.filter(r => {
    const matchStatus =
      statusFilter === 'All' ||
      r.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchCategory =
      categoryFilter === 'All' || 
      r.category === categoryFilter;

    return matchStatus && matchCategory;
  });

  if (loading) {
    return (
      <div className="p-6 text-sm text-stone-500">
        Loading reports...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
      <BackButton />

      {/* HEADER */}
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
              {s === 'All' 
                ? 'All statuses' 
                : s.charAt(0).toUpperCase() + s.slice(1)}
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

      {/* REPORTS */}
      {filtered.length > 0 ? (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filtered.map(report => (
          <ReportCard 
            key={report.id} 
            report={report} 
            role={role} 
            onUpdate={() => fetchReports()}
            onDelete={() => fetchReports()}
          />
        ))}
      </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 text-stone-400 gap-2'>
          <p className='text-sm'>No reports match your filters.</p>
          <button
            onClick={() => {
              setStatusFilter('All'); 
              setCategoryFilter('All'); 
            }}
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