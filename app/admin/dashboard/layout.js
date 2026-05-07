'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Users, MessageSquare, LogOut, User, ChevronDown } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Fallback for development if no Supabase configured
        if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
          setUser({ email: 'admin@kaamsetu.com' });
        } else {
          router.push('/admin/login');
        }
      } else {
        setUser(session.user);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-gray-900 flex flex-col hidden md:flex fixed h-full z-20 border-r border-gray-200">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <img src="/logo.png" alt="KaamSetu Logo" className="h-[60px] w-auto object-contain" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${pathname === '/admin/dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/dashboard/workers" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${pathname.includes('/admin/dashboard/workers') || pathname.includes('/admin/dashboard/worker/') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'}`}>
            <Users className="w-5 h-5" />
            <span className="font-medium">Workers</span>
          </Link>
          <Link href="/admin/dashboard/leads" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${pathname.includes('/admin/dashboard/leads') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'}`}>
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Leads</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full pb-20 md:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full">
          <div className="md:hidden flex items-center">
             <img src="/logo.png" alt="KaamSetu Logo" className="h-[60px] w-auto object-contain" />
          </div>
          <div className="hidden md:block"></div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition"
            >
              <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                {user.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">Administrator</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-gray-900">Signed in as</p>
                  <p className="text-sm text-gray-500 truncate" title={user.email}>{user.email}</p>
                </div>
                <Link href="/admin/dashboard/profile" onClick={() => setDropdownOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition">
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 px-2 pb-safe">
        <Link href="/admin/dashboard" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/admin/dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/admin/dashboard/workers" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname.includes('/admin/dashboard/workers') || pathname.includes('/admin/dashboard/worker/') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-medium">Workers</span>
        </Link>
        <Link href="/admin/dashboard/leads" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname.includes('/admin/dashboard/leads') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-medium">Leads</span>
        </Link>
        <Link href="/admin/dashboard/profile" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname.includes('/admin/dashboard/profile') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
