# Release Notes - Finance Tracker v0.5.1

## Release Date
2025-05-22

## Overview
This maintenance release addresses several UI/UX issues and a TypeScript error, enhancing the overall user experience and stability of the application.

## Bug Fixes
- **Layout Structure**: Fixed UI bug causing double scrollbars in the application layout
- **Form Rendering**: Resolved dark areas appearing when adding new payments
- **CSS Improvements**: Updated Layout.tsx to use proper flex column structure and height constraints
- **Scrolling Behavior**: Modified CSS in globals.css to prevent nested scrollbar issues
- **Form Responsiveness**: Improved PaymentForm with appropriate max-height and overflow handling
- **Styling Consistency**: Set explicit light mode in root layout to ensure consistent styling
- **Profile Selector**: Fixed TypeScript error in ProfileSelector component related to undefined selectedProfile

## Upgrade Instructions
This release contains only bug fixes and should be a drop-in replacement for v0.5.0. No data migration or special upgrade steps are required.

## Contributors
- Development Team

---

For the complete list of changes, please refer to the [changelog](../CHANGELOG.md#051). 