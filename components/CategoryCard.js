import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category, iconName, colorClass }) {
  const Icon = Icons[iconName] || Icons.Briefcase;

  return (
    <Link href={`/workers?category=${encodeURIComponent(category)}`} className="group flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl mb-2 md:mb-4 transition-colors ${colorClass}`}>
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <h3 className="text-xs md:text-base font-semibold text-gray-800 text-center">{category}</h3>
    </Link>
  );
}
