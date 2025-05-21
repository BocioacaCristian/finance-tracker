import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, addMonths, subMonths } from 'date-fns';

interface MonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const handlePreviousMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  // Check if next month is in the future
  const isNextMonthDisabled = () => {
    const nextMonth = addMonths(currentMonth, 1);
    const today = new Date();
    return nextMonth.getMonth() > today.getMonth() || 
           nextMonth.getFullYear() > today.getFullYear();
  };

  return (
    <div className="flex items-center justify-between px-2 py-2 bg-white rounded-md shadow-sm border border-gray-200">
      <button
        onClick={handlePreviousMonth}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Previous month"
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
      </button>
      
      <h2 className="text-sm font-medium text-gray-900">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      
      <button
        onClick={handleNextMonth}
        disabled={isNextMonthDisabled()}
        className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          isNextMonthDisabled() 
            ? 'text-gray-300 cursor-not-allowed' 
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        aria-label="Next month"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
} 