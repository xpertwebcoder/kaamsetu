'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/services';
import Link from 'next/link';

export default function AddWorker() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp_number: '',
    skill_category: 'Labour',
    village: '',
    city: '',
    experience: '',
    daily_rate: '',
    availability_status: 'Available',
    description: '',
    is_verified: false,
    is_active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('workers').insert([formData]);
    
    if (error) {
      alert('Error adding worker: ' + error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Worker</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Category *</label>
              <select required name="skill_category" value={formData.skill_category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="">Select a service...</option>
                {SERVICE_CATEGORIES.map(category => (
                  <optgroup key={category.category} label={`${category.icon} ${category.category}`}>
                    {category.services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Village *</label>
              <input required type="text" name="village" value={formData.village} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (e.g. 5 Years)</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate (₹)</label>
              <input type="text" name="daily_rate" value={formData.daily_rate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select name="availability_status" value={formData.availability_status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Notes</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_verified" checked={formData.is_verified} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Verified Worker</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Active Listing</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Worker'}
          </button>
        </form>
      </div>
    </div>
  );
}
