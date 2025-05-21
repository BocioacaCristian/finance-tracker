const fs = require('fs');
const path = require('path');

// Define the path to the payments data directory
const DATA_DIR = path.join(__dirname, '..', 'data', 'payments');

/**
 * Reset all payments by deleting all payment data files
 */
function resetPayments() {
  console.log('Resetting all payments...');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.log('No payments directory found. Creating one...');
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Payments directory created.');
      return;
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(DATA_DIR);
    
    // Filter to include only JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`Found ${jsonFiles.length} payment files.`);
    
    // Delete each file
    let deletedCount = 0;
    for (const file of jsonFiles) {
      const filePath = path.join(DATA_DIR, file);
      fs.unlinkSync(filePath);
      deletedCount++;
    }
    
    console.log(`Successfully deleted ${deletedCount} payment files.`);
  } catch (error) {
    console.error('Error resetting payments:', error);
    process.exit(1);
  }
}

// Run the reset function
resetPayments(); 