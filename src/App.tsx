import React from 'react';
import CredentialsForm from './components/CredentialsForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              I-Tax Credentials Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional PDF documents with I-Tax login credentials for your customers. 
              Fill in the details below to generate a beautifully formatted credential document.
            </p>
          </div>
          <CredentialsForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;