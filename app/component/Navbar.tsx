'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [sparkEffect, setSparkEffect] = useState(false);

  useEffect(() => {
    const handleRefresh = () => {
      setSparkEffect(true);
      setTimeout(() => setSparkEffect(false), 1000); // Reset the spark effect after 1 second
    };

    window.addEventListener('beforeunload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, []);

  return (
    <nav className={`bg-transparent fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center shadow-lg border-2 ${sparkEffect ? 'border-yellow-500 animate-pulse' : 'border-gray-300'}`}>
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
      </div>

      {/* Navigation links on the right */}
      <ul className="flex space-x-8 ml-auto">
        <li>
          <Link href="/about" className=" text-lg font-extrabold hover:text-gray-400 transition-colors duration-300  text-indigo-600  ">About</Link>
        </li>
        <li>
          <Link href="/contact" className=" text-xl font-extrabold text-bold hover:text-gray-400 transition-colors duration-300  text-indigo-600  ">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
