import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { reports } from '../data/reports';
import { MdOutlineDashboard, MdOutlineInsertDriveFile, MdClose, MdMenu } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import logo from '../assets/logo.png';

const navItems = [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard />, 
    path: "/",
  },
  {
    label: "Reports",
    icon: <MdOutlineInsertDriveFile />,
    badge: reports.filter(r => r.status === "pending").length,
    path: "/report",
  },
  {
    label: "Users",
    icon: <LuUsers />,
    path: "/users"
  },
]

function Sidebar() {
  const [open, setOpen] = useState(false);

  const NavItems = ({ onNavigate }) => (
    <>
    {navItems.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center justify-between px-3 rounded-lg text-sm transition w-full
          ${isActive
            ? 'bg-green-50 text-green-700 font-medium'
            : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
          }` 
        }
      >
        <span className='flex items-center gap-2'>
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


  return (
    <>
    <div className="hidden md:flex h-screen w-60 bg-white border-r border-stone-200 flex-shrink-0 flex-col">
      {/* LOGO */}
      <div className="flex justify-center items-center border-b border-stone-100">
        <img src={logo} alt='CivicFix Logo' className='w-40 h-40' />
      </div>
      {/* NAV */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        <NavItems />
      </nav>
      {/* BOTTOM */}
      <div className='px-4 py-4 border-t border-stone-100 flex items-center gap-3'>
        <div className='w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center justify-center'>
          AD
        </div>
        <div className='flex flex-col flex-1'>
          <span className='text-xs font-medium text-stone-700'>Admin</span>
          <span className='text-xs text-stone-400'>admin@civicfix.com</span>
        </div>
        <button className='p-2 rounded-md text-red-500 hover:bg-red-100 transition'>
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
            <NavItems onNavigate={() => setOpen(false)} />
          </nav>

          {/* BOTTOM */}
          <div className='px-4 py-4 border-t border-stone-100 flex items-center gap-3'>
            <div className='w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex itmes-center justify-center'>AD</div>

            <div className='flex flex-col flex-1'>
              <span className='text-xs font-medium text-stone-700'>Admin</span>
              <span className="text-xs text-stone-400">admin@civicfix.com</span>
            </div>
            <button className="p-2 rounded-md text-red-500 hover:bg-red-100 transition">
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