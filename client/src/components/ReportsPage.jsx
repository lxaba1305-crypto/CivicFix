import React from 'react';
import ReportCard from '../components/ReportCard';
import { reports } from '../data/reports';

function ReportsPage() {
  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-stone-800'>Reports</h1>
      </div>
      <hr className='border-0 border-t border-stone-200' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}

export default ReportsPage;