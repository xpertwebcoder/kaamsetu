'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      // Fetch leads and join with worker details
      const { data, error } = await supabase
        .from('leads')
        .select(`
          id,
          type,
          created_at,
          workers ( name, phone, skill_category )
        `)
        .order('created_at', { ascending: false });

      if (data) {
        setLeads(data);
      }
      setLoading(false);
    };

    fetchLeads();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Leads Activity</h1>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent Engagement</h2>
        </div>
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Worker Contacted</th>
                <th className="p-4 font-semibold">Skill</th>
                <th className="p-4 font-semibold">Engagement Type</th>
                <th className="p-4 font-semibold">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{lead.workers?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{lead.workers?.phone || 'N/A'}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {lead.workers?.skill_category || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {lead.type === 'call' ? (
                        <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
                          <Phone className="w-3 h-3" /> Phone Call
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                          <MessageCircle className="w-3 h-3" /> WhatsApp
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(lead.created_at).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No leads recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden flex flex-col divide-y divide-gray-100">
          {leads.map((lead) => (
            <div key={lead.id} className="p-3 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-[15px] leading-tight">{lead.workers?.name || 'Unknown'}</p>
                  <span className="inline-block px-2 py-0.5 mt-0.5 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-full">
                    {lead.workers?.skill_category || 'N/A'}
                  </span>
                </div>
                <div>
                  {lead.type === 'call' ? (
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-[10px] font-bold">
                      <Phone className="w-3 h-3" /> Call
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-[10px] font-bold">
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                <p className="font-medium text-gray-800">{lead.workers?.phone}</p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(lead.created_at).toLocaleString('en-IN', {
                    day: '2-digit', month: 'short',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-500">No leads recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
