# File-Based Storage System

The Finance Tracker application uses a file-based storage system to provide persistence for your payment data without requiring a database setup.

## Overview

Each payment in the application is stored as a separate JSON file in the `data/payments` directory. This provides several benefits:

- **Persistence**: Your data is preserved even when you restart the application
- **Privacy**: The `data/payments` directory is added to `.gitignore` so your financial data isn't stored in version control
- **Simplicity**: No database setup required
- **Transparency**: Easy to backup, view, or manipulate the raw data if needed

## How It Works

### Storage Structure

- All payment data is stored in the `data/payments` directory
- Each payment is saved as a separate JSON file
- The filename is the payment ID with a `.json` extension (e.g., `1684681234567.json`)

### Data Flow

1. **Read Operations**:
   - When the app starts or refreshes data, it reads all JSON files from the `data/payments` directory
   - Files are parsed and converted to Payment objects used by the application
   - All payments are stored in memory for quick access during the session

2. **Write Operations**:
   - When you add a new payment, a JSON file is created with a unique ID (based on timestamp)
   - When you update a payment, the corresponding JSON file is updated
   - When you delete a payment, the corresponding JSON file is removed

3. **API Interface**:
   - All file operations happen on the server side via API endpoints
   - The client never accesses the file system directly
   - This separation provides better security and error handling

## Maintenance

### Resetting All Payments

If you need to clear all payment data, run:

```bash
npm run reset-payments
```

This script will:
- Delete all payment JSON files from the `data/payments` directory
- Leave the README.md file in the directory
- Create the directory if it doesn't exist

### Backing Up Your Data

Since all payment data is stored as JSON files, you can simply copy the `data/payments` directory to backup your data.

### Troubleshooting

If you encounter issues with payment data:

1. Check that the `data/payments` directory exists
2. Verify that the files have proper JSON formatting
3. Run `npm run reset-payments` to start fresh if needed
4. Check the server logs for any file operation errors

## Implementation Details

The file-based storage system is implemented through several key components:

- `src/utils/serverUtils.ts`: Contains server-side utilities for file operations
- `src/utils/paymentUtils.ts`: Manages in-memory payment data
- `src/app/api/payments/`: API routes that handle CRUD operations
- `scripts/reset-payments.js`: Utility script for clearing payment data

These components work together to provide a seamless experience while keeping your financial data persistent and private. 