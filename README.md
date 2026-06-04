# 🏴‍☠️ Pirates RL Assignment — Railway Deployment

## Project structure

```
pirates-app/
├── index.html       ← the full assignment UI
├── server.js        ← Express API + static file server
├── package.json
├── railway.toml
└── data/            ← created automatically (gitignored)
    └── submissions.json
```

---

## Deploy to Railway

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create pirates-assignment --private --push --source=.
# or: git remote add origin <your-repo-url> && git push -u origin main
```

### 2. Create Railway project
1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Select your repo — Railway auto-detects Node.js via `package.json`

### 3. Add a Volume (persistent storage)
1. In your Railway service, go to **Settings → Volumes**
2. Click **Add Volume**
3. Set **Mount Path** to `/data`
4. Click **Deploy**

### 4. Set the environment variable
In Railway → your service → **Variables**, add:
```
SUBMISSIONS_DIR=/data
```

That's it. Railway will:
- Run `npm start` → `node server.js`
- Mount the volume at `/data`
- Persist `submissions.json` across deploys and restarts

---

## Local development
```bash
npm install
npm start
# open http://localhost:3000
```
Submissions are saved to `./data/submissions.json` locally.

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/submissions` | Returns all submissions as JSON array |
| `POST` | `/api/submissions` | Appends one submission (JSON body) |
| `GET` | `/*` | Serves `index.html` |

---

## Mentor access
- URL: `https://your-app.railway.app`
- Click **Mentor Access** (bottom-right corner)
- Password: `mentors2026`
