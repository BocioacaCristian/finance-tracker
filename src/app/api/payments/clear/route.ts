import { NextResponse } from 'next/server';
import { clearAllPayments } from '@/utils/paymentUtils';
import { clearAllPaymentFiles } from '@/utils/serverUtils';

// POST /api/payments/clear - Clear all payments
export async function POST() {
  try {
    // Clear in-memory payments
    clearAllPayments();
    
    // Clear payment files
    clearAllPaymentFiles();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing payments:', error);
    return NextResponse.json(
      { error: 'Failed to clear payments' },
      { status: 500 }
    );
  }
} 