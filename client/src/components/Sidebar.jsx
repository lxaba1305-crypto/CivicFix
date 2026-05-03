import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { reports } from '../data/reports';

const navItems = [
  {
    label: "Dashboard",
    //icon: 
    path: "/",
  },
  {
    label: "Reports",
    //icon: 
    badge: reports.filter(r => r.status === "pending").length,
    path: "/reports",
  },
  {
    label: "Users",
    //icon: 
    path: "/users"
  },
  {
    label: "Settings",
    //icon: 
    path: "/settings"
  },
]

function Sidebar() {
  return (
    <div className="h-screen w-56 bg-white border-r border-stone-200 flex flex-col">

      {/* LOGO */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-stone-100">
        <span className="text-sm font-medium text-stone-800">LOGO</span>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition w-full text-left
              ${isActive
                ? "bg-green-50 text-green-700 font-medium"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
              }`
            }
          >
            <span className="flex items-center gap-2.5">
              {item.icon}
              {item.label}
            </span>
            
            {item.badge > 0 && (
              <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM - USER */}
      <div className="px-4 py-4 border-t border-stone-100 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center justify-center">
          AD
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-stone-700">Admin</span>
          <span className="text-xs text-stone-400">admin@roadalert.com</span>
        </div>
        <div>
          <span className='text-sm font-medium text-stone-700'>logout</span>
        </div>
      </div>

    </div>
  )
}

export default Sidebar