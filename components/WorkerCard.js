'use client';
import { supabase } from '@/lib/supabase';
import { Phone, MessageCircle, BadgeCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function WorkerCard({ worker }) {
  const handleCallTrack = () => {
    supabase.from('leads').insert([{ worker_id: worker.id, type: 'call' }]).then(({ error }) => {
      if (error) console.error('Error logging call:', error);
    });
  };

  const handleWhatsAppTrack = () => {
    supabase.from('leads').insert([{ worker_id: worker.id, type: 'whatsapp' }]).then(({ error }) => {
      if (error) console.error('Error logging whatsapp:', error);
    });
  };

  const formattedPhone = worker.whatsapp_number 
    ? worker.whatsapp_number.replace(/[\s\-()]/g, '') 
    : (worker.phone ? worker.phone.replace(/[\s\-()]/g, '') : '');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
      <Link href={`/workers/${worker.id}`} className="block p-4 md:p-5 flex-grow cursor-pointer">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-1 md:gap-2 mb-1">
              {worker.name}
              {worker.is_verified && <BadgeCheck className="text-blue-500 w-4 h-4 md:w-5 md:h-5 flex-shrink-0" title="Verified Worker" />}
            </h3>
            <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-indigo-50 text-indigo-700 text-[10px] md:text-sm font-semibold rounded-full">
              {worker.skill_category}
            </span>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold ${worker.availability_status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {worker.availability_status || 'Available'}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4 text-xs md:text-sm text-gray-600 bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
          <div className="flex items-center gap-1.5 md:gap-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            <span className="font-medium text-gray-800">{worker.village}{worker.city ? `, ${worker.city}` : ''}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200">
            <div>
              <p className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-0.5 md:mb-1">Experience</p>
              <p className="font-semibold text-gray-900 text-xs md:text-sm">{worker.experience || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-0.5 md:mb-1">Daily Rate</p>
              <p className="font-semibold text-gray-900 text-xs md:text-sm">{worker.daily_rate ? `₹${worker.daily_rate}` : 'Negotiable'}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3 md:p-4 pt-0 flex gap-2 md:gap-3 bg-white mt-auto">
        <a href={`tel:${worker.phone}`} onClick={handleCallTrack} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base font-medium transition active:scale-95 shadow-sm hover:shadow-blue-200">
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
          Call
        </a>
        <a href={`https://wa.me/91${formattedPhone}`} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppTrack} className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base font-medium transition active:scale-95 shadow-sm hover:shadow-green-200">
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
