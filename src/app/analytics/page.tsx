'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getAllPayments, getPaymentsByMonth } from '../../utils/paymentUtils';
import { getAllProfiles, getDefaultProfile } from '../../utils/profileUtils';
import { Payment, PaymentCategory, Profile } from '../../types/finance';
import ProfileSelector from '../../components/ProfileSelector';
import { 
  ChartBarIcon, 
  ArrowDownIcon, 
  ArrowUpIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Load profiles
      const allProfiles = getAllProfiles();
      setProfiles(allProfiles);
      
      // Set default profile
      const defaultProfile = getDefaultProfile();
      setSelectedProfileId(defaultProfile.id);
      
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
      setPayments(getAllPayments());
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter payments by profile
  const profileFilteredPayments = payments.filter(
    payment => payment.profileId === selectedProfileId
  );
  
  // Calculate summary data
  const totalAmount = profileFilteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = profileFilteredPayments.filter(p => p.isPaid).reduce((sum, p) => sum + p.amount, 0);
  const unpaidAmount = totalAmount - paidAmount;
  const paidPercentage = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;
  
  // Calculate spending by category
  const categoryTotals = profileFilteredPayments.reduce((acc, payment) => {
    const category = payment.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += payment.amount;
    return acc;
  }, {} as Record<PaymentCategory, number>);
  
  // Sort categories by total amount
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category as PaymentCategory);
    
  // Calculate max value for the chart scaling
  const maxCategoryValue = Math.max(...Object.values(categoryTotals), 1); // Ensure at least 1 to avoid division by zero
  
  // Mock monthly data for trends (in a real app, this would come from the database)
  const monthlyData = [
    { month: 'Jan', amount: 2100 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2400 },
    { month: 'Apr', amount: 1500 },
    { month: 'May', amount: 1900 },
    { month: 'Jun', amount: 2700 },
  ];
  
  // Calculate trend percentage (mock data)
  const currentMonth = monthlyData[monthlyData.length - 1].amount;
  const previousMonth = monthlyData[monthlyData.length - 2].amount;
  const trendPercentage = Math.round(((currentMonth - previousMonth) / previousMonth) * 100);
  
  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
  };
  
  const selectedProfile = profiles.find(p => p.id === selectedProfileId);
  const currency = selectedProfile?.currency || 'RON';
  
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Detailed insights into your financial patterns
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <ProfileSelector 
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              onProfileChange={handleProfileChange}
            />
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as 'month' | 'quarter' | 'year')}
                className="text-sm bg-white border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-600"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected profile indicator */}
      {selectedProfile && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">
            Viewing <span className="text-indigo-600 font-semibold">{selectedProfile.name}</span> analytics
          </p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total expenses card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-indigo-50 mr-4">
                  <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{totalAmount.toLocaleString()} {currency}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {trendPercentage > 0 ? (
                  <>
                    <ArrowUpIcon className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-xs font-medium text-red-600">{trendPercentage}% from last month</span>
                  </>
                ) : (
                  <>
                    <ArrowDownIcon className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs font-medium text-green-600">{Math.abs(trendPercentage)}% from last month</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Payment ratio card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-medium text-gray-500">Payment Ratio</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-bold text-gray-900">{paidPercentage}%</p>
                <span className="ml-2 text-sm text-gray-500">paid</span>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
                </div>
                
                <div className="flex justify-between text-xs mt-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mr-1"></div>
                    <span>Paid: {paidAmount.toLocaleString()} {currency}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                    <span>Unpaid: {unpaidAmount.toLocaleString()} {currency}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Average expense card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-medium text-gray-500">Average Expense</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {profileFilteredPayments.length > 0 
                  ? Math.round(totalAmount / profileFilteredPayments.length).toLocaleString() 
                  : 0} {currency}
              </p>
              
              <div className="mt-4">
                <p className="text-xs text-gray-500">Based on {profileFilteredPayments.length} expenses</p>
                <p className="text-xs text-gray-500 mt-1">Period: {timeframe === 'month' ? 'Last 30 days' : timeframe === 'quarter' ? 'Last 90 days' : 'Last 365 days'}</p>
              </div>
            </div>
          </div>
          
          {/* Charts section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Spending by category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-medium text-gray-900 mb-6">Spending by Category</h3>
              
              <div className="space-y-4">
                {sortedCategories.length > 0 ? (
                  sortedCategories.map(category => {
                    const amount = categoryTotals[category];
                    const percentage = Math.round((amount / totalAmount) * 100);
                    
                    // Determine color based on category
                    let barColor;
                    switch(category) {
                      case 'RAR': barColor = 'bg-blue-500'; break;
                      case 'RER': barColor = 'bg-purple-500'; break;
                      case 'Insurance': barColor = 'bg-indigo-500'; break;
                      case 'Taxes': barColor = 'bg-red-500'; break;
                      case 'Utilities': barColor = 'bg-teal-500'; break;
                      default: barColor = 'bg-gray-500';
                    }
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-gray-700">{category}</p>
                          <div className="flex items-baseline">
                            <span className="text-sm font-medium text-gray-900">{amount.toLocaleString()} {currency}</span>
                            <span className="ml-2 text-xs text-gray-500">({percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`${barColor} h-2 rounded-full`} 
                            style={{ width: `${(amount / maxCategoryValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 py-4">No data available for {selectedProfile?.name || 'selected profile'}</p>
                )}
              </div>
            </div>
            
            {/* Monthly trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-medium text-gray-900 mb-6">Monthly Expense Trend</h3>
              
              <div className="flex items-end h-48 space-x-2">
                {monthlyData.map((item, index) => {
                  const maxAmount = Math.max(...monthlyData.map(d => d.amount));
                  const height = (item.amount / maxAmount) * 100;
                  const isLastMonth = index === monthlyData.length - 1;
                  
                  return (
                    <div key={item.month} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full rounded-t-md ${isLastMonth ? 'bg-indigo-500' : 'bg-indigo-200'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Current month:</p>
                  <p className="text-sm font-medium text-gray-900">{currentMonth.toLocaleString()} {currency}</p>
                </div>
                
                <div className="flex items-center mt-1">
                  {trendPercentage > 0 ? (
                    <>
                      <ArrowUpIcon className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-xs font-medium text-red-600">{trendPercentage}% increase from previous month</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownIcon className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs font-medium text-green-600">{Math.abs(trendPercentage)}% decrease from previous month</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
} 