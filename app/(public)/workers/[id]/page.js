'use client';

import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { Phone, MessageCircle, BadgeCheck, MapPin, Briefcase, Clock, IndianRupee, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WorkerDetail({ params }) {
  const unwrappedParams = use(params);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .eq('id', unwrappedParams.id)
        .single();
      
      if (!error && data) {
        setWorker(data);
      }
      setLoading(false);
    };
    fetchWorker();
  }, [unwrappedParams.id]);

  const handleCall = async () => {
    await supabase.from('leads').insert([{ worker_id: worker.id, type: 'call' }]);
    window.location.href = `tel:${worker.phone}`;
  };

  const handleWhatsApp = async () => {
    await supabase.from('leads').insert([{ worker_id: worker.id, type: 'whatsapp' }]);
    const formattedPhone = worker.whatsapp_number ? worker.whatsapp_number.replace(/[\s\-()]/g, '') : worker.phone.replace(/[\s\-()]/g, '');
    window.open(`https://wa.me/91${formattedPhone}`, '_blank');
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!worker) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Worker not found</h2>
        <Link href="/workers" className="text-indigo-600 hover:underline font-medium">Back to all workers</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/workers" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to workers
      </Link>

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 px-5 py-6 md:px-8 md:py-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
              <h1 className="text-2xl md:text-4xl font-extrabold">{worker.name}</h1>
              {worker.is_verified && <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />}
            </div>
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full font-semibold">
              {worker.skill_category}
            </span>
          </div>
          <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm ${worker.availability_status === 'Available' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>
            {worker.availability_status || 'Available'}
          </div>
        </div>

        <div className="p-5 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Worker Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg font-medium text-gray-900">{worker.village}{worker.city ? `, ${worker.city}` : ''}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-lg font-medium text-gray-900">{worker.experience || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Daily Rate</p>
                  <p className="text-lg font-medium text-gray-900">{worker.daily_rate ? `₹${worker.daily_rate}` : 'Negotiable'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-medium text-gray-900">{worker.is_active ? 'Active on platform' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          </div>

          {worker.description && (
            <div className="mb-6 md:mb-10 p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl">
              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">About</h4>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{worker.description}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-100">
            <button onClick={handleCall} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-bold text-base md:text-lg transition shadow-sm hover:shadow-blue-200">
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              Call Now
            </button>
            <button onClick={handleWhatsApp} className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-bold text-base md:text-lg transition shadow-sm hover:shadow-green-200">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              WhatsApp Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
