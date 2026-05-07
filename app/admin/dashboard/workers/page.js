'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'pending'
  const [pendingCount, setPendingCount] = useState(0);

  const fetchWorkers = async () => {
    setLoading(true);
    const { data: workersData } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
    
    if (workersData) {
      setWorkers(workersData);
      setPendingCount(workersData.filter(w => !w.is_active).length);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      await supabase.from('workers').delete().eq('id', id);
      fetchWorkers();
    }
  };

  const toggleVerification = async (worker) => {
    await supabase.from('workers').update({ is_verified: !worker.is_verified }).eq('id', worker.id);
    fetchWorkers();
  };

  const toggleActive = async (worker) => {
    await supabase.from('workers').update({ is_active: !worker.is_active }).eq('id', worker.id);
    fetchWorkers();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  const filteredWorkers = workers.filter(w => {
    if (filter === 'active') return w.is_active;
    if (filter === 'pending') return !w.is_active;
    return true; // 'all'
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Workers</h1>
        <Link href="/admin/dashboard/worker/new" className="md:hidden bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap">
          + Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 hidden md:block">Manage Workers</h2>
          <div className="flex flex-col w-full md:w-auto md:flex-row gap-3 items-center">
            <div className="flex w-full md:w-auto bg-gray-100 p-1 rounded-lg overflow-x-auto">
              <button onClick={() => setFilter('all')} className={`flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm font-bold rounded-md transition ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
              <button onClick={() => setFilter('active')} className={`flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm font-bold rounded-md transition ${filter === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
              <button onClick={() => setFilter('pending')} className={`flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm font-bold rounded-md transition flex items-center justify-center gap-1.5 ${filter === 'pending' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                Pending
                {pendingCount > 0 && <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>}
              </button>
            </div>
            <Link href="/admin/dashboard/worker/new" className="hidden md:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap">
              + Add Worker
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Skill & Location</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWorkers.map((worker) => (
                <tr key={worker.id} className={`hover:bg-gray-50 transition ${!worker.is_active ? 'bg-orange-50/30' : ''}`}>
                  <td className="p-4">
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      {worker.name}
                      {!worker.is_active && <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" title="Pending Approval"></span>}
                    </p>
                    <p className="text-sm text-gray-500">{worker.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-800">{worker.skill_category}</p>
                    <p className="text-sm text-gray-500">{worker.village}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 items-center">
                      <button onClick={() => toggleActive(worker)} className={`text-xs px-3 py-1 rounded-full font-bold transition hover:opacity-80 ${worker.is_active ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                        {worker.is_active ? 'Active' : 'Approve Profile'}
                      </button>
                      <button onClick={() => toggleVerification(worker)} className={`text-xs px-3 py-1 rounded-full font-bold transition hover:opacity-80 ${worker.is_verified ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {worker.is_verified ? 'Verified' : 'Unverified'}
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/admin/dashboard/worker/${worker.id}/edit`} className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(worker.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredWorkers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No workers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile View: Cards */}
        <div className="md:hidden flex flex-col divide-y divide-gray-100">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className={`p-3 flex flex-col gap-2 ${!worker.is_active ? 'bg-orange-50/20' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-[15px] leading-tight flex items-center gap-2">
                    {worker.name}
                    {!worker.is_active && <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{worker.skill_category}</p>
                </div>
                <div className="flex gap-1.5">
                  <Link href={`/admin/dashboard/worker/${worker.id}/edit`} className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition" title="Edit">
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => handleDelete(worker.id)} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-medium text-gray-800">{worker.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="font-medium text-gray-800 truncate pr-2">{worker.village}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-1.5">
                <button onClick={() => toggleActive(worker)} className={`flex-1 text-center py-1.5 rounded-md font-bold text-xs transition ${worker.is_active ? 'bg-green-50 text-green-700' : 'bg-orange-500 text-white'}`}>
                  {worker.is_active ? 'Active' : 'Approve'}
                </button>
                <button onClick={() => toggleVerification(worker)} className={`flex-1 text-center py-1.5 rounded-md font-bold text-xs transition ${worker.is_verified ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                  {worker.is_verified ? 'Verified' : 'Verify'}
                </button>
              </div>
            </div>
          ))}
          {filteredWorkers.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-500">No workers found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
