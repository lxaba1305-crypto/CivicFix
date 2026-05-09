import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ReportCard from '../components/ReportCard';
import ReportChart from '../components/ReportChart';
import ReportForm from '../components/ReportForm';
import StatsCard from '../components/StatsCard';
import BackButton from '../buttons/BackButton';
import { Link } from 'react-router-dom';

function getInitials(name = '') {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = [
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
];

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  // =========================
  // FETCH REPORTS
  // =========================
  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('Reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Reports error:', error.message);
      return;
    }

    const safeData = data || [];
    setReports(safeData);
    buildUsersFromReports(safeData);
  };

  // =========================
  // CREATE REPORT (ADMIN)
  // =========================
  const addReport = async (newReport) => {
    const { error } = await supabase
      .from('Reports')
      .insert([newReport]);

    if (error) {
      console.log('Insert error:', error.message);
      return;
    }

    fetchReports();
    setShowForm(false);
  };

  // =========================
  // BUILD USERS FROM REPORTS
  // =========================
  const buildUsersFromReports = (reportsData) => {
    const grouped = {};

    reportsData.forEach((report) => {
      const key = report.email;
      if (!key) return;

      if (!grouped[key]) {
        grouped[key] = {
          name: report.full_name || 'Unknown',
          email: report.email,
          role: 'user',
          reportsCount: 0,
        };
      }

      grouped[key].reportsCount += 1;
    });

    setUsers(Object.values(grouped));
  };

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>

      <BackButton />

      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium text-stone-800'>Admin Overview</h1>
          <p className='text-xs text-stone-400 mt-1'>Welcome back, Admin</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className='text-xs bg-green-600 text-white px-3 py-1 rounded-lg'
        >
          + New Report
        </button>
      </div>

      <hr className='border-0 border-t border-stone-200' />

      {/* FORM */}
      {showForm && (
        <ReportForm
          onSubmit={addReport}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* STATS */}
      <StatsCard reports={reports} />

      {/* CHARTS */}
      <ReportChart reports={reports} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* REPORTS */}
        <div className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
          <div className='px-4 py-3 border-b border-stone-100'>
            <h2 className='text-sm font-medium'>Recent Reports</h2>
          </div>

          <div className='divide-y divide-stone-100'>
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className='flex justify-between px-4 py-3'>
                <div>
                  <p className='text-sm font-medium'>{report.title}</p>
                  <p className='text-xs text-stone-400'>
                    {report.category} · {report.location}
                  </p>
                </div>

                <span className='text-xs px-2 py-1 rounded bg-stone-100'>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* USERS */}
        <div className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
          <div className='px-4 py-3 border-b border-stone-100'>
            <h2 className='text-sm font-medium'>Users</h2>
          </div>

          <div className='divide-y divide-stone-100'>
            {users.slice(0, 5).map((user, i) => (
              <div key={user.email} className='flex justify-between px-4 py-3'>

                <div className='flex items-center gap-3'>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${avatarColors[i % avatarColors.length]}`}>
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <p className='text-sm font-medium'>{user.name}</p>
                    <p className='text-xs text-stone-400'>{user.email}</p>
                  </div>
                </div>

                <span className='text-xs text-stone-500'>
                  {user.reportsCount} reports
                </span>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;