import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../buttons/BackButton';
import api from '../services/api';

function getInitials(name = '') {
  return (name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = [
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-teal-100 text-teal-700',
  'bg-rose-100 text-rose-700',
  'bg-stone-100 text-stone-600',
];

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [reportCounts, setReportCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const [usersRes, reportsRes] = await Promise.all([
        api.get('/users'),
        api.get('/reports'),
      ]);

      setUsers(usersRes.data || []);

      const counts = {};
      (reportsRes.data || []).forEach(r => {
        const key = r.user_id ?? r.email;
        if (key) counts[key] = (counts[key] || 0) + 1;
      });
      setReportCounts(counts);

    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Get report count for a user
  const getReportCount = (user) => {
    return reportCounts[user.id] ?? reportCounts[user.email] ?? 0;
  };

  if (loading) {
    return <div className='p-6 text-sm text-green-700'>Loading users...</div>;
  }

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50'>
      <BackButton />

      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium text-green-900'>Users</h1>
          <p className='text-xs text-green-700 mt-1'>{users.length} total users</p>
        </div>
      </div>

      <hr className='border-0 border-t border-stone-200' />

      <div className='bg-white/90 backdrop-blur border border-green-100 shadow-lg rounded-2xl overflow-hidden'>
        <div className='grid grid-cols-12 gap-4 px-4 py-2.5 bg-green-100 border-b border-green-200 text-xs font-medium text-stone-400 uppercase tracking-wide'>
          <div className='col-span-4'>User</div>
          <div className='col-span-2'>Role</div>
          <div className='col-span-2'>Reports</div>
          <div className='col-span-2'>Status</div>
          <div className='col-span-2'>Actions</div>
        </div>

        <div className='divide-y divide-stone-100'>
          {users.length === 0 && (
            <p className='text-xs text-stone-400 px-4 py-6 text-center'>No users found.</p>
          )}

          {users.map((user, i) => (
            <div key={user.id} className='grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-green-50 transition'>

              <div className='col-span-4 flex items-center gap-3 min-w-0'>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                  {getInitials(user.name || user.email)}
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-stone-800 truncate'>{user.name || '—'}</p>
                  <p className='text-xs text-stone-400 truncate'>{user.email || '—'}</p>
                </div>
              </div>

              <div className='col-span-2'>
                <span className={`text-xs rounded-full px-2.5 py-1 ${user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-stone-100 text-stone-600'}`}>
                  {user.role || 'user'}
                </span>
              </div>

              <div className='col-span-2'>
                <Link to='/reports' className='text-sm text-green-800 hover:text-green-600 transition font-semibold'>
                  {reportCounts[user.email] || 0}
                  <span className='text-xs text-stone-400 font-normal ml-1'>reports</span>
                </Link>
              </div>

              <div className='col-span-2'>
                <span className={`text-xs rounded-full px-3 py-1 ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                  {user.status || 'active'}
                </span>
              </div>

              <div className='col-span-2'>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className='text-xs font-medium px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-200 shadow-sm rounded-lg transition'
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;