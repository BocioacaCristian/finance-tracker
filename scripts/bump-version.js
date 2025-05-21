#!/usr/bin/env node

/**
 * Version bumping script for Finance Tracker
 * 
 * Usage:
 *   node scripts/bump-version.js [major|minor|patch]
 * 
 * This script will:
 * 1. Update the version in package.json
 * 2. Update the version in VERSION file
 * 3. Add a new entry to CHANGELOG.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the version bump type from the command line arguments
const bumpType = process.argv[2] || 'patch';
if (!['major', 'minor', 'patch'].includes(bumpType)) {
  console.error('Invalid bump type. Use "major", "minor", or "patch".');
  process.exit(1);
}

// Read the current version from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Parse the version components
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Calculate the new version
let newVersion;
switch (bumpType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update VERSION file
const versionFilePath = path.join(__dirname, '..', 'VERSION');
fs.writeFileSync(versionFilePath, newVersion);

// Get the current date for the changelog
const today = new Date();
const dateStr = today.toISOString().split('T')[0];

// Prepare the changelog entry
const changelogEntry = `
## [${newVersion}] - ${dateStr}

### Added
- 

### Changed
- 

### Fixed
- 

### Removed
- 
`;

// Update the CHANGELOG.md
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');
const updatedChangelog = changelog.replace(/^# Changelog/, `# Changelog${changelogEntry}`);
fs.writeFileSync(changelogPath, updatedChangelog);

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
console.log('Please update the CHANGELOG.md with the actual changes for this version.');

// Instructions for manual updates
console.log(`
Next steps:
1. Edit CHANGELOG.md to add details about the changes
2. Commit the changes with a message like "Bump version to ${newVersion}"
3. Create a git tag: git tag v${newVersion}
4. Push the changes and tags: git push && git push --tags
`); 