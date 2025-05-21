export type PaymentCategory = 
  | 'RAR' // Registrul Auto Roman
  | 'RER' // Revizia Extinctorului
  | 'Insurance'
  | 'Taxes'
  | 'Utilities'
  | 'Other';

export type ProfileType = 'personal' | 'business';

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
  currency: string;
  isDefault?: boolean;
}

export interface Payment {
  id: string;
  profileId: string; // Reference to which profile this payment belongs to
  amount: number;
  category: PaymentCategory;
  description: string;
  date: Date;
  isPaid: boolean;
  dueDate?: Date;
  receipt?: string; // URL or file path to receipt image
}

export interface PaymentFormData {
  profileId: string;
  amount: number;
  category: PaymentCategory;
  description: string;
  date: string;
  isPaid: boolean;
  dueDate?: string;
} 