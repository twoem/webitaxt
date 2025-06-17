import React from 'react';
import { Globe, Wifi } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Twoem Online Productions</h1>
              <p className="text-gray-600 flex items-center">
                <Wifi className="h-4 w-4 mr-1" />
                Dealers in: High Speed internet and cyber services
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;