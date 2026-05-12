import { useState, useEffect } from 'react';
import ReportChart from '../components/ReportChart';
import ReportForm from '../components/ReportForm';
import StatsCard from '../components/StatsCard';
import BackButton from '../buttons/BackButton';


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

const statusStyles = {
  pending: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  'in progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  resolved: 'bg-green-50 text-green-700 ring-1 ring-green-200',
};

function AdminDashboard({ searchQuery = '' }) {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  // =========================
  // FETCH REPORTS FROM BACKEND
  // =========================
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports');
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setReports(data);
        buildUsersFromReports(data);
      } else {
        console.error('Invalid reports data:', data);
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    }
  };

  // =========================
  // CREATE REPORT (ADMIN)
  // =========================
  const addReport = async (newReport) => {
    try {
      const response = await fetch('http://localhost:5000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReport)
      });

      if (!response.ok) {
        console.error('Failed to create report');
        return;
      }

      fetchReports();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  // SEARCH FILTER
  const q = searchQuery.toLowerCase().trim();
  console.log("q:", q, "reports:", reports.length);
 
  const filteredReports = q
    ? reports.filter(r =>
        [r.description, r.category, r.location, r.full_name]
          .some(field => field?.toLowerCase().includes(q))
      )
    : reports;
 
  const filteredUsers = q
    ? users.filter(u =>
        [u.name, u.email]
          .some(field => field?.toLowerCase().includes(q))
      )
    : users;

    
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8'>

      <BackButton />

      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium text-green-800'>Admin Overview</h1>
          <p className='text-xs text-stone-400 mt-1'>Welcome back, Admin</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className='text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-4 rounded-lg transition'
        >
          + New Report
        </button>
      </div>

      <hr className='border-0 border-t border-stone-200' />

      {/* SEARCH RESULT LABEL */}
      {q && (
        <p className='text-xs text-green-700'>
          Results for <span className='font-medium'>"{searchQuery}"</span>
          {' '}— {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''},{' '}
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        </p>
      )}

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
      <ReportChart />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* RECENT REPORTS */}
        <div className='bg-white/90 backdrop-blur border border-green-100 shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 py-3 border-b border-green-100 border-stone-100'>
            <h2 className='text-sm font-medium'>{q ? 'Matching Reports' : 'Recent Reports'}</h2>
            <span className='text-xs text-green-700'>{filteredReports.length}</span>
          </div>

          <div className='divide-y divide-stone-100'>
            {filteredReports.slice(0, 5).map((report) => (
              <div key={report.id} className='flex items-center justify-between px-4 py-3 hover:bg-green-50 transition'>
                <div className='min-w-0 mr-3'>
                  <p className='text-sm font-medium text-stone-800 truncate'>
                    {report.title || report.category}
                  </p>
                  <p className='text-xs text-stone-400 truncate'>
                    {report.category} · {report.location}
                  </p>
                </div>

                <span className={`text-xs font-medium rounded-full px-2.5 py-1 shrink-0 ${statusStyles[report.status] || 'bg-stone-100 text-stone-500'}`}>
                  {report.status}
                </span>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <p className='text-xs text-stone-400 px-4 py-6 text-center'>No reports yet.</p>
            )}
          </div>
        </div>

        {/* USERS */}
        <div className='bg-white/90 backdrop-blur border border-green-100 shadow-sm rounded-2xl overflow-hidden'>
          <div className='px-4 py-3 border-b border-stone-100'>
            <h2 className='text-sm font-medium'>{q ? 'Matching Users' : 'Users'}</h2>
            <span className='text-xs text-green-700'>{filteredUsers.length}</span>
          </div>

          <div className='divide-y divide-stone-100'>
            {filteredUsers.slice(0, 5).map((user, i) => (
              <div key={user.email} className='flex items-center justify-between px-4 py-3 hover:bg-green-50 transition'>

                <div className='flex items-center gap-3 min-w-0'>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {getInitials(user.name)}
                  </div>

                  <div className='min-w-0'>
                    <p className='text-sm font-medium text-stone-800 truncate'>{user.name}</p>
                    <p className='text-xs text-stone-400 truncate'>{user.email}</p>
                  </div>
                </div>

                <span className='text-xs text-stone-500 shrink-0 ml-3'>
                  {user.reportsCount} report{user.reportsCount !== 1 ? 's' : ''}
                </span>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <p className='text-xs text-stone-400 px-4 py-6 text-center'>
                {q ? `No users matching "${searchQuery}".` : 'No users found.'}
              </p>
            )}
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default AdminDashboard;