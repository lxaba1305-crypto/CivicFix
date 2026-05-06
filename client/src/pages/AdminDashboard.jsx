import ReportCard from '../components/ReportCard';
import ReportChart from '../components/ReportChart';
import StatsCard from '../components/StatsCard';
import BackButton from '../buttons/BackButton';
import { reports, users } from '../data/reports';
import { Link } from 'react-router-dom';

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

const avatarColors = [
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-teal-100 text-teal-700',
];

function AdminDashboard() {
  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
      <BackButton />

      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium text-stone-800'>Admin Overview</h1>
          <p className='text-xs text-stone-400 mt-1'>Welcome back, Admin</p>
        </div>
        <p className='text-xs text-green-700 border-green-50 bg-green-200 rounded-full px-3 py-1'>May 2026</p> 
      </div>

      <hr className='border-0 border-t border-stone-200 '/>

      {/* STATS */}
      <StatsCard />

      {/* CHARTS */}
      <ReportChart />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* RECENT REPORTS */}
        <div className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-3 border-b border-stone-100'>
            <h2 className='text-sm font-medium text-stone-800'>Recent reports</h2>
            <Link to='/reports' className='text-sm text-green-600 hover:text-green-700 transition'>
              View all
            </Link>
          </div>
          <div className='divide-y divide-stone-100'>
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className='flex items-center justify-between gap-4 px-4 py-3'>

              <div className='flex flex-col gap-0.5 min-w-0'>
                <p className='text-xs text-stone-400'>{report.id}</p>
                <p className='text-sm font-medium text-stone-800 truncate'>{report.title}</p>
                <p className='text-xs text-stone-400 truncate'>{report.category} · {report.location}  
                </p>
             </div>

              <span className={`text-xs rounded-full px-3 py-1 flex-shrink-0
                ${report.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : ''}
                ${report.status === 'in progress' ? 'bg-blue-50 text-blue-700' : ''}
                ${report.status === 'resolved' ? 'bg-green-50 text-green-700' : ''}
              `}>
                {report.status}
              </span>
            </div>
            ))}
          </div>
        </div>

        {/* USERS */}
        <div className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-3 border-b border-stone-100'>
            <h2 className='text-sm font-medium text-stone-800'>Users</h2>
            <Link to='/users' className='text-xs text-green-600 hover:text-green-700 transition'>View all</Link>
          </div>
          <div className='divide-y divide-stone-100'>
            {users.slice(0, 5).map((user, i) => (
              <div key={user.id} className='flex items-center justify-between gap-4 px-4 py-3'>
                <div className='flex items-center gap-3 min-w-0'>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    {getInitials(user.name)}
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-medium text-stone-800 truncate'>{user.name}</p>
                    <p className='text-xs text-stone-400'>{user.reports} reports</p>
                  </div>
                </div>
                <span className={`text-xs rounded-full px-3 py-1 flex-shrink-0
                  ${user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-stone-100 text-stone-500'}
                `}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default AdminDashboard;
