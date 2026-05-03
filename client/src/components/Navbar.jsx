import React from 'react';
import { MdNotificationsNone } from "react-icons/md";

function Navbar({ title = "RoadAlert", user, onNew, notificationCount = 0 }) {
  return (
    <nav className="w-full bg-white border-b border-stone-200 px-6 h-14 flex items-center">
      <div className="w-full flex items-center justify-between gap-4">

        {/* LEFT — logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="text-sm font-medium text-stone-800">{title}</span>
        </div>

        {/* CENTER — search */}
        <input
          type="text"
          placeholder="Search reports..."
          className="w-full max-w-xs px-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
        />

        {/* RIGHT — actions */}
        <div className="flex items-center gap-3 flex-shrink-0">

          <button
            onClick={onNew}
            className="flex items-center gap-1 text-sm font-medium bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition"
          >
            + New report
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition">
              <MdNotificationsNone />
            </button>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center leading-none">
                {notificationCount}
              </span>
            )}
          </div>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-[11px] font-medium text-green-800 flex-shrink-0">
            {user?.email ? user.email.slice(0,2).toUpperCase() : 'AD'}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;