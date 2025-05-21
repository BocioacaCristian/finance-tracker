'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, CreditCardIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClass, themeClasses } from '../utils/themeUtils';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Use the utility function for theme classes
  const bgClass = getThemeClass(isDark, themeClasses.page);
  const navBgClass = getThemeClass(isDark, themeClasses.card);
  const textClass = getThemeClass(isDark, themeClasses.heading);
  const subTextClass = getThemeClass(isDark, themeClasses.body);
  const borderClass = getThemeClass(isDark, themeClasses.border);
  const contentBgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
  
  // Navigation item active and inactive styles
  const activeNavBg = isDark ? 'bg-indigo-900/40' : 'bg-indigo-50';
  const activeTextColor = isDark ? 'text-indigo-300' : 'text-indigo-600';
  const inactiveTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const hoverBgClass = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const hoverTextClass = isDark ? 'hover:text-white' : 'hover:text-gray-900';
  
  // Icon colors
  const activeIconColor = isDark ? 'text-indigo-400' : 'text-indigo-500';
  const inactiveIconColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const hoverIconColor = isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-500';
  
  // Ensure theme is respected when component mounts or theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDark]);

  // Navigation items with their paths and icons
  const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className={`flex flex-col h-screen ${bgClass} font-sans`}>
      {/* Top navigation bar */}
      <nav className={`${navBgClass} border-b ${borderClass} sticky top-0 z-30`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  FT
                </div>
                <span className={`ml-3 font-semibold text-xl ${textClass}`}>Finance Tracker</span>
              </Link>
            </div>
            
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <button 
                  type="button"
                  className={`relative rounded-full ${isDark ? 'bg-gray-700' : 'bg-white'} p-1 ${isDark ? 'text-gray-300' : 'text-gray-400'} ${isDark ? 'hover:text-gray-200' : 'hover:text-gray-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-800' : ''}`}
                >
                  <span className="sr-only">View notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </button>
                
                <div className="ml-3 relative flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    US
                  </div>
                  <span className={`hidden md:block ml-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>User</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <div className={`w-64 ${navBgClass} shadow-sm border-r ${borderClass} hidden md:block overflow-y-auto`}>
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <div className="px-4 mb-6">
                <h2 className={`text-xs font-semibold ${subTextClass} uppercase tracking-wider`}>
                  Menu
                </h2>
              </div>
              <nav className="mt-1 flex-1 px-2 space-y-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all ${
                        active
                          ? `${activeNavBg} ${activeTextColor}`
                          : `${inactiveTextColor} ${hoverBgClass} ${hoverTextClass}`
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-colors ${
                          active ? activeIconColor : `${inactiveIconColor} ${hoverIconColor}`
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                      {active && (
                        <div className={`absolute left-0 w-1 ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'} h-8 rounded-r-md`} />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className={`p-4 border-t ${borderClass}`}>
              <div className="flex items-center">
                <div>
                  <p className={`text-sm font-medium ${textClass}`}>Finance Tracker</p>
                  <p className={`text-xs ${subTextClass}`}>v0.5.2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile sidebar */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-30 ${navBgClass} border-t ${borderClass} shadow-lg`}>
          <div className="flex justify-around">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center p-3 transition-colors ${
                    active ? activeTextColor : `${isDark ? 'text-gray-400' : 'text-gray-500'} ${hoverTextClass}`
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 ${active ? activeIconColor : ''}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Main content */}
        <main className={`flex-1 overflow-y-auto ${contentBgClass} p-6`}>
          <div className="max-w-7xl mx-auto pb-16 md:pb-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 