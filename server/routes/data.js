import { Router } from 'express';
import { getDb } from '../db/seed.js';

const router = Router();

const TABLES = ['progress', 'flashcard_progress', 'quiz_results', 'interview_transcripts'];

// GET /api/data/export — Export all user data as JSON
router.get('/export', (req, res) => {
  try {
    const db = getDb();
    const data = {};
    for (const table of TABLES) {
      data[table] = db.prepare(`SELECT * FROM ${table}`).all();
    }
    res.json({
      version: 1,
      exportedAt: new Date().toISOString(),
      data,
    });
  } catch (error) {
    console.error('Export error:', error.message);
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/data/import — Import user data from JSON (replaces all existing data)
router.post('/import', (req, res) => {
  const db = getDb();
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing data field' });
  }

  const counts = {};

  try {
    const importAll = db.transaction(() => {
      // Delete all existing rows
      for (const table of TABLES) {
        db.prepare(`DELETE FROM ${table}`).run();
      }

      // Insert uploaded rows
      for (const table of TABLES) {
        const rows = data[table] || [];
        counts[table] = rows.length;

        for (const row of rows) {
          const columns = Object.keys(row);
          const placeholders = columns.map(() => '?').join(', ');
          const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
          db.prepare(sql).run(...columns.map((col) => row[col]));
        }
      }
    });

    importAll();
    res.json({ success: true, counts });
  } catch (error) {
    console.error('Import error:', error.message);
    res.status(500).json({ error: 'Import failed' });
  }
});

export default router;
