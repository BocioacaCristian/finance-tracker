import { Payment } from '../types/finance';
import { formatDate } from '../utils/paymentUtils';
import { CheckCircleIcon, ClockIcon, PencilSquareIcon, TrashIcon, EllipsisHorizontalIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { getProfileById } from '../utils/profileUtils';

interface PaymentCardProps {
  payment: Payment;
  onEdit: (payment: Payment) => void;
  onDelete: (id: string) => void;
  onTogglePaid: (payment: Payment) => void;
  showProfileBadge?: boolean;
}

export default function PaymentCard({ 
  payment, 
  onEdit, 
  onDelete, 
  onTogglePaid,
  showProfileBadge = false 
}: PaymentCardProps) {
  const [showActions, setShowActions] = useState(false);
  
  // Get profile if needed
  const profile = showProfileBadge ? getProfileById(payment.profileId) : undefined;
  
  // Determine the status badge styling
  const getBadgeStyles = () => {
    if (payment.isPaid) {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    
    // If there's a due date, check if it's overdue
    if (payment.dueDate) {
      const now = new Date();
      const isDue = payment.dueDate < now;
      return isDue 
        ? 'bg-red-50 text-red-700 border-red-200' 
        : 'bg-amber-50 text-amber-700 border-amber-200';
    }
    
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };
  
  // Get a human-readable status text
  const getStatusText = () => {
    if (payment.isPaid) {
      return 'Paid';
    }
    
    if (payment.dueDate) {
      const now = new Date();
      const isDue = payment.dueDate < now;
      return isDue ? 'Overdue' : 'Due';
    }
    
    return 'Unpaid';
  };
  
  // Get the category icon/color
  const getCategoryStyles = () => {
    switch (payment.category) {
      case 'RAR':
        return 'bg-blue-50 text-blue-700';
      case 'RER':
        return 'bg-purple-50 text-purple-700';
      case 'Insurance':
        return 'bg-indigo-50 text-indigo-700';
      case 'Taxes':
        return 'bg-red-50 text-red-700';
      case 'Utilities':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Get profile badge style
  const getProfileBadgeStyle = () => {
    if (!profile) return '';
    return profile.type === 'business' 
      ? 'bg-purple-50 text-purple-700 border-purple-200' 
      : 'bg-indigo-50 text-indigo-700 border-indigo-200';
  };
  
  // Get profile icon
  const getProfileIcon = () => {
    if (!profile) return null;
    return profile.type === 'business' 
      ? <BriefcaseIcon className="w-3 h-3 mr-1" /> 
      : <UserIcon className="w-3 h-3 mr-1" />;
  };
  
  // Format currency based on profile
  const currency = profile?.currency || 'RON';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          {/* Category badge */}
          <div className={`px-3 py-2 rounded-lg ${getCategoryStyles()} text-xs font-medium`}>
            {payment.category}
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-gray-900">{payment.description}</h3>
            <div className="flex items-center mt-1 space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {formatDate(payment.date)}
              </div>
              
              {payment.dueDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Due: {formatDate(payment.dueDate)}
                </div>
              )}
              
              <div className={`px-2 py-0.5 text-xs rounded-full border ${getBadgeStyles()}`}>
                {getStatusText()}
              </div>
              
              {showProfileBadge && profile && (
                <div className={`flex items-center px-2 py-0.5 text-xs rounded-full border ${getProfileBadgeStyle()}`}>
                  {getProfileIcon()}
                  {profile.name}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <p className="text-xl font-bold text-gray-900 mr-4">{payment.amount.toLocaleString()} {currency}</p>
          
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                <button 
                  onClick={() => {
                    onTogglePaid(payment);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                  Mark as {payment.isPaid ? 'unpaid' : 'paid'}
                </button>
                <button 
                  onClick={() => {
                    onEdit(payment);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <PencilSquareIcon className="h-4 w-4 mr-2 text-blue-500" />
                  Edit payment
                </button>
                <button 
                  onClick={() => {
                    onDelete(payment.id);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <TrashIcon className="h-4 w-4 mr-2 text-red-500" />
                  Delete payment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 