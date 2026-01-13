# daily-commit

Automated daily commit tool for maintaining GitHub contribution streaks.

## Overview

This tool automatically creates a commit to your repository every day at 6:00 AM UTC, keeping your GitHub contribution streak active without manual effort.

## Features

- Automated daily commits via GitHub Actions
- Bun.js runtime for fast execution
- Heartbeat tracking with log rotation to prevent file growth
- Idempotent execution (prevents duplicate commits)
- Manual trigger support

## Quick Start

```bash
# Clone the repository
git clone https://github.com/HuynhSang2005/daily-commit.git
cd daily-commit

# Install dependencies
bun install

# Run locally
bun run index.ts
```

## Configuration

### Schedule

Edit `.github/workflows/daily-commit.yml`:

```yaml
schedule:
  - cron: "0 6 * * *"  # Daily at 6:00 AM UTC
```

### Local Schedule

Edit `index.ts`:

```typescript
const dailyJob = baker.add({
  name: 'daily-commit',
  cron: '0 0 8 * * *', // Change to your preferred time
  callback: performDailyCommit,
});
```

## Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run index.ts` | Run the daily commit script |

## Usage

### View Heartbeat Log

```bash
cat .keepalive
```

### Manual Trigger (GitHub Actions)

1. Go to **Actions** tab
2. Select **Daily Commit** workflow
3. Click **Run workflow**

## Project Structure

```
daily-commit/
├── .github/
│   └── workflows/
│       └── daily-commit.yml     # GitHub Actions workflow
├── .keepalive                   # Heartbeat file (auto-generated)
├── index.ts                     # Main script with scheduler
├── package.json                 # Dependencies
├── bun.lock                     # Bun lock file
└── tsconfig.json               # TypeScript configuration
```

## Technologies

- [Bun.js](https://bun.sh) - JavaScript runtime
- [cronbake](https://github.com/chaqchase/cronbake) - Cron scheduler for Bun
- [GitHub Actions](https://github.com/features/actions) - CI/CD