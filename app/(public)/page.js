import CategoryCard from '@/components/CategoryCard';
import { Search } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/lib/services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white pt-20 pb-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
            Find trusted local workers <span className="text-yellow-300">near you</span>
          </h1>
          <p className="text-sm md:text-lg text-indigo-100 mb-6 md:mb-10 max-w-2xl mx-auto font-medium">
            KaamSetu helps you easily find and contact skilled workers in your village and nearby areas instantly.
          </p>
          
          <form action="/workers" className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-grow flex items-center w-full sm:w-auto px-3">
              <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <input 
                type="text" 
                name="search"
                placeholder="Search for skill, name or village..." 
                className="w-full bg-transparent border-none focus:ring-0 px-3 py-2 md:px-4 md:py-3 text-gray-900 text-sm md:text-lg outline-none placeholder-gray-400"
              />
            </div>
            <button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition text-base md:text-lg shadow-md whitespace-nowrap">
              Find Worker
            </button>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Browse by Category</h2>
            <p className="text-xs md:text-base text-gray-600">Select a category to find specific workers for your needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <CategoryCard 
                key={cat.category} 
                category={cat.category} 
                iconName={cat.iconName}
                colorClass={cat.colorClass}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
