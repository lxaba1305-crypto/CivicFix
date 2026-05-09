import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import BackButton from '../buttons/BackButton';

function getInitials(name = '') {
  return name
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
  const [loading, setLoading] = useState(true);

  // FETCH USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('Reports')
      .select('*');

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    // GROUP USERS FORM REPORTS
    const groupedUsers = [];

    data.forEach((report) => {
      const existingUser = groupedUsers.find(
        user => user.email === report.email
      );

      if (existingUser) {
        existingUser.reports += 1;
      } else {
        groupedUsers.push({
          id: report.id,
          name: report.full_name,
          email: report.email,
          reports: 1,
          status: 'active',
          role: 'user',
          joined: new Date(report.created_at)
            .toISOString()
            .split('T')[0],
        });
      }
    });

    setUsers(groupedUsers);
    setLoading(false);
  }

  // DELETE USERS
  const handleDeleteUser = async (id) => {
    const { error } = await supabase
      .from('Reports')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // UPDATE ROLE
  const handleRoleChange = async (id, newRole) => {
    const { error } = await supabase
      .from('Reports')
      .update({ role: newRole })
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, role: newRole }
          : user
      )
    );
  };

  if (loading) {
    return (
      <div className='p-6 text-sm text-stone-500'>
        Loading users...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
      <BackButton />

      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-medium text-stone-800'>Users</h1>
          <p className='text-xs text-stone-400 mt-0.5'>{users.length} total users</p>
        </div>
      </div>

      <hr className='border-0 border-t border-stone-200' />

      {/* TABLE */}
      <div className='bg-white border border-stone-200 rounded-xl overflow-hidden'>
        
        {/* TABLE HEADER */}
        <div className='grid grid-cols-12 gap-4 px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-medium text-stone-400 uppercase tracking-wide'>
          <div className='col-span-4'>User</div>
          <div className='col-span-2'>Role</div>
          <div className='col-span-2'>Reports</div>
          <div className='col-span-2'>Status</div>
          <div className='col-span-2'>Actions</div>
        </div>

        {/* ROWS */}
        <div className='divide-y divide-stone-100'>
          {users.map((user, i) => (
            <div key={user.id} className='grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-stone-50 transition'>
              
              {/* USER */}
              <div className='col-span-4 flex items-center gap-3 min-w-0'>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${avatarColors[user.id]}`}>
                  {getInitials(user.name)}
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-stone-800 truncate'>{user.name}</p>
                  <p className='text-xs text-stone-400 truncate'>{user.email}</p>
                </div>
              </div>

              {/* ROLE */}
              <div className='col-span-2'>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                  className={`text-xs rounded-full px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400
                    ${user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-stone-100 text-stone-600'}
                  `}
                >
                  <option value='user'>user</option>
                  <option value='admin'>admin</option>
                </select>
              </div>

              {/* REPORTS */}
              <div className='col-span-2'>
                <Link
                  to='/reports'
                  className='text-sm text-stone-700 hover:text-green-600 transition font-medium'
                >
                  {user.reports || 0}
                  <span className='text-xs text-stone-400 font-normal ml-1'>reports</span>
                </Link>
              </div>

              {/* STATUS */}
              <div className='col-span-2'>
                <span className={`text-xs rounded-full px-3 py-1
                  ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}
                `}>
                  {user.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className='col-span-2'>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className='text-xs font-medium px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition'
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