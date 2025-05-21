'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsPage() {
  const { theme, setTheme, forceReset } = useTheme();
  
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currency') || 'RON';
    }
    return 'RON';
  });
  
  const [dateFormat, setDateFormat] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dateFormat') || 'PPP';
    }
    return 'PPP';
  });
  
  const [reminders, setReminders] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reminders') === 'true';
    }
    return true;
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [storageState, setStorageState] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  
  // Force sync with the actual DOM state
  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkClass);
    
    // Fix any mismatch
    if ((theme === 'dark') !== isDarkClass) {
      // If there's a mismatch, make the state match the DOM
      setTheme(isDarkClass ? 'dark' : 'light');
    }
    
    updateDebugInfo();
  }, []);
  
  // Effect to set initial dark mode state and check localStorage
  useEffect(() => {
    setDarkMode(theme === 'dark');
    updateDebugInfo();
  }, [theme]);
  
  // Update debug information 
  const updateDebugInfo = () => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const htmlClass = document.documentElement.className;
      const isDarkClass = document.documentElement.classList.contains('dark');
      setStorageState(`localStorage: ${storedTheme || 'not set'}`);
      setDebugInfo(`Current HTML class: ${htmlClass}, DOM is dark: ${isDarkClass}, Context theme: ${theme}`);
    } catch (e) {
      setStorageState('Error accessing localStorage');
      setDebugInfo('Error getting debug info');
    }
  };
  
  // Handle dark mode toggle with forced DOM update
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      setTheme('dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
    setTimeout(updateDebugInfo, 100);
  };
  
  // Force light mode with complete reset
  const handleForceReset = () => {
    document.documentElement.className = 'light';
    forceReset();
    setDarkMode(false);
    // Force refresh the page to ensure all styles are reset
    window.location.reload();
  };
  
  const handleSave = () => {
    // Save settings to local storage
    try {
      localStorage.setItem('currency', currency);
      localStorage.setItem('dateFormat', dateFormat);
      localStorage.setItem('reminders', reminders.toString());
      
      setShowSaved(true);
      setTimeout(() => {
        setShowSaved(false);
      }, 3000);
      
      updateDebugInfo();
    } catch (e) {
      console.error('Error saving settings to localStorage:', e);
    }
  };

  // Determine classes based on theme
  const isDark = theme === 'dark';
  const cardBgClass = isDark ? 'bg-gray-800' : 'bg-white';
  const headerTextClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const subTextClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const inputBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = isDark ? 'border-gray-600' : 'border-gray-300';
  const inputTextClass = isDark ? 'text-white' : 'text-gray-900';
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${headerTextClass}`}>Settings</h1>
        <p className={subTextClass}>Configure your application preferences</p>
      </div>
      
      <div className={`${cardBgClass} rounded-lg shadow p-6 mb-6`}>
        <h2 className={`text-lg font-semibold mb-4 ${headerTextClass}`}>Theme Debug</h2>
        <div className={`space-y-2 text-sm mb-6 p-3 border ${inputBorderClass} rounded`}>
          <p className={labelClass}>{storageState}</p>
          <p className={labelClass}>{debugInfo}</p>
        </div>
        
        <h2 className={`text-lg font-semibold mb-4 ${headerTextClass}`}>Application Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="currency" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`mt-1 block w-full rounded-md ${inputBorderClass} ${inputBgClass} ${inputTextClass} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="RON">Romanian Leu (RON)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="USD">US Dollar (USD)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFormat" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Date Format
            </label>
            <select
              id="dateFormat"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className={`mt-1 block w-full rounded-md ${inputBorderClass} ${inputBgClass} ${inputTextClass} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
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
              className={`h-4 w-4 rounded ${inputBorderClass} text-blue-600 focus:ring-blue-500`}
            />
            <label htmlFor="reminders" className={`ml-2 block text-sm ${labelClass}`}>
              Enable payment reminders
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="darkMode"
              type="checkbox"
              checked={darkMode}
              onChange={(e) => handleDarkModeChange(e.target.checked)}
              className={`h-4 w-4 rounded ${inputBorderClass} text-blue-600 focus:ring-blue-500`}
            />
            <label htmlFor="darkMode" className={`ml-2 block text-sm ${labelClass}`}>
              Enable dark mode
            </label>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            {showSaved && (
              <div className={`flex items-center text-green-600 ${isDark ? 'text-green-400' : ''}`}>
                <CheckIcon className="h-5 w-5 mr-1" />
                <span>Settings saved!</span>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleForceReset}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Force Light Mode
              </button>
              <button
                onClick={handleSave}
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${cardBgClass} rounded-lg shadow p-6`}>
        <h2 className={`text-lg font-semibold mb-4 ${headerTextClass}`}>Data Management</h2>
        <div className="space-y-4">
          <button
            className={`w-full rounded-md border ${inputBorderClass} ${inputBgClass} px-4 py-2 text-sm font-medium ${labelClass} shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Export Data
          </button>
          <button
            className={`w-full rounded-md border ${inputBorderClass} ${inputBgClass} px-4 py-2 text-sm font-medium ${labelClass} shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Import Data
          </button>
          <button
            className={`w-full rounded-md border ${isDark ? 'border-red-500' : 'border-red-300'} ${inputBgClass} px-4 py-2 text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-700'} shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          >
            Reset All Data
          </button>
        </div>
      </div>
    </Layout>
  );
} 