import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-sky-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600 tracking-tight">
          Diagnosis<span className="text-gray-800">AI</span>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 hidden md:block">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition">Team</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
