
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import WelcomeScreen from './pages/WelcomeScreen';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [role, setRole] = useState('user');

  const navigate = useNavigate();
  
  const handleRoleChange = (newRole) => {
    setRole(newRole);

    if (newRole === "admin") {
      navigate("admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
  <>
   {showIntro && (
    <WelcomeScreen onFinish={() => setShowIntro(false)} />
    )}

    <Routes>
      {/* PUBLIC */}
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* ADMIN DASHBOARD ROUTE */}
      <Route path='/admin' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='Admin' />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <AdminDashboard />
            </main>
          </div>
        </div>
      } />

      {/* USER DASHBOARD ROUTE */}
      <Route path='/dashboard' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='CivicFix' />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <UserDashboard />
            </main>
          </div>
        </div>
        } 
      />

      {/* REPORT PAGE ROUTE */}
      <Route path='/reports' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='Reports' />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <ReportsPage role={role} />
            </main>
          </div>
        </div>
        } 
      />

      <Route path='/users' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='Users' />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <UsersPage />
            </main>
          </div>
        </div>
      } />
    </Routes>
    </>
  )
}

export default App
