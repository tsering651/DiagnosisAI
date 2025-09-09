import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Mail size={18} /> diagnosisai@iitg.ac.in
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone size={18} /> +91 9354071155
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <MapPin size={18} /> Gaurang Hostel, IIT Guwahati, Assam, India
          </p>
        </div>

        {/* Quick Links */}
        

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 transition">
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>


        {/* Newsletter or Socials (optional) */}
        <div>
          <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
          <p>Follow us on our social platforms and stay up to date with new features!</p>
          {/* Add icons or social links if needed */}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-white/30 pt-4 text-sm text-center">
        &copy; {new Date().getFullYear()} Diagnosis AI @ IIT Guwahati. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
