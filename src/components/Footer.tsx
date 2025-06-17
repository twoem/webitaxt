import React from 'react';
import { MapPin, Copyright } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <p className="text-gray-300">
              Kagwe Town, Plaza Building 1st floor next to the Total Petrol Station
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Copyright className="h-4 w-4 mr-1" />
            <p className="text-gray-400">
              {currentYear} Twoem Online Productions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;