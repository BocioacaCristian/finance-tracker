import { BanknotesIcon, ClockIcon, CheckIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import { Payment, Profile } from '../types/finance';

interface FinanceSummaryProps {
  payments: Payment[];
  profile?: Profile;
}

export default function FinanceSummary({ payments, profile }: FinanceSummaryProps) {
  const totalPaid = payments
    .filter(payment => payment.isPaid)
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalDue = payments
    .filter(payment => !payment.isPaid)
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const paidCount = payments.filter(payment => payment.isPaid).length;
  const unpaidCount = payments.filter(payment => !payment.isPaid).length;
  
  // Calculate total
  const total = totalPaid + totalDue;
  
  // Calculate percentages for visualization
  const paidPercentage = total > 0 ? Math.round((totalPaid / total) * 100) : 0;
  const duePercentage = 100 - paidPercentage;

  // Mock data for month-over-month comparison
  const previousMonthPaid = totalPaid * 0.85; // Simulate 15% increase from last month
  const paidChange = totalPaid - previousMonthPaid;
  const paidChangePercentage = Math.round((paidChange / previousMonthPaid) * 100);
  
  // Profile icon based on type
  const getProfileIcon = () => {
    if (!profile) return <BanknotesIcon className="h-6 w-6 text-indigo-600" />;
    
    return profile.type === 'business' ? 
      <BriefcaseIcon className="h-6 w-6 text-purple-600" /> : 
      <UserIcon className="h-6 w-6 text-indigo-600" />;
  };
  
  // Currency display
  const currency = profile?.currency || 'RON';
  
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-700 mb-6">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total summary card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{total.toLocaleString()} {currency}</p>
            </div>
            <div className="p-2 rounded-lg bg-indigo-50">
              {getProfileIcon()}
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
          </div>
          
          <div className="flex justify-between text-xs mt-2">
            <div>
              <span className="text-gray-500">Paid: </span>
              <span className="font-medium text-gray-700">{paidPercentage}%</span>
            </div>
            <div>
              <span className="text-gray-500">Due: </span>
              <span className="font-medium text-gray-700">{duePercentage}%</span>
            </div>
          </div>
        </div>
        
        {/* Paid card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalPaid.toLocaleString()} {currency}</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center mt-3">
            {paidChangePercentage > 0 ? (
              <>
                <ArrowTrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs font-medium text-green-600">{paidChangePercentage}% from last month</span>
              </>
            ) : (
              <>
                <ArrowTrendingDownIcon className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-xs font-medium text-red-600">{Math.abs(paidChangePercentage)}% from last month</span>
              </>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-baseline">
            <div className="text-sm">
              <span className="text-gray-500">Payments: </span>
              <span className="font-medium text-gray-700">{paidCount}</span>
            </div>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-500">
              View all
            </button>
          </div>
        </div>
        
        {/* Due card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Due</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalDue.toLocaleString()} {currency}</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50">
              <ClockIcon className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          
          {unpaidCount > 0 ? (
            <div className="px-3 py-2 bg-amber-50 rounded-lg text-xs text-amber-800 mt-3">
              You have {unpaidCount} pending payment{unpaidCount !== 1 ? 's' : ''} due
            </div>
          ) : (
            <div className="px-3 py-2 bg-green-50 rounded-lg text-xs text-green-800 mt-3">
              No pending payments due
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-baseline">
            <div className="text-sm">
              <span className="text-gray-500">Next due: </span>
              <span className="font-medium text-gray-700">
                {unpaidCount > 0 ? 'Oct 15, 2024' : 'N/A'}
              </span>
            </div>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-500">
              View all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 