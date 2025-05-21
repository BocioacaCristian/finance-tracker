import fs from 'fs';
import path from 'path';
import { Payment } from '../types/finance';

// Define the path where payment data will be stored
const DATA_DIR = path.join(process.cwd(), 'data', 'payments');

// Ensure the data directory exists
export const ensureDataDir = (): void => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (error) {
    console.error('Failed to create data directory:', error);
  }
};

// Helper function to convert payment for storage
export const serializePayment = (payment: Payment): string => {
  // Convert Date objects to ISO strings for storage
  const serializedPayment = {
    ...payment,
    date: payment.date instanceof Date ? payment.date.toISOString() : payment.date,
    dueDate: payment.dueDate instanceof Date ? payment.dueDate.toISOString() : payment.dueDate
  };
  return JSON.stringify(serializedPayment);
};

// Helper function to convert stored payment back to proper types
export const deserializePayment = (serializedData: string): Payment => {
  const data = JSON.parse(serializedData);
  return {
    ...data,
    date: new Date(data.date),
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined
  };
};

// Load all payments from file storage
export const loadPaymentsFromFiles = (): Payment[] => {
  try {
    ensureDataDir();
    
    const files = fs.readdirSync(DATA_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(DATA_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return deserializePayment(fileContent);
      });
  } catch (error) {
    console.error('Failed to load payments from files:', error);
    return [];
  }
};

// Save payment to a file
export const savePaymentToFile = (payment: Payment): void => {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${payment.id}.json`);
    fs.writeFileSync(filePath, serializePayment(payment));
  } catch (error) {
    console.error(`Failed to save payment ${payment.id}:`, error);
  }
};

// Delete payment file
export const deletePaymentFile = (id: string): void => {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Failed to delete payment file ${id}:`, error);
  }
};

// Clear all payment files
export const clearAllPaymentFiles = (): void => {
  try {
    ensureDataDir();
    const files = fs.readdirSync(DATA_DIR);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(DATA_DIR, file);
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error('Failed to clear all payment files:', error);
  }
}; 