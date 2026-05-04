
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';


function App() {
  return (
   <Routes>

      {/* PUBLIC — no shell */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* APP — with shell */}
      <Route path='/admin' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='Admin' notificationCount={4} />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <AdminDashboard />
            </main>
          </div>
        </div>
      } />

      <Route path='/dashboard' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='CivicFix' />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <UserDashboard />
            </main>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App
