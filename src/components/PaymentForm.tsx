import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Payment, PaymentFormData, PaymentCategory, Profile } from '../types/finance';
import { XMarkIcon, CalendarIcon, CurrencyDollarIcon, TagIcon, DocumentTextIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface PaymentFormProps {
  initialData?: Payment;
  profiles: Profile[];
  selectedProfileId: string;
  onSubmit: (data: PaymentFormData) => void;
  onCancel: () => void;
}

export default function PaymentForm({ initialData, profiles, selectedProfileId, onSubmit, onCancel }: PaymentFormProps) {
  const categories: PaymentCategory[] = ['RAR', 'RER', 'Insurance', 'Taxes', 'Utilities', 'Other'];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Dynamically calculate classes based on theme
  const formBgClass = isDark ? 'bg-gray-800' : 'bg-white';
  const formBorderClass = isDark ? 'border-gray-700' : 'border-gray-100';
  const headingClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const inputBgClass = isDark ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorderClass = isDark ? 'border-gray-600' : 'border-gray-300';
  const inputTextClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const iconClass = isDark ? 'text-gray-500' : 'text-gray-400';
  const toggleBgOffClass = isDark ? 'bg-gray-600' : 'bg-gray-200';
  const secondaryBtnBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const secondaryBtnTextClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const secondaryBtnBorderClass = isDark ? 'border-gray-600' : 'border-gray-300';
  const secondaryBtnHoverClass = isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-gray-50';
  const hintTextClass = isDark ? 'text-gray-400' : 'text-gray-500';
  
  // Convert initial data for the form if it exists
  const defaultValues = initialData ? {
    profileId: initialData.profileId,
    amount: initialData.amount,
    category: initialData.category,
    description: initialData.description,
    date: initialData.date.toISOString().split('T')[0],
    isPaid: initialData.isPaid,
    dueDate: initialData.dueDate ? initialData.dueDate.toISOString().split('T')[0] : '',
  } : {
    profileId: selectedProfileId,
    amount: 0,
    category: 'RAR' as PaymentCategory,
    description: '',
    date: new Date().toISOString().split('T')[0],
    isPaid: false,
    dueDate: '',
  };
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PaymentFormData>({
    defaultValues
  });

  const isPaid = watch('isPaid');
  const profileId = watch('profileId');
  
  const onFormSubmit = (data: PaymentFormData) => {
    onSubmit(data);
  };

  const getProfileIcon = (type: string) => {
    return type === 'business' ? 
      <BriefcaseIcon className="h-5 w-5" /> : 
      <UserIcon className="h-5 w-5" />;
  };

  return (
    <div className={`${formBgClass} rounded-xl shadow-md border ${formBorderClass} p-6 max-h-full`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${headingClass}`}>
          {initialData ? 'Edit Payment' : 'Add New Payment'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="space-y-6 overflow-visible">
          {/* Profile selection */}
          <div>
            <label htmlFor="profileId" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Profile
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                id="profileId"
                className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('profileId', { required: 'Profile is required' })}
              >
                {profiles.map(profile => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} ({profile.type})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {profileId && profiles.find(p => p.id === profileId)?.type && (
                  getProfileIcon(profiles.find(p => p.id === profileId)?.type || 'personal')
                )}
              </div>
            </div>
            {errors.profileId && 
              <p className="mt-1 text-sm text-red-600">{errors.profileId.message}</p>
            }
          </div>
          
          {/* Description field */}
          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DocumentTextIcon className={`h-5 w-5 ${iconClass}`} />
              </div>
              <input
                id="description"
                type="text"
                placeholder="Payment description"
                className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('description', { required: 'Description is required' })}
              />
            </div>
            {errors.description && 
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            }
          </div>
          
          {/* Amount field */}
          <div>
            <label htmlFor="amount" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Amount (RON)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CurrencyDollarIcon className={`h-5 w-5 ${iconClass}`} />
              </div>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('amount', { 
                  required: 'Amount is required', 
                  min: { value: 0.01, message: 'Amount must be positive' } 
                })}
              />
            </div>
            {errors.amount && 
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            }
          </div>
          
          {/* Category field */}
          <div>
            <label htmlFor="category" className={`block text-sm font-medium ${labelClass} mb-1`}>
              Category
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TagIcon className={`h-5 w-5 ${iconClass}`} />
              </div>
              <select
                id="category"
                className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                {...register('category', { required: 'Category is required' })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {errors.category && 
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            }
          </div>
          
          {/* Dates section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date field */}
            <div>
              <label htmlFor="date" className={`block text-sm font-medium ${labelClass} mb-1`}>
                Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className={`h-5 w-5 ${iconClass}`} />
                </div>
                <input
                  id="date"
                  type="date"
                  className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  {...register('date', { required: 'Date is required' })}
                />
              </div>
              {errors.date && 
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              }
            </div>
            
            {/* Due date field */}
            {!isPaid && (
              <div>
                <label htmlFor="dueDate" className={`block text-sm font-medium ${labelClass} mb-1`}>
                  Due Date
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <input
                    id="dueDate"
                    type="date"
                    className={`block w-full pl-10 py-3 ${inputTextClass} ${inputBgClass} border ${inputBorderClass} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                    {...register('dueDate')}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Payment status toggle */}
          <div className={`flex items-center space-x-2 ${cardBgClass} p-4 rounded-lg`}>
            <div className="flex-1">
              <label htmlFor="isPaid" className={`text-sm font-medium ${labelClass}`}>
                Mark as paid
              </label>
              <p className={`text-xs ${hintTextClass}`}>
                Toggle this if you've already paid this expense
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                id="isPaid"
                type="checkbox"
                className="sr-only"
                {...register('isPaid')}
              />
              <div className={`relative w-11 h-6 rounded-full transition-colors ${isPaid ? 'bg-indigo-600' : toggleBgOffClass}`}>
                <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${isPaid ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>
          
          {/* Form actions */}
          <div className={`flex justify-end space-x-3 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 text-sm font-medium ${secondaryBtnTextClass} ${secondaryBtnBgClass} border ${secondaryBtnBorderClass} rounded-md shadow-sm ${secondaryBtnHoverClass} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {initialData ? 'Update' : 'Add'} Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 