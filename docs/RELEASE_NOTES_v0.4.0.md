# Release Notes - Finance Tracker v0.4.0

## Release Date
2024-10-06

## Overview
This release adds profile management capabilities to separate personal and business finances, allowing users to track and manage different financial contexts independently.

## New Features
- **Multiple Profiles**: Support for personal and business financial profiles
- **Profile Selector**: Easy switching between different financial profiles
- **Profile-Specific Data**: All financial data is now scoped to the active profile
- **Visual Differentiation**: Profile-specific styling and indicators
- **Currency Support**: Different currency settings per profile
- **Contextual Analytics**: Financial summaries specific to each profile

## Improvements
- **Profile Selection**: Intuitive dropdown menu for profile switching
- **Profile Indicators**: Clear visual feedback showing which profile is active
- **Profile-Specific Forms**: Payment forms now include profile selection
- **Business vs Personal**: Distinct styling for business and personal profiles
- **Financial Isolation**: Complete separation of financial data between profiles
- **Profile Context**: Active profile context clearly indicated throughout the app

## Technical Details
- New profile data model and management utilities
- Updated payment model to include profile associations
- Profile-scoped financial calculations and filtering
- Integration of profile context throughout the component hierarchy

## How to Use
1. Use the profile selector in the top right of the dashboard to switch between profiles
2. All financial data, including payments and statistics, will update to reflect the selected profile
3. When adding a new payment, you can select which profile it belongs to
4. Financial summaries will show data specific to the active profile

## Known Issues
- None

---

For the complete list of changes, please refer to the [changelog](../CHANGELOG.md#040). 