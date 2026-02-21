import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import aiRoutes from './routes/ai.js';
import progressRoutes from './routes/progress.js';
import { initDb } from './db/seed.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API routes
app.use('/api/ai', aiRoutes);
app.use('/api/progress', progressRoutes);

// Serve static frontend in production
const clientDist = join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(join(clientDist, 'index.html'));
});

// Initialize database and start server
initDb();

app.listen(PORT, () => {
  console.log(`Blinds to Bytes server running on http://localhost:${PORT}`);
});
