
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-altss-deep-blue text-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <a href="/" className="text-xl font-bold">Altss</a>
            </div>
            <p className="text-blue-100 mb-6 text-sm max-w-xs">
              Limited Partner database for alternative asset classes. Created by fund managers for fund managers.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-blue-100 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-blue-100 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-blue-100 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-blue-100 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#demo" className="text-blue-100 hover:text-white transition-colors text-sm">Book a Demo</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="#testimonials" className="text-blue-100 hover:text-white transition-colors text-sm">Testimonials</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Data Processing</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-900/30 text-sm text-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Altss LLC. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Domain hosted at namebright.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
