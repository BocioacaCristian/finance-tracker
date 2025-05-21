'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  forceReset: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light theme
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  
  // Function to manually set theme and ensure all necessary side effects happen
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Directly update document class for immediate effect
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Update localStorage
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error setting theme in localStorage:', error);
    }
  };
  
  // Force reset to light mode
  const forceReset = () => {
    document.documentElement.className = 'light';
    setThemeState('light');
    try {
      localStorage.setItem('theme', 'light');
    } catch (error) {
      console.error('Error resetting theme in localStorage:', error);
    }
  };
  
  // Initialize theme from both localStorage and current HTML class
  useEffect(() => {
    try {
      // Check if the HTML already has a class
      const isDarkMode = document.documentElement.classList.contains('dark');
      const savedTheme = localStorage.getItem('theme') as Theme;
      
      // If HTML is dark or localStorage says dark, set to dark
      if (isDarkMode || savedTheme === 'dark') {
        setThemeState('dark');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        // Otherwise ensure we're in light mode
        setThemeState('light');
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Default to light mode on error
      setThemeState('light');
      document.documentElement.className = 'light';
    }
    
    setMounted(true);
    
    // Cleanup function
    return () => {
      document.documentElement.className = 'light';
    };
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, forceReset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 