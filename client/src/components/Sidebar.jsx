import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineInsertDriveFile, MdClose, MdMenu } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import logo from '../assets/logo.png';

const NavItems = ({ items, onNavigate }) => (
    <>
    {items.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 w-full group
          ${isActive
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md'
            : 'text-green-900 hover:bg-green-100 hover:text-green-700'
          }` 
        }
      >
        <span className='flex items-center gap-3'>
          {item.icon}
          {item.label}
        </span>

        {item.badge > 0 && (
          <span className='text-xs bg-white/90 text-emerald-700 rounded-full px-2 py-1 font-semibold shadow-sm'>
            {item.badge}
          </span>
        )}
      </NavLink>
    ))}
    </>
  );

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const userName = storedUser?.full_name || 'Guest';
  const userEmail = storedUser?.email || '';
  const userRole = storedUser?.role || 'user';

  useEffect(() => {
    fetchReports();
  }, []);

  // FETCH REPORTS FROM BACKEND
  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports');
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('Invalid reports data:', data);
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
       
  // ACCURATE PENDING COUNT
  const pendingCount = reports.filter(
    r => r.status === 'pending'
  ).length;

  const navItems = [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard />, 
    path: userRole === "admin" ? "/admin" : "/dashboard",
  },
  {
    label: "Reports",
    icon: <MdOutlineInsertDriveFile />,
    badge: pendingCount,
    path: "/reports",
  },
  ...(userRole === "admin"
    ? [
        {
          label: "Users",
          icon: <LuUsers />,
          path: "/users"
        },
      ] : []
  ),
]

console.log('Sidebar role:', userRole);

  return (
    <>
    <div className="hidden md:flex h-screen w-64 bg-gradient-to-b from-green-50 via-white to-emerald-50 border-r border-green-100 shrink-0 flex-col shadow-lg">
      {/* LOGO */}
      <div className="flex justify-center items-center gap-2 border-b border-green-100 py-4 bg-white/70 backdrop-blur-sm">
        <img src={logo} alt='CivicFix Logo' className='w-15 h-15' />
        <span className='text-xl font-bold text-green-900 tracking-wide'>
          CivicFix
        </span>
      </div>
      {/* NAV */}
      <nav className="flex flex-col gap-2 px-4 py-8 flex-1">
        <NavItems items={navItems} onNavigate={() => setOpen(false)} />
      </nav>

      {/* BOTTOM */}
      <div className='px-4 py-5 border-t border-green-100 flex items-center gap-3 bg-white/70 backdrop-blur-sm'>
        
        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-md'>
          {userName?.charAt(0)?.toUpperCase()}
        </div>

        <div 
         className='flex flex-col flex-1 min-w-0'
         onClick={() => navigate('/profile')}
        >
          <span className='text-sm font-semibold text-green-900 truncate'>
            {userName}
          </span>
          <span className='text-xs text-green-700/70 truncate'>
            {userEmail} 
          </span>
        </div>

        <button 
          onClick={handleLogout} 
          className='p-2 rounded-xl text-red-500 hover:bg-red-100 transition shadow-sm'
        >
          <MdLogout className='h-5 w-5' />
        </button>

      </div>
    </div>

    {/* MOBILE TOPBAR */}
    <div className='md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 flex items-center justify-between px-4 h-14 shadow-sm'>
      <img src={logo} alt="CivicFix Logo" className='h-10 w-auto' />
      <button onClick={() => setOpen(!open)} className='p-2 rounded-xl text-green-800 hover:bg-green-100 transition'>
        {open ? <MdClose className='h-5 w-5' /> : <MdMenu className='h-5 w-5'/>}
      </button>
    </div>

    {/* MOBILE DRAWER */}
    {open && (
      <div className='md:hidden fixed inset-0 z-40 flex'>
        {/* BACKDROP */}
        <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={() => setOpen(false)}>
        {/* DRAWER */}
        <div className='relative w-72 bg-gradient-to-b from-green-50 via-white to-emerald-50 h-full flex flex-col shadow-2xl mt-14 border-r border-green-100'>
          <nav className='flex flex-col gap-2 px-4 py-6 flex-1'>
            <NavItems 
              items={navItems}
              onNavigate={() => setOpen(false)} />
          </nav>

          {/* BOTTOM */}
          <div className='px-4 py-5 border-t border-green-100 flex items-center gap-3 bg-white/60 backdrop-blur-sm'>
            <div 
             onClick={() => navigate('/profile')}
            className='w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-md'>
              {userName?.charAt(0)?.toUpperCase()}
            </div>

            <div 
            onClick={() => navigate('/profile')}
             className='flex flex-col flex-1 min-w-0'>
              <span 
               onClick={() => navigate('/profile')}
              className='text-sm font-semibold text-green-900 truncate'>{userName}</span>
              <span className="text-xs text-green-700/70 truncate">{userEmail}</span>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-xl text-red-500 hover:bg-red-100 transition shadow-sm cursor-pointer">
              <MdLogout className="h-5 w-5" />
            </button>
          </div>
        </div>
        </div>
      </div>
    )}
  </>
  )
}

export default Sidebar