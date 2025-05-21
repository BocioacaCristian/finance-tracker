import { Payment, PaymentFormData } from '@/types/finance';

// Base URL for API
const API_URL = '/api/payments';

// Get all payments
export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  
  return response.json();
};

// Add a new payment
export const createPayment = async (payment: PaymentFormData): Promise<Payment> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create payment');
  }
  
  return response.json();
};

// Update a payment
export const updatePaymentAPI = async (payment: Payment): Promise<Payment> => {
  const response = await fetch(`${API_URL}/${payment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update payment');
  }
  
  return response.json();
};

// Delete a payment
export const deletePaymentAPI = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete payment');
  }
};

// Clear all payments
export const clearAllPaymentsAPI = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/clear`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to clear payments');
  }
}; 