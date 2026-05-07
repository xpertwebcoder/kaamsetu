export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28 md:py-8">
        <div className="text-center">
          <p className="text-gray-500 text-[10px] md:text-xs">
            &copy; {new Date().getFullYear()} KaamSetu. All rights reserved.
          </p>
          <p className="text-gray-400 text-[9px] md:text-[10px] mt-1 md:mt-2">Connecting rural talent with local needs.</p>
        </div>
      </div>
    </footer>
  );
}
