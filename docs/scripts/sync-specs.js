/**
 * This script synchronizes OpenAPI specifications from a GitHub repository
 * It can be used in CI/CD pipelines or manually to keep specs up to date
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration - modify these values as needed
const GITHUB_REPO = 'ringer/ringer-oapi';
const BRANCH = 'main';
const SPECS_DIR = '../openapi';
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'openapi');

// Optional: GitHub token for private repositories
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Fetch directory listing from GitHub API
 */
async function fetchDirectoryContents(repoPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${GITHUB_REPO}/contents/${repoPath}?ref=${BRANCH}`,
      headers: {
        'User-Agent': 'OpenAPI-Sync-Script',
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API request failed: ${res.statusCode} ${data}`));
          return;
        }
        
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download a file from GitHub
 */
async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'OpenAPI-Sync-Script',
        ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${res.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Main function to sync specs
 */
async function syncSpecs() {
  console.log('Syncing OpenAPI specifications...');
  
  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Option 1: Use git directly if we're running in a git environment
    // This is useful for local development when you have both repos
    if (fs.existsSync(path.join(__dirname, '..', '..', '.git'))) {
      console.log('Using local git repository...');
      // Just ensuring the spec directory exists - we're already in the right repo
      return;
    }
    
    // Option 2: Fetch from GitHub API
    console.log('Fetching from GitHub API...');
    
    // Get top-level directories in the specs directory
    const contents = await fetchDirectoryContents(SPECS_DIR);
    
    for (const item of contents) {
      if (item.type === 'dir') {
        const categoryDir = path.join(OUTPUT_DIR, item.name);
        
        // Create category directory if it doesn't exist
        if (!fs.existsSync(categoryDir)) {
          fs.mkdirSync(categoryDir, { recursive: true });
        }
        
        // Get files in the category directory
        const categoryContents = await fetchDirectoryContents(`${SPECS_DIR}/${item.name}`);
        
        for (const file of categoryContents) {
          if (file.type === 'file' && (file.name.endsWith('.yaml') || file.name.endsWith('.yml') || file.name.endsWith('.json'))) {
            const outputPath = path.join(categoryDir, file.name);
            console.log(`Downloading ${file.path} to ${outputPath}...`);
            await downloadFile(file.download_url, outputPath);
          }
        }
      }
    }
    
    console.log('OpenAPI specifications synced successfully.');
  } catch (error) {
    console.error('Error syncing OpenAPI specifications:', error);
    process.exit(1);
  }
}

// Run the script
syncSpecs(); 