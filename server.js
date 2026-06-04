const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Railway volume mount path — set SUBMISSIONS_DIR env var in Railway dashboard
// Default falls back to local ./data for development
const DATA_DIR = process.env.SUBMISSIONS_DIR || path.join(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json());
app.use(express.static(__dirname));

// ── Read all submissions ──────────────────────────────────────────────────────
app.get('/api/submissions', (req, res) => {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) return res.json([]);
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading submissions:', err);
    res.status(500).json({ error: 'Failed to read submissions' });
  }
});

// ── Append a new submission ───────────────────────────────────────────────────
app.post('/api/submissions', (req, res) => {
  try {
    let existing = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      existing = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
    }
    existing.push(req.body);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2));
    res.json({ ok: true });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// ── Serve index.html for all other routes ────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🏴‍☠️  Pirates server running on port ${PORT}`);
  console.log(`📁  Submissions stored at: ${SUBMISSIONS_FILE}`);
});
