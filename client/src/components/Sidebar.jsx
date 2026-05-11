import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
          `flex items-center justify-between px-3 rounded-lg text-sm transition w-full
          ${isActive
            ? 'bg-green-50 text-green-700 font-medium'
            : 'text-stone-500 hover:bg-green-50 hover:text-green-700'
          }` 
        }
      >
        <span className='flex items-center gap-2 py-1.5'>
          {item.icon}
          {item.label}
        </span>

        {item.badge > 0 && (
          <span className='text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-1 '>
            {item.badge}
          </span>
        )}
      </NavLink>
    ))}
    </>
  );

function Sidebar({ role, setRole }) {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

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
    setRole(null);
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
    path: role === "admin" ? "/admin" : "/dashboard",
  },
  {
    label: "Reports",
    icon: <MdOutlineInsertDriveFile />,
    badge: pendingCount,
    path: "/reports",
  },
  ...(role === "admin"
    ? [
        {
          label: "Users",
          icon: <LuUsers />,
          path: "/users"
        },
      ] : []
  ),
]

  return (
    <>
    <div className="hidden md:flex h-screen w-60 bg-white border-r border-stone-200 shrink-0 flex-col">
      {/* LOGO */}
      <div className="flex justify-center items-center border-b border-stone-100">
        <img src={logo} alt='CivicFix Logo' className='w-15 h-15' />
        CivicFix
      </div>
      {/* NAV */}
      <nav className="flex flex-col gap-1 px-3 py-8 flex-1">
        <NavItems items={navItems} onNavigate={() => setOpen(false)} />
      </nav>

      {/* BOTTOM */}
      <div className='px-4 py-4 border-t border-stone-100 flex items-center gap-3'>
        <div className='w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center justify-center'>
          {role === "admin" ? "AD" : "UD"}
        </div>
        <div className='flex flex-col flex-1'>
          <span className='text-xs font-medium text-stone-700'>
            {role === "admin" ? "Admin" : "User"}
          </span>
          <span className='text-xs text-stone-400'>
            {role === "admin" ? "admin@civicfix.com" : "user@civicfix.com"} 
          </span>
        </div>
        <button onClick={handleLogout} className='p-2 rounded-md text-red-500 hover:bg-red-100 transition'>
          <MdLogout className='h-5 w-5' />
        </button>

      </div>
    </div>

    {/* MOBILE TOPBAR */}
    <div className='md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 flex items-center justify-between px-4 h-14'>
      <img src={logo} alt="CivicFix Logo" className='h-10 w-auto' />
      <button onClick={() => setOpen(!open)} className='p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition'>
        {open ? <MdClose className='h-5 w-5' /> : <MdMenu className='h-5 w-5'/>}
      </button>
    </div>

    {/* MOBILE DRAWER */}
    {open && (
      <div className='md:hidden fixed inset-0 z-40 flex'>
        {/* BACKDROP */}
        <div className='absolute inset-0 bg-black/20' onClick={() => setOpen(false)}>
        {/* DRAWER */}
        <div className='relative w-64 bg-white h-full flex flex-col shadow-lg mt-14'>
          <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
            <NavItems 
              items={navItems}
              onNavigate={() => setOpen(false)} />
          </nav>

          {/* BOTTOM */}
          <div className='px-4 py-4 border-t border-stone-100 flex items-center gap-3'>
            <div className='w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center justify-center'>AD</div>

            <div className='flex flex-col flex-1'>
              <span className='text-xs font-medium text-stone-700'>Admin</span>
              <span className="text-xs text-stone-400">admin@civicfix.com</span>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-md text-red-500 hover:bg-red-100 transition">
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