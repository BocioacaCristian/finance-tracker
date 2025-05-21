# Release Notes - v0.5.2

## Overview

This patch release addresses persistent dark mode issues in the Finance Tracker application. It ensures that all UI components correctly respect the user's theme preference, especially form elements, inputs, and dialogs that were previously stuck in light mode.

## Key Improvements

### Dark Mode Fixes

- **Enhanced CSS Rules**: Added comprehensive dark mode overrides to ensure all elements respect theme settings
- **Dynamic Styling**: Replaced static classes with dynamic theme-based styling across components
- **Form Elements**: Fixed inputs, selects, buttons and dialogs to properly display in dark mode
- **Theme Utilities**: Created reusable theme utilities for consistent styling across the application
- **Background and Text Colors**: Fixed inconsistent color handling in dark mode for all UI elements

### Implementation Details

- Added targeted CSS rules in globals.css to properly override problematic elements
- Updated PaymentForm component with comprehensive dark mode support
- Created new theme utility functions for better theme management
- Enhanced the Layout component to use centralized theme classes
- Fixed specific issues with form inputs displaying incorrectly in dark mode

## Upgrading

This is a drop-in replacement with no breaking changes. Simply update to version 0.5.2 to benefit from the improved dark mode support.

## Known Issues

No known issues.

## Contributors

- Developer Team
