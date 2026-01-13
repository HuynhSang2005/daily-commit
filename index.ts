import Baker from 'cronbake';
import { execSync } from 'child_process';
import { readFileSync, appendFileSync, existsSync } from 'fs';

const DATE_FORMAT = 'yyyy-MM-dd';
const HEARTBEAT_FILE = '.keepalive';

/**
 * Get formatted date string
 */
function getFormattedDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Perform the daily commit operation
 */
function performDailyCommit(): void {
  const today = getFormattedDate();
  const timestamp = new Date().toISOString();
  
  console.log(`🚀 Starting daily commit for ${today}...`);
  console.log(`📅 Timestamp: ${timestamp}`);

  try {
    // Create or update heartbeat file
    const heartbeatContent = `[${timestamp}] Daily heartbeat - ${today}\n`;
    
    if (existsSync(HEARTBEAT_FILE)) {
      const existingContent = readFileSync(HEARTBEAT_FILE, 'utf-8');
      // Check if already committed today
      if (existingContent.includes(today)) {
        console.log('✅ Already committed today, skipping...');
        return;
      }
    }
    
    appendFileSync(HEARTBEAT_FILE, heartbeatContent);
    console.log(`📝 Updated ${HEARTBEAT_FILE}`);
    
    // Configure git user (required for commits in CI/CD)
    execSync('git config user.name "GitHub Actions"', { encoding: 'utf-8' });
    execSync('git config user.email "actions@github.com"', { encoding: 'utf-8' });
    
    // Stage the changes
    execSync(`git add ${HEARTBEAT_FILE}`, { encoding: 'utf-8' });
    console.log('📦 Staged changes');
    
    // Create commit
    execSync(`git commit -m "chore: daily heartbeat ${today}"`, { encoding: 'utf-8' });
    console.log('✅ Committed changes');
    
    // Push to remote
    execSync('git push', { encoding: 'utf-8' });
    console.log('🚀 Pushed to remote');
    
    console.log(`✨ Daily commit completed successfully!`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error during daily commit: ${errorMessage}`);
    process.exit(1);
  }
}

// Main execution
console.log('🔧 Daily Commit Tool initialized');
console.log('⏰ Using cronbake scheduler');

// For GitHub Actions, we run immediately
// For local execution, we schedule daily at 6 AM
const baker = Baker.create();

const dailyJob = baker.add({
  name: 'daily-commit',
  cron: '0 0 6 * * *', // Run every day at 6:00 AM (second minute hour day month day-of-week)
  callback: performDailyCommit,
});

console.log(`📅 Scheduled daily commit at 6:00 AM`);

// Run immediately once
console.log('▶️ Running initial commit...');
performDailyCommit();

// Start the scheduler
baker.bakeAll();
console.log('🟢 Scheduler started. Tool is now running.');