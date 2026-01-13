# daily-commit

Auto-commit tool for maintaining GitHub commit streaks using **Bun.js** + **GitHub Actions** + **cronbake**.

## ✨ Features

- 🚀 **Automated Daily Commits**: Automatically commits to your repository every day
- ⏰ **Scheduled Execution**: Runs at 6:00 AM UTC daily via GitHub Actions
- 🔧 **Bun.js Powered**: Uses Bun runtime for fast execution
- 📅 **Heartbeat Tracking**: Maintains `.keepalive` file with timestamps
- 🔄 **Git Integration**: Handles git add, commit, and push automatically
- 🛡️ **Idempotent**: Won't create duplicate commits on the same day

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Checkout code                                   │   │
│  │  2. Setup Bun (oven-sh/setup-bun@v2)               │   │
│  │  3. bun install                                    │   │
│  │  4. bun run index.ts (cronbake scheduler)          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
daily-commit/
├── .github/
│   └── workflows/
│       └── daily-commit.yml     # GitHub Actions workflow
├── .keepalive                   # Heartbeat file (auto-generated)
├── index.ts                     # Main script with cronbake scheduler
├── package.json                 # Dependencies (cronbake)
├── bun.lock                     # Bun lock file
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- GitHub account
- Git repository

### Installation

1. **Clone or create this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/daily-commit.git
   cd daily-commit
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Test locally**
   ```bash
   bun run index.ts
   ```

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial setup"
   git push
   ```

## ⚙️ Configuration

### GitHub Actions Schedule

Edit `.github/workflows/daily-commit.yml` to change the schedule:

```yaml
schedule:
  - cron: "0 6 * * *"  # Every day at 6:00 AM UTC
```

**Cron format** (6 fields for cronbake):
```
second minute hour day month day-of-week
0 0 6 * * * = 6:00 AM every day
```

### Local Execution Time

Edit `index.ts` to change the scheduler:

```typescript
const dailyJob = baker.add({
  name: 'daily-commit',
  cron: '0 0 8 * * *', // Change to 8:00 AM
  callback: performDailyCommit,
});
```

## 📖 Usage

### Manual Trigger (Local)

```bash
bun run index.ts
```

### Manual Trigger (GitHub Actions)

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select **Daily Commit** workflow
4. Click **Run workflow**

### View Heartbeat Log

```bash
cat .keepalive
```

### Check Commit History

```bash
git log --oneline
```

## 🛠️ Technologies

- **Runtime**: [Bun.js](https://bun.sh) v1.3.5+
- **Scheduler**: [cronbake](https://github.com/chaqchase/cronbake) v0.4.0+
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Language**: TypeScript

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run index.ts` | Run the daily commit script |
| `bun run build` | Build the project (if configured) |

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT License

## 🙏 Acknowledgments

- [cronbake](https://github.com/chaqchase/cronbake) - Powerful cron job manager for Bun
- [setup-bun](https://github.com/oven-sh/setup-bun) - Official GitHub Action for Bun