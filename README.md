# Finance Tracker

![Version](https://img.shields.io/badge/version-0.5.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive finance tracking application that helps you manage your payments and expenses, including specific categories like Registrul Auto Roman (RAR), Revizia Extinctorului (RER), insurance, taxes, and more.

## Features

- **Dashboard Overview**: Get a quick summary of your financial situation
- **Payment Management**: Track, add, edit, and delete payments
- **Category-based Organization**: Organize expenses by predefined categories
- **Status Tracking**: Monitor paid and unpaid expenses
- **Settings and Preferences**: Customize the application to your needs
- **Responsive Design**: Works on both desktop and mobile devices
- **Analytics Dashboard**: Visualize your spending patterns and trends
- **Month-based Navigation**: View and manage finances by month
- **Profile Management**: Separate personal and business finances
- **File-based Storage**: Persistent data storage without database setup

## Screenshot

![Finance Tracker Screenshot](https://via.placeholder.com/800x450.png?text=Finance+Tracker+Dashboard)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to access the application

## Usage

- **Dashboard**: View your financial overview and recent payments
- **Profile Selection**: Switch between personal and business finances
- **Month Navigation**: Use the month selector to view finances for specific months
- **Payments**: Add new payments, edit existing ones, and filter by category or status
- **Analytics**: Visualize your spending patterns and financial trends
- **Settings**: Configure application preferences and manage your data

## Data Storage

This application uses a file-based storage system to save your payment data:

- All payments are stored as individual JSON files in the `data/payments` directory
- Your data persists between application restarts
- The storage directory is git-ignored to keep your financial data private
- No database setup required

For more details, see the [File Storage Documentation](docs/file-storage.md).

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For styling and responsive design
- **React Hook Form**: For form management
- **Date-fns**: For date formatting and manipulation
- **Heroicons**: For beautiful icons

## Versioning

This project follows [Semantic Versioning](https://semver.org/). For the versions available, see the [CHANGELOG.md](CHANGELOG.md) file or the [tags on this repository](https://github.com/yourusername/finance-tracker/tags).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) for hosting and deployment
