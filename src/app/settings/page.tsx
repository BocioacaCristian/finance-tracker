'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('RON');
  const [dateFormat, setDateFormat] = useState('PPP');
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  
  const handleSave = () => {
    // Here you would save settings to local storage or a database
    // For now, we'll just show a success message
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 3000);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your application preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Application Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="RON">Romanian Leu (RON)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="USD">US Dollar (USD)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
              Date Format
            </label>
            <select
              id="dateFormat"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="PPP">June 15, 2023</option>
              <option value="dd/MM/yyyy">15/06/2023</option>
              <option value="MM/dd/yyyy">06/15/2023</option>
              <option value="yyyy-MM-dd">2023-06-15</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              id="reminders"
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="reminders" className="ml-2 block text-sm text-gray-700">
              Enable payment reminders
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="darkMode"
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
              Enable dark mode
            </label>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            {showSaved && (
              <div className="flex items-center text-green-600">
                <CheckIcon className="h-5 w-5 mr-1" />
                <span>Settings saved!</span>
              </div>
            )}
            <button
              onClick={handleSave}
              className="ml-auto rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Data Management</h2>
        <div className="space-y-4">
          <button
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export Data
          </button>
          <button
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Import Data
          </button>
          <button
            className="w-full rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </Layout>
  );
} 