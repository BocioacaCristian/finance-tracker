# Release Notes - Finance Tracker v0.1.0

## Release Date
2024-10-03

## Overview
Initial release of the Finance Tracker application, providing essential features for tracking personal finances and payments. This version establishes the core functionality for managing payments, including specialized categories like RAR (Registrul Auto Roman) and RER (Revizia Extinctorului).

## Features
- Dashboard with financial summary showing paid and unpaid amounts
- Payment tracking system with support for multiple categories
- Payment management (add, edit, delete, mark as paid/unpaid)
- Filtering capabilities by payment category and status
- Settings page with preferences for currency, date format, and UI options

## Technical Implementation
- Built with Next.js, TypeScript, and Tailwind CSS
- Responsive layout suitable for both desktop and mobile devices
- Form validation using React Hook Form
- Date formatting with date-fns library
- Component-based architecture following best practices

## Known Issues
- Data persistence is currently in-memory only (will be addressed in a future release)
- Form styling may need adjustments on certain mobile devices
- No dark mode functionality implemented yet (UI only)

## Getting Started
1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Access the application at http://localhost:3000

---

For the complete list of changes, please refer to the [changelog](../CHANGELOG.md#010). 