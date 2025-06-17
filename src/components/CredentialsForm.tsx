import React, { useState } from 'react';
import { FileText, Download, User, Key, Mail, Phone } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface FormData {
  firstName: string;
  kraPin: string;
  kraPassword: string;
  email: string;
  emailPassword: string;
}

const CredentialsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    kraPin: '',
    kraPassword: '',
    email: '',
    emailPassword: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.kraPin.trim()) {
      newErrors.kraPin = 'KRA PIN is required';
    }
    if (!formData.kraPassword.trim()) {
      newErrors.kraPassword = 'KRA Password is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.emailPassword.trim()) {
      newErrors.emailPassword = 'Email Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    
    try {
      await generatePDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer I-Tax Details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter customer's first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* KRA PIN */}
          <div>
            <label htmlFor="kraPin" className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="inline h-4 w-4 mr-1" />
              KRA PIN Number
            </label>
            <input
              type="text"
              id="kraPin"
              name="kraPin"
              value={formData.kraPin}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.kraPin ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter KRA PIN"
            />
            {errors.kraPin && (
              <p className="mt-1 text-sm text-red-600">{errors.kraPin}</p>
            )}
          </div>

          {/* KRA Password */}
          <div>
            <label htmlFor="kraPassword" className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="inline h-4 w-4 mr-1" />
              KRA Portal Password
            </label>
            <input
              type="text"
              id="kraPassword"
              name="kraPassword"
              value={formData.kraPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.kraPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter KRA portal password"
            />
            {errors.kraPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.kraPassword}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Email Password */}
          <div className="md:col-span-2">
            <label htmlFor="emailPassword" className="block text-sm font-medium text-gray-700 mb-2">
              <Key className="inline h-4 w-4 mr-1" />
              Email Password
            </label>
            <input
              type="text"
              id="emailPassword"
              name="emailPassword"
              value={formData.emailPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.emailPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email password"
            />
            {errors.emailPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.emailPassword}</p>
            )}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 mb-1">
                Important Notice
              </h3>
              <p className="text-sm text-yellow-700">
                Please add a recovery phone number to the email to avoid losing it. 
                Retrieval of an email will take 3 days and cost 300/=
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Generate PDF Credentials
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CredentialsForm;