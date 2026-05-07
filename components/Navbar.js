'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-between h-20 items-center">
            {/* Logo - Centered on mobile, left on desktop */}
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="KaamSetu Logo" className="h-[60px] w-auto object-contain" />
            </Link>
            
            {/* Desktop Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/workers" className={`text-sm font-medium transition ${pathname === '/workers' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
                Find Workers
              </Link>
              <Link href="/register" className={`px-4 py-2 rounded-full text-sm font-bold transition ${pathname === '/register' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
                Join as Worker
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Toggle - Hidden on desktop */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-100 p-1.5 rounded-full flex z-50 shadow-xl border border-gray-200">
        <Link 
          href="/workers" 
          className={`flex-1 text-center py-2.5 rounded-full text-sm font-bold transition-all ${
            pathname?.startsWith('/workers') 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Find Worker
        </Link>
        <Link 
          href="/register" 
          className={`flex-1 text-center py-2.5 rounded-full text-sm font-bold transition-all ${
            pathname === '/register' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Join as Worker
        </Link>
      </div>
    </>
  );
}
