'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Lock, Mail, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setUpdateLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setUpdateLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Admin Profile</h1>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 md:mb-8">
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Account Details</h2>
            <p className="text-xs md:text-sm text-gray-500">Manage your administrative account</p>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 text-gray-700 mb-3 md:mb-4 bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <div>
              <p className="text-[11px] md:text-sm font-medium text-gray-500">Email Address</p>
              <p className="font-bold text-sm md:text-base text-gray-900">{user?.email}</p>
            </div>
          </div>
          <p className="text-[11px] md:text-sm text-gray-500 leading-tight">Note: Email addresses cannot be changed from this panel. Please contact super-admin or support for email modifications.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" /> Security Settings
          </h2>
        </div>
        <div className="p-4 md:p-6">
          {message.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={updateLoading || !newPassword || !confirmPassword}
              className="px-6 py-2.5 md:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm md:text-base transition disabled:opacity-50 w-full md:w-auto"
            >
              {updateLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 flex justify-center md:justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm md:text-base transition w-full md:w-auto justify-center border border-red-100"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5" /> Sign Out
        </button>
      </div>
    </div>
  );
}
