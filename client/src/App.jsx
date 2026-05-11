import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem("hasVisitedCivicFix");
  });

  const navigate = useNavigate();

  const [role, setRole] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).role : null;
  });
  
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
            setLoading(false);
            localStorage.setItem("hasVisitedCivicFix", "true")
        }, 3000);
    }
      return () => { 
        if (timer) {
          clearTimeout(timer);
        }
    };
   }, [loading]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);

    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    storedUser.role = newRole;
    localStorage.setItem('user', JSON.stringify(storedUser));

    if (newRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
  <>
   {loading && <WelcomeScreen />}

  {!loading && (
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
  )}
    </>
  )
}

export default App