import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDasboard from './pages/AdminDasboard';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar/>

      <main className='flex-1 bg-stone-50 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<AdminDasboard />} /> 
        </Routes>
      </main>
    </div>
  )
}

export default App
