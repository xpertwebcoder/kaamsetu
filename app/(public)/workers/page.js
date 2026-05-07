'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import WorkerCard from '@/components/WorkerCard';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Loader2 } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/services';

function WorkersContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [villageFilter, setVillageFilter] = useState('');

  const fetchWorkers = async () => {
    setLoading(true);
    let query = supabase.from('workers').select('*').eq('is_active', true);

    if (categoryFilter) {
      query = query.eq('skill_category', categoryFilter);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching workers:', error);
    } else {
      let filteredData = data || [];
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredData = filteredData.filter(w => 
          w.name.toLowerCase().includes(lowerSearch) || 
          w.skill_category.toLowerCase().includes(lowerSearch) ||
          w.village.toLowerCase().includes(lowerSearch)
        );
      }
      if (villageFilter) {
        filteredData = filteredData.filter(w => w.village.toLowerCase().includes(villageFilter.toLowerCase()));
      }
      setWorkers(filteredData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, [categoryFilter, searchTerm, villageFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Find Workers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search name, skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none"
            >
              <option value="">All Categories</option>
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
            <input 
              type="text" 
              placeholder="Filter by village..." 
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
      ) : workers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No workers found</h3>
          <p className="text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchTerm(''); setCategoryFilter(''); setVillageFilter(''); }}
            className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function WorkersPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-indigo-600 animate-spin" /></div>}>
      <WorkersContent />
    </Suspense>
  );
}
