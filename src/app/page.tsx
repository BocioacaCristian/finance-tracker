'use client';

import { useState, useEffect } from 'react';
import { Payment, PaymentFormData, Profile } from '../types/finance';
import { 
  getPaymentsByStatus,
  getPaymentsByMonth
} from '../utils/paymentUtils';
import { 
  getAllProfiles,
  getDefaultProfile
} from '../utils/profileUtils';
import Layout from '../components/Layout';
import FinanceSummary from '../components/FinanceSummary';
import PaymentCard from '../components/PaymentCard';
import PaymentForm from '../components/PaymentForm';
import MonthSelector from '../components/MonthSelector';
import ProfileSelector from '../components/ProfileSelector';
import { PlusIcon, FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { 
  fetchPayments, 
  createPayment, 
  updatePaymentAPI, 
  deletePaymentAPI 
} from '../services/paymentService';

export default function Home() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | undefined>(undefined);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const loadPayments = async () => {
    setIsLoading(true);
    try {
      const allPayments = await fetchPayments();
      setPayments(allPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load data
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load profiles
        const allProfiles = getAllProfiles();
        setProfiles(allProfiles);
        
        // Set default profile
        const defaultProfile = getDefaultProfile();
        setSelectedProfileId(defaultProfile.id);
        
        // Load payments from API
        await loadPayments();
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter payments by profile first
  const profileFilteredPayments = payments.filter(
    payment => payment.profileId === selectedProfileId
  );
  
  // Filter payments by month next
  const monthFilteredPayments = profileFilteredPayments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() === selectedMonth.getMonth() && 
           paymentDate.getFullYear() === selectedMonth.getFullYear();
  });
  
  // Then filter by status
  const filteredPayments = filter === 'all' 
    ? monthFilteredPayments 
    : monthFilteredPayments.filter(payment => payment.isPaid === (filter === 'paid'));
    
  // Sort payments by date (most recent first)
  const sortedPayments = [...filteredPayments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAddPayment = async (data: PaymentFormData) => {
    setIsLoading(true);
    try {
      // Add payment through API
      const newPayment = await createPayment(data);
      setPayments(prev => [...prev, newPayment]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePayment = async (data: PaymentFormData) => {
    if (!editingPayment) return;
    
    setIsLoading(true);
    try {
      // Update payment through API
      const paymentToUpdate = {
        ...editingPayment,
        ...data,
        date: new Date(data.date),
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      };
      
      const updated = await updatePaymentAPI(paymentToUpdate);
      
      // Update the payment in local state
      setPayments(prev => prev.map(p => 
        p.id === updated.id ? updated : p
      ));
      
      setEditingPayment(undefined);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePayment = async (id: string) => {
    setIsLoading(true);
    try {
      // Delete payment through API
      await deletePaymentAPI(id);
      
      // Remove from local state
      setPayments(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const handleTogglePaid = async (payment: Payment) => {
    setIsLoading(true);
    try {
      // Update payment through API
      const paymentToUpdate = {
        ...payment,
        isPaid: !payment.isPaid
      };
      
      const updated = await updatePaymentAPI(paymentToUpdate);
      
      // Update the payment in local state
      setPayments(prev => prev.map(p => 
        p.id === updated.id ? updated : p
      ));
    } catch (error) {
      console.error('Error toggling payment status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPayment(undefined);
  };
  
  const handleRefresh = async () => {
    await loadPayments();
  };

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
  };
  
  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
  };

  // Find the selected profile name for display
  const selectedProfile = profiles.find(p => p.id === selectedProfileId);

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              An overview of your financial situation
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <ProfileSelector 
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              onProfileChange={handleProfileChange}
            />
            <button 
              onClick={handleRefresh}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Refresh
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              <PlusIcon className="h-4 w-4 mr-1.5" />
              New Payment
            </button>
          </div>
        </div>
      </div>

      {/* Selected profile indicator */}
      {selectedProfile && (
        <div className="mb-2">
          <p className="text-sm font-medium text-gray-500">
            Viewing <span className="text-indigo-600 font-semibold">{selectedProfile.name}</span> finances
          </p>
        </div>
      )}

      {/* Month selector */}
      <div className="mb-6">
        <MonthSelector currentMonth={selectedMonth} onMonthChange={handleMonthChange} />
      </div>

      <FinanceSummary payments={monthFilteredPayments} profile={selectedProfile} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-900">
            {selectedProfile?.name} Transactions for {format(selectedMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center">
            <FunnelIcon className="h-4 w-4 text-gray-500 mr-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="text-sm bg-white border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-600"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid Only</option>
            </select>
          </div>
        </div>

        {showForm && (
          <div className="mb-6">
            <PaymentForm
              initialData={editingPayment}
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              onSubmit={editingPayment ? handleUpdatePayment : handleAddPayment}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div>
            {sortedPayments.length > 0 ? (
              sortedPayments.map(payment => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onEdit={handleEditPayment}
                  onDelete={handleDeletePayment}
                  onTogglePaid={handleTogglePaid}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <PlusIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter !== 'all' 
                    ? `No ${filter} payments for ${selectedProfile?.name} in ${format(selectedMonth, 'MMMM yyyy')}. Try changing your filter.`
                    : `No payments for ${selectedProfile?.name} in ${format(selectedMonth, 'MMMM yyyy')}. Try selecting a different month or add a new payment.`}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add a new payment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
    </Layout>
  );
}
