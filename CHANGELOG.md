# Changelog

## [0.5.1] - 2025-05-22

### Fixed
- Fixed UI bug causing double scrollbars in the application layout
- Resolved dark areas appearing when adding new payments
- Updated Layout.tsx to use proper flex column structure and height constraints
- Modified CSS in globals.css to prevent nested scrollbar issues
- Improved PaymentForm with appropriate max-height and overflow handling
- Set explicit light mode in root layout to ensure consistent styling
- Fixed TypeScript error in ProfileSelector component related to undefined selectedProfile

## [0.5.0] - 2025-05-21

### Added
- File-based storage system for payments
- Persistent payment data across application restarts
- Data directory with JSON storage for each payment
- Git-ignored storage to keep financial data private
- API routes for server-side file operations
- Reset script to clear all payment data

### Changed
- Separated client and server code for better security and performance
- Updated payment utilities to work with file-based storage
- Improved error handling for data operations
- Enhanced date handling for serialization/deserialization

### Fixed
- Fixed module import errors related to filesystem access
- Resolved client-side loading of server-only modules

### Removed
- Removed hard-coded sample payment data

All notable changes to the Finance Tracker project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2024-10-06

### Added
- Profile management to separate personal and business finances
- Profile selector dropdown in dashboard header
- Profile-specific financial data and statistics
- Profile badges on payment cards for better visibility
- Support for different currencies per profile
- Profile selection in payment form when adding/editing payments

### Changed
- Dashboard now shows focused data for selected profile
- Financial summary displays profile-specific statistics
- Payment management functions updated to work with profiles
- Improved UI feedback for active profile context

## [0.3.0] - 2024-10-05

### Added
- Month-based payment filtering and navigation
- Month selector component for viewing transactions by specific month
- Support for historical financial data by month and year
- Monthly financial summary statistics
- Expanded sample data to demonstrate monthly filtering

### Changed
- Dashboard now shows focused data for selected month
- Financial overview now displays month-specific statistics
- Improved empty state messaging for month-specific views
- Updated version display across the application

## [0.2.0] - 2024-10-04

### Added
- New Analytics page with financial insights and data visualizations
- Visual charts for expense trends and category breakdowns
- Loading state animations throughout the application

### Changed
- Complete UI redesign for a more professional appearance
- Enhanced navigation with active state indicators and mobile support
- Improved card components with modern styling and better information hierarchy
- Redesigned dashboard with better financial summary display
- Updated payment cards with category badges and dropdown menus
- Enhanced form inputs with icons and more intuitive controls
- More sophisticated color palette with purpose-driven color coding
- Improved typography and spacing throughout the application

### Fixed
- Inconsistent styling between components
- Improved mobile responsiveness throughout the app

## [0.1.0] - 2024-10-03

### Added
- Initial application structure using Next.js, TypeScript, and Tailwind CSS
- Dashboard with financial overview and summary statistics
- Payment tracking system with support for:
  - RAR (Registrul Auto Roman) payments
  - RER (Revizia Extinctorului) payments 
  - Insurance payments
  - Taxes
  - Utilities
  - Other payment categories
- Payment management features:
  - Add new payments
  - Edit existing payments 
  - Delete payments
  - Mark payments as paid/unpaid
  - Filter payments by category and status
- Settings page with:
  - Currency preferences (RON, EUR, USD)
  - Date format options
  - UI preferences
  - Data import/export options
- Responsive layout with sidebar navigation 