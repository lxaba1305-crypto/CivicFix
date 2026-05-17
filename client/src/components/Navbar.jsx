import { MdNotificationsNone } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Navbar({ title, user, notificationCount = 0, onSearch, showSearch = false }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-stone-200 px-4 sm:px-6 h-14 flex items-center">
      <div className="w-full flex items-center justify-between gap-3">

        {/* LEFT — logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="text-sm font-medium text-stone-800">{title}</span>
        </div>

        {/* CENTER — search */}
        {showSearch && (
          <div className="relative w-full max-w-sm">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none" />

            <input
            onChange={(e) => {
            onSearch?.(e.target.value);
            }}
              type="text"
              placeholder="Search reports..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
            />
          </div>
        )}

        {/* RIGHT — actions */}
        <div className="flex items-center gap-3 shrink-0">

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
          <div
              onClick={() => navigate('/profile')}
           className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-[11px] font-medium text-green-800 shrink-0 cursor-pointer hover:ring-2 hover:ring-green-400 transition">
            {user?.email ? user.email.slice(0,2).toUpperCase() : 'AD'}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;