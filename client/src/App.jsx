import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import IntroScreen from './pages/IntroScreen';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("hasVisitedCivicFix");
  });

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const [role, setRole] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).role : null;
  });
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
  if (showIntro) return;

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, [showIntro]);
  


  const handleRoleChange = (newRole) => {
    setRole(newRole);

    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    storedUser.role = newRole;
    localStorage.setItem('user', JSON.stringify(storedUser));
    setUser(storedUser);

    if (newRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
  <>
   {/* FIRST TIME CINEMATIC INTRO */}
{showIntro && (
  <IntroScreen
    onFinish={() => {
      sessionStorage.setItem("hasVisitedCivicFix", "true");
      setShowIntro(false);
    }}
  />
)}

{/* NORMAL LOADING SCREEN */}
{!showIntro && loading && (
  <WelcomeScreen
    onFinish={() => {
      setLoading(false);
    }}
  />
)}

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
            <Navbar title='Admin' user={user} showSearch={true} onSearch={setSearchQuery} />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <AdminDashboard  searchQuery={searchQuery}/>
            </main>
          </div>
        </div>
      } />

      {/* USER DASHBOARD ROUTE */}
      <Route path='/dashboard' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='CivicFix' user={user} />
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
            <Navbar title='Reports' user={user} showSearch={true} onSearch={setSearchQuery} />
            <main className='flex-1 bg-stone-50 overflow-y-auto'>
              <ReportsPage  searchQuery={searchQuery} />
            </main>
          </div>
        </div>
        } 
      />

      <Route path='/users' element={
        <div className='flex h-screen overflow-hidden'>
          <Sidebar role={role} setRole={handleRoleChange} />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Navbar title='Users' user={user} />
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