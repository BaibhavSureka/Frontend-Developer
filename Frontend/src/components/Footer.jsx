import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from '../assets/Swiggy_logo.png';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-300">About</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Team</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-300">Help & Support</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Partner with us</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Ride with us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Install App</h3>
            <div className="space-y-4">
              <a href="#" className="block">
                <img src={logo} alt="Get it on Play Store" className="h-10 hover:scale-105 transition duration-300" />
              </a>
              <a href="#" className="block">
                <img src={logo} alt="Get it on App Store" className="h-10 hover:scale-105 transition duration-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-blue-500 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-400 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-pink-500 transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-700 transition duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Food Menu App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
