import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-4">Aurindel</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting premium quality products with love and elegance.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Home</li>
            <li className="hover:text-white transition">About</li>
            <li className="hover:text-white transition">Products</li>
            <li className="hover:text-white transition">Contact</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-white font-semibold mb-3">Policies</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Refund Policy</li>
            <li className="hover:text-white transition">Shipping Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-3">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li>Email: support@aurindel.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Aurindel — All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
