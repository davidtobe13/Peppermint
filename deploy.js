// deploy.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function deploy() {
  try {
    // 1. Build TypeScript files
    console.log('Building TypeScript files...');
    await executeCommand('npm run build');

    // 2. Upload to Atlas
    console.log('Deploying to Atlas...');
    await executeCommand('atlas-app-services push');

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

deploy();