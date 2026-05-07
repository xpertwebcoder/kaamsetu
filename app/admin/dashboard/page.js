'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, PhoneCall, MessageCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalWorkers: 0, pendingWorkers: 0, totalLeads: 0, callLeads: 0, waLeads: 0 });
  const [loading, setLoading] = useState(true);
  const [leadsData, setLeadsData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Fetch stats
    const { data: workers, count: workerCount } = await supabase.from('workers').select('skill_category, is_active', { count: 'exact' });
    const pendingCount = workers?.filter(w => !w.is_active).length || 0;
    
    const { data: leads } = await supabase.from('leads').select('type, created_at');
    let callLeads = 0;
    let waLeads = 0;
    
    // Process Leads Data for line chart (Last 7 Days)
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const leadsByDate = last7Days.reduce((acc, date) => ({ ...acc, [date]: { name: new Date(date).toLocaleDateString('en-US', {weekday: 'short'}), Calls: 0, WhatsApp: 0 } }), {});

    if (leads) {
      leads.forEach(l => {
        if (l.type === 'call') callLeads++;
        if (l.type === 'whatsapp') waLeads++;
        
        const dateStr = l.created_at.split('T')[0];
        if (leadsByDate[dateStr]) {
          if (l.type === 'call') leadsByDate[dateStr].Calls++;
          if (l.type === 'whatsapp') leadsByDate[dateStr].WhatsApp++;
        }
      });
    }

    setStats({
      totalWorkers: workerCount || 0,
      pendingWorkers: pendingCount || 0,
      totalLeads: leads?.length || 0,
      callLeads,
      waLeads
    });

    setLeadsData(Object.values(leadsByDate));
    setEngagementData([
      { name: 'Phone Calls', value: callLeads, color: '#4f46e5' }, // indigo-600
      { name: 'WhatsApp', value: waLeads, color: '#16a34a' } // green-600
    ]);

    // Process Skills Data
    if (workers) {
      const skillsMap = workers.reduce((acc, w) => {
        const skill = w.skill_category || 'Other';
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      }, {});
      setSkillData(Object.entries(skillsMap).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count));
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">Dashboard</h1>

      {/* Stats Cards - Updated to lg:grid-cols-5 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mb-10">
        <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="p-2 md:p-4 bg-indigo-100 text-indigo-600 rounded-lg md:rounded-xl"><Users className="w-5 h-5 md:w-8 md:h-8" /></div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">Total Workers</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalWorkers}</p>
          </div>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 relative overflow-hidden">
          <div className="p-2 md:p-4 bg-orange-100 text-orange-600 rounded-lg md:rounded-xl relative z-10"><Users className="w-5 h-5 md:w-8 md:h-8" /></div>
          <div className="relative z-10">
            <p className="text-xs md:text-sm font-medium text-gray-500">Pending</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.pendingWorkers}</p>
          </div>
          {stats.pendingWorkers > 0 && (
            <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-orange-50 rounded-bl-full -z-0"></div>
          )}
        </div>
        <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="p-2 md:p-4 bg-purple-100 text-purple-600 rounded-lg md:rounded-xl"><Users className="w-5 h-5 md:w-8 md:h-8" /></div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">Total Leads</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
          </div>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="p-2 md:p-4 bg-blue-100 text-blue-600 rounded-lg md:rounded-xl"><PhoneCall className="w-5 h-5 md:w-8 md:h-8" /></div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">Call Leads</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.callLeads}</p>
          </div>
        </div>
        <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="p-2 md:p-4 bg-green-100 text-green-600 rounded-lg md:rounded-xl"><MessageCircle className="w-5 h-5 md:w-8 md:h-8" /></div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">WhatsApp</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.waLeads}</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Engagement (Last 7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="Calls" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="WhatsApp" stroke="#16a34a" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Workers by Skill</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} width={100} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-lg font-bold text-gray-900 mb-6 w-full text-left">Engagement Breakdown</h2>
          <div className="h-[300px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
