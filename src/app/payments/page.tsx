'use client';

import { useState, useEffect } from 'react';
import { Payment, PaymentFormData, PaymentCategory, Profile } from '../../types/finance';
import { 
  getPaymentsByCategory 
} from '../../utils/paymentUtils';
import {
  getAllProfiles,
  getDefaultProfile
} from '../../utils/profileUtils';
import Layout from '../../components/Layout';
import PaymentCard from '../../components/PaymentCard';
import PaymentForm from '../../components/PaymentForm';
import ProfileSelector from '../../components/ProfileSelector';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { 
  fetchPayments, 
  createPayment, 
  updatePaymentAPI, 
  deletePaymentAPI 
} from '../../services/paymentService';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<PaymentCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        const allPayments = await fetchPayments();
        setPayments(allPayments);
      } catch (error) {
        console.error('Error loading data:', error);
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

  const filteredPayments = profileFilteredPayments.filter(payment => {
    // Filter by category if not 'all'
    if (categoryFilter !== 'all' && payment.category !== categoryFilter) {
      return false;
    }
    
    // Filter by payment status if not 'all'
    if (statusFilter !== 'all') {
      const isPaid = statusFilter === 'paid';
      if (payment.isPaid !== isPaid) {
        return false;
      }
    }
    
    return true;
  });

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
  
  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
  };

  const categories: PaymentCategory[] = ['RAR', 'RER', 'Insurance', 'Taxes', 'Utilities', 'Other'];
  const selectedProfile = profiles.find(p => p.id === selectedProfileId);

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">View, add and manage all your payments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ProfileSelector 
            profiles={profiles}
            selectedProfileId={selectedProfileId}
            onProfileChange={handleProfileChange}
          />
        </div>
      </div>

      {/* Selected profile indicator */}
      {selectedProfile && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">
            Viewing <span className="text-indigo-600 font-semibold">{selectedProfile.name}</span> payments
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payments</h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Payment
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as PaymentCategory | 'all')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
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
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {filteredPayments.length > 0 ? (
              filteredPayments.map(payment => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onEdit={handleEditPayment}
                  onDelete={handleDeletePayment}
                  onTogglePaid={handleTogglePaid}
                  showProfileBadge={false}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                {selectedProfile ? `No payments found for ${selectedProfile.name}.` : 'No payments found.'}
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
} 