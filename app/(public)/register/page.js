'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/services';
import Link from 'next/link';

export default function RegisterWorker() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    is_active: false // Critical: pending admin approval
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('workers').insert([formData]);
    
    if (error) {
      alert('Error registering: ' + error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for registering. Your profile has been submitted and is currently <strong>pending approval</strong> from an administrator. 
            Once approved, it will be visible in the public directory.
          </p>
          <Link href="/workers" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition">
            View Worker Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-indigo-100 text-indigo-600 rounded-xl md:rounded-2xl mb-4">
          <UserPlus className="w-5 h-5 md:w-8 md:h-8" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Join as a Worker</h1>
        <p className="text-gray-500 text-sm md:text-base">Register your skills to connect with people who need your services.</p>
      </div>
      
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Kumar" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder="Optional" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Skill *</label>
              <select required name="skill_category" value={formData.skill_category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Village/Locality *</label>
              <input required type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Your local area" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City/District</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Nearest major city" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3 Years, or Fresher" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Daily Rate (₹)</label>
              <input type="text" name="daily_rate" value={formData.daily_rate} onChange={handleChange} placeholder="e.g. 500, or Negotiable" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Your Services (Optional)</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Describe your expertise, tools you have, or availability..." className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"></textarea>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-base md:text-lg shadow-md hover:shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Submitting...</>
              ) : 'Submit Registration'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              By submitting, you agree to your details being displayed publicly after review.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
