import { NextRequest, NextResponse } from 'next/server';
import {
  updatePayment,
  deletePayment
} from '@/utils/paymentUtils';
import { Payment } from '@/types/finance';
import {
  savePaymentToFile,
  deletePaymentFile
} from '@/utils/serverUtils';

// PUT /api/payments/[id] - Update a payment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Handle dates properly
    const payment: Payment = {
      ...data,
      id,
      date: new Date(data.date),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };
    
    const updatedPayment = updatePayment(payment);
    
    if (!updatedPayment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }
    
    // Save to file
    savePaymentToFile(updatedPayment);
    
    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}

// DELETE /api/payments/[id] - Delete a payment
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const success = deletePayment(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }
    
    // Delete file
    deletePaymentFile(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    );
  }
} 