# Release Notes - Finance Tracker v0.5.0

## Release Date
2025-05-21

## Overview
This major release introduces a file-based storage system for persistent payment data, eliminating the need for a database setup while providing robust data storage and retrieval capabilities.

## New Features
- **File-Based Storage**: All payments now persist between application restarts
- **JSON Storage**: Each payment stored as individual JSON file in the data directory
- **Private Data**: Storage directory git-ignored to keep financial data private
- **Server-Side Operations**: API routes for secure file operations
- **Data Reset**: Script to clear all payment data when needed

## Improvements
- **Architecture Separation**: Separated client and server code for better security
- **Error Handling**: Improved error management for data operations
- **Date Handling**: Enhanced date serialization/deserialization
- **Data Persistence**: Payments now automatically saved to disk

## Technical Details
- Created file system utilities for reading/writing JSON data
- Implemented API routes for CRUD operations on payment files
- Separated client-safe and server-only code for better architecture
- Added safeguards against filesystem access on the client

## How to Use
No changes are required to your workflow. Your payments will now automatically persist between sessions, with all storage handled transparently in the background.

## Known Issues
- None

## Upgrade Instructions
This is a drop-in upgrade that automatically migrates your existing in-memory data to the file system on first run.

## Contributors
- Development Team

---

For the complete list of changes, please refer to the [changelog](../CHANGELOG.md#050). 