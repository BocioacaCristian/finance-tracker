import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPayments,
  addPayment,
  setPayments
} from '@/utils/paymentUtils';
import { Payment } from '@/types/finance';
import {
  loadPaymentsFromFiles,
  savePaymentToFile
} from '@/utils/serverUtils';

// GET /api/payments - Get all payments
export async function GET() {
  try {
    // Load payments from files first to ensure sync between server and client
    const filePayments = loadPaymentsFromFiles();
    setPayments(filePayments);
    
    // Return all payments
    const payments = getAllPayments();
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Add a new payment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Handle dates properly
    const payment = {
      ...data,
      date: new Date(data.date),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };
    
    const newPayment = addPayment(payment);
    
    // Save to file
    savePaymentToFile(newPayment);
    
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
} 