import ReportCard from '../components/ReportCard';
import ReportChart from '../components/ReportChart';
import StatsCard from '../components/StatsCard';
import { reports } from '../data/reports';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>

      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-stone-800'>Admin Overview</h1>
        <p className='text-xs text-green-700 border-green-50 bg-green-200 rounded-full px-3 py-1'>May 2026</p> 
      </div>

      <hr className='border-0 border-t border-stone-200 '/>

      {/* STATS */}
      <StatsCard />

      {/* CHARTS */}
      <ReportChart />

      {/* RECENT REPORTS */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-meduim text-stone-800'>Recent reports</h2>
          <Link to='/reports' className='text-sm text-green-600 hover:text-green-700 transition'>
            View all
          </Link>
        </div>
        <div className='bg-white border border-stone-200 rounded-xl divide-y divide-stone-100'>
          {reports.slice(0, 5).map((report) => (
            <div key={report.id} className='flex items-center justify-between gap-4 px-4 py-3'>

            <div className='flex flex-col gap-0.5 min-w-0'>
              <p className='text-xs text-stone-400'>{report.id}</p>
              <p className='text-sm font-medium text-stone-800 truncate'>{report.title}</p>
              <p className='text-xs text-stone-400 truncate'>{report.category} · {report.location}</p>
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
      
    </div>
  )
}

export default AdminDashboard;
