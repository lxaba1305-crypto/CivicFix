import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import ReportCard from './components/ReportCard';

function App() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar/>

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Admin' notificationCount={4} />

        <main className='flex-1 bg-stone-50 overflow-y-auto pt-14 md:pt-0'>
          <Routes>
            {/* ADMIN */}
            <Route path='/' element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>

      
    </div>
  )
}

export default App
