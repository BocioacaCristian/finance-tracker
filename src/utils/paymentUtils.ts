import { Payment, PaymentCategory } from '../types/finance';
import { format, parseISO, isSameMonth, isSameYear } from 'date-fns';

// Get current date
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Create date for a specific month in current year
const createDate = (month: number, day: number) => {
  return new Date(currentYear, month, day);
};

// Create date for previous year
const createPrevYearDate = (month: number, day: number) => {
  return new Date(currentYear - 1, month, day);
};

// In-memory cache of payments
let payments: Payment[] = [];

// Get all payments
export const getAllPayments = (): Payment[] => {
  return [...payments];
};

// Get payments by profile
export const getPaymentsByProfile = (profileId: string): Payment[] => {
  return payments.filter(payment => payment.profileId === profileId);
};

// Get payments by category
export const getPaymentsByCategory = (category: PaymentCategory, profileId?: string): Payment[] => {
  let filteredPayments = payments.filter(payment => payment.category === category);
  
  if (profileId) {
    filteredPayments = filteredPayments.filter(payment => payment.profileId === profileId);
  }
  
  return filteredPayments;
};

// Get payments by paid status
export const getPaymentsByStatus = (isPaid: boolean, profileId?: string): Payment[] => {
  let filteredPayments = payments.filter(payment => payment.isPaid === isPaid);
  
  if (profileId) {
    filteredPayments = filteredPayments.filter(payment => payment.profileId === profileId);
  }
  
  return filteredPayments;
};

// Get payments by month and year
export const getPaymentsByMonth = (month: Date, profileId?: string): Payment[] => {
  let filteredPayments = payments.filter(payment => 
    isSameMonth(payment.date, month) && isSameYear(payment.date, month)
  );
  
  if (profileId) {
    filteredPayments = filteredPayments.filter(payment => payment.profileId === profileId);
  }
  
  return filteredPayments;
};

// Add a new payment
export const addPayment = (payment: Omit<Payment, 'id'>): Payment => {
  const newPayment = {
    ...payment,
    id: Date.now().toString(),
  };
  
  payments = [...payments, newPayment];
  return newPayment;
};

// Update an existing payment
export const updatePayment = (updatedPayment: Payment): Payment | null => {
  const index = payments.findIndex(p => p.id === updatedPayment.id);
  if (index === -1) return null;
  
  payments[index] = updatedPayment;
  return updatedPayment;
};

// Delete a payment
export const deletePayment = (id: string): boolean => {
  const initialLength = payments.length;
  payments = payments.filter(payment => payment.id !== id);
  return payments.length < initialLength;
};

// Clear all payments
export const clearAllPayments = (): void => {
  payments = [];
};

// Set payments (used by API routes to update the memory cache)
export const setPayments = (newPayments: Payment[]): void => {
  payments = [...newPayments];
};

// Format date for display
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'PPP');
  }
  return format(date, 'PPP');
};

// Calculate total amount paid
export const calculateTotalPaid = (paymentsToCalculate: Payment[] = payments): number => {
  return paymentsToCalculate
    .filter(payment => payment.isPaid)
    .reduce((sum, payment) => sum + payment.amount, 0);
};

// Calculate total amount due
export const calculateTotalDue = (paymentsToCalculate: Payment[] = payments): number => {
  return paymentsToCalculate
    .filter(payment => !payment.isPaid)
    .reduce((sum, payment) => sum + payment.amount, 0);
}; 