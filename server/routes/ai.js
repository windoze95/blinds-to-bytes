import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const promptsDir = join(__dirname, '..', 'prompts');

const router = Router();

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function loadPrompt(name) {
  const path = join(promptsDir, `${name}.txt`);
  if (!existsSync(path)) return '';
  return readFileSync(path, 'utf-8');
}

// POST /api/ai/chat — General AI tutor chat
router.post('/chat', async (req, res) => {
  try {
    const { messages, mode = 'tutor' } = req.body;
    const client = getClient();
    const systemPrompt = loadPrompt(mode);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt || undefined,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    res.json({
      content: response.content[0].text,
      usage: response.usage,
    });
  } catch (error) {
    console.error('AI chat error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// POST /api/ai/review — AI reviews user work (labs, scenarios)
router.post('/review', async (req, res) => {
  try {
    const { work, context, mode = 'lab-reviewer' } = req.body;
    const client = getClient();
    const systemPrompt = loadPrompt(mode);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt || undefined,
      messages: [
        {
          role: 'user',
          content: `Context: ${context}\n\nStudent's work:\n${work}\n\nPlease review this work and provide detailed, encouraging feedback.`,
        },
      ],
    });

    res.json({ content: response.content[0].text });
  } catch (error) {
    console.error('AI review error:', error.message);
    res.status(500).json({ error: 'Failed to get AI review' });
  }
});

// POST /api/ai/interview — Mock interview conversation
router.post('/interview', async (req, res) => {
  try {
    const { messages, interviewType = 'interviewer' } = req.body;
    const client = getClient();
    const systemPrompt = loadPrompt(interviewType);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt || undefined,
      messages,
    });

    res.json({ content: response.content[0].text });
  } catch (error) {
    console.error('AI interview error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
