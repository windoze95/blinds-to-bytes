import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login — Authenticate and return JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, username });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// GET /api/auth/verify — Check if token is valid
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

export default router;
