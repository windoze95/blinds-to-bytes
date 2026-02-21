import { Router } from 'express';
import { getDb } from '../db/seed.js';

const router = Router();

// GET /api/progress — Get all progress data
router.get('/', (req, res) => {
  try {
    const db = getDb();

    const progressRows = db.prepare('SELECT * FROM progress').all();
    const progress = {};
    for (const row of progressRows) {
      const key = `${row.section}-${row.activity_type}-${row.activity_id}`;
      progress[key] = row;
    }

    const flashcardRows = db.prepare('SELECT * FROM flashcard_progress').all();
    const flashcardProgress = {};
    for (const row of flashcardRows) {
      flashcardProgress[row.card_id] = row;
    }

    res.json({ progress, flashcardProgress });
  } catch (error) {
    console.error('Progress fetch error:', error.message);
    res.json({ progress: {}, flashcardProgress: {} });
  }
});

// POST /api/progress — Update activity progress
router.post('/', (req, res) => {
  const { section, activity_type, activity_id, status, score, time_spent_seconds, notes } = req.body;
  const db = getDb();

  const existing = db
    .prepare('SELECT id FROM progress WHERE section = ? AND activity_type = ? AND activity_id = ?')
    .get(section, activity_type, activity_id);

  if (existing) {
    db.prepare(
      `UPDATE progress SET status = ?, score = ?, time_spent_seconds = ?, notes = ?,
       completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
       WHERE id = ?`
    ).run(status, score, time_spent_seconds, notes, status, existing.id);
  } else {
    db.prepare(
      `INSERT INTO progress (section, activity_type, activity_id, status, score, time_spent_seconds, notes, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END)`
    ).run(section, activity_type, activity_id, status, score, time_spent_seconds, notes, status);
  }

  res.json({ success: true });
});

// POST /api/progress/flashcard — Update flashcard progress
router.post('/flashcard', (req, res) => {
  const { card_id, correct } = req.body;
  const db = getDb();

  const existing = db.prepare('SELECT * FROM flashcard_progress WHERE card_id = ?').get(card_id);

  if (existing) {
    let newBox = existing.box;
    if (correct) {
      newBox = Math.min(5, existing.box + 1);
    } else {
      newBox = Math.max(1, existing.box - 1);
    }

    // Spaced repetition intervals (in hours): box 1=4h, 2=8h, 3=24h, 4=72h, 5=168h
    const intervals = { 1: 4, 2: 8, 3: 24, 4: 72, 5: 168 };
    const hoursUntilReview = intervals[newBox] || 4;

    db.prepare(
      `UPDATE flashcard_progress SET box = ?, times_reviewed = times_reviewed + 1,
       times_correct = times_correct + ?, last_reviewed = CURRENT_TIMESTAMP,
       next_review = datetime('now', ? || ' hours')
       WHERE card_id = ?`
    ).run(newBox, correct ? 1 : 0, `+${hoursUntilReview}`, card_id);
  } else {
    db.prepare(
      `INSERT INTO flashcard_progress (card_id, box, times_reviewed, times_correct, last_reviewed, next_review)
       VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP, datetime('now', '+4 hours'))`
    ).run(card_id, correct ? 2 : 1, correct ? 1 : 0);
  }

  res.json({ success: true });
});

// POST /api/progress/interview — Save interview transcript
router.post('/interview', (req, res) => {
  const { interview_type, transcript, ai_feedback, duration_seconds } = req.body;
  const db = getDb();

  const result = db
    .prepare(
      'INSERT INTO interview_transcripts (interview_type, transcript, ai_feedback, duration_seconds) VALUES (?, ?, ?, ?)'
    )
    .run(interview_type, JSON.stringify(transcript), ai_feedback, duration_seconds);

  res.json({ success: true, id: result.lastInsertRowid });
});

// POST /api/progress/quiz — Save quiz results
router.post('/quiz', (req, res) => {
  const { section, quiz_id, answers, score, time_spent_seconds } = req.body;
  const db = getDb();

  db.prepare(
    'INSERT INTO quiz_results (section, quiz_id, answers, score, time_spent_seconds) VALUES (?, ?, ?, ?, ?)'
  ).run(section, quiz_id, JSON.stringify(answers), score, time_spent_seconds);

  res.json({ success: true });
});

// GET /api/progress/quiz/:sectionId — Get quiz results for a section
router.get('/quiz/:sectionId', (req, res) => {
  const db = getDb();
  const results = db
    .prepare('SELECT * FROM quiz_results WHERE section = ? ORDER BY created_at DESC')
    .all(req.params.sectionId);
  res.json(results);
});

// GET /api/progress/interviews — Get all interview transcripts
router.get('/interviews', (req, res) => {
  const db = getDb();
  const results = db
    .prepare('SELECT * FROM interview_transcripts ORDER BY created_at DESC')
    .all();
  res.json(results);
});

export default router;
