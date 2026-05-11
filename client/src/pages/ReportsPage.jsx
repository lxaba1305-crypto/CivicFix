import { useState, useEffect } from 'react';
import ReportCard from '../components/ReportCard';
import BackButton from '../buttons/BackButton';

const STATUSES = ['All', 'pending', 'in progress', 'resolved'];

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;  // always fresh from storage

  useEffect(() => {
    fetchReports();
  }, []);

  // FETCH REPORTS FROM BACKEND API
  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports');
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('Invalid reports data:', data);
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  // DELETE REPORT
  const deleteReport = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/reports/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  // CATEGORY FILTERS
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
      <div className="p-6 text-sm text-green-700">
        Loading reports...
      </div>
    );
  }

  console.log("REPORTS PAGE ROLE:", role);

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50'>
      <BackButton />

      {/* HEADER */}
      <div className='flex flex-col'>
        {role === "user" ? (
          <>
            <h1 className='text-2xl font-extrabold text-green-900'>Recent community reports</h1>
            <span className='text-sm text-green-700 mt-1'>See what your neighbors are reporting in real time.</span>
          </>
        ) : (
          <h1 className='text-2xl font-bold text-green-900'>Reports</h1>
        )}
      </div>

      <hr className='border-0 border-t border-stone-200' />

      {/* FILTER */}
      <div className='flex items-center gap-3 flex-wrap'>
        <select 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          className='text-sm border border-green-200 rounded-xl px-4 py-2 bg-white shadow-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition'
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
          className='text-sm border border-green-200 rounded-xl px-4 py-2 bg-white shadow-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition'
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c === 'All' ? 'All categories' : c}
            </option>
          ))}
        </select>

        <span className='text-xs text-green-700 ml-auto'>
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