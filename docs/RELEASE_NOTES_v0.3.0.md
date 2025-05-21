# Release Notes - Finance Tracker v0.3.0

## Release Date
2024-10-05

## Overview
This release adds month-based navigation and filtering to provide better organization and visibility of financial data across different time periods.

## New Features
- **Month Navigation**: Added intuitive month selector to navigate between different months
- **Month-Specific Data**: Dashboard now shows transactions specific to the selected month
- **Historical Data Support**: View and compare data across different months and years
- **Contextual Empty States**: Improved empty state messaging that references the selected month
- **Monthly Financial Summary**: Financial overview now reflects data for the selected month

## Improvements
- **Data Organization**: Better organization of financial data by time period
- **User Experience**: More intuitive navigation between time periods
- **Data Context**: Clearer indication of which time period is being viewed
- **Sample Data**: Expanded sample data to demonstrate the month filtering capability
- **Version Indicators**: Updated version display throughout the application

## Technical Details
- Implementation of date-based filtering using `date-fns` library
- Added utility functions for month-based data filtering
- Created reusable `MonthSelector` component
- Updated financial calculations to work with filtered monthly data sets

## How to Use
1. On the Dashboard, use the month selector at the top to navigate between months
2. Use the left/right arrows to move to previous or next months
3. The financial summary and transaction list will update to show data for the selected month
4. Use the additional filters (All/Paid/Unpaid) in combination with month selection for more specific views

## Known Issues
- None

---

For the complete list of changes, please refer to the [changelog](../CHANGELOG.md#030). 