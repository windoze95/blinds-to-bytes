import { useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';

export function useProgress() {
  const { state, dispatch } = useApp();

  const updateProgress = useCallback(
    async ({ section, activity_type, activity_id, status, score, time_spent_seconds, notes }) => {
      const key = `${section}-${activity_type}-${activity_id}`;
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: { key, value: { section, activity_type, activity_id, status, score, time_spent_seconds, notes } },
      });

      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section, activity_type, activity_id, status, score, time_spent_seconds, notes }),
        });
      } catch {
        // Offline — progress saved locally
      }
    },
    [dispatch]
  );

  const updateFlashcard = useCallback(
    async (cardId, correct) => {
      const existing = state.flashcardProgress[cardId] || { box: 1, times_reviewed: 0, times_correct: 0 };
      const newBox = correct ? Math.min(5, existing.box + 1) : Math.max(1, existing.box - 1);
      dispatch({
        type: 'UPDATE_FLASHCARD',
        payload: {
          cardId,
          data: {
            ...existing,
            box: newBox,
            times_reviewed: existing.times_reviewed + 1,
            times_correct: existing.times_correct + (correct ? 1 : 0),
            last_reviewed: new Date().toISOString(),
          },
        },
      });

      try {
        await fetch('/api/progress/flashcard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_id: cardId, correct }),
        });
      } catch {
        // Offline
      }
    },
    [dispatch, state.flashcardProgress]
  );

  const saveQuiz = useCallback(async ({ section, quiz_id, answers, score, time_spent_seconds }) => {
    try {
      await fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, quiz_id, answers, score, time_spent_seconds }),
      });
    } catch {
      // Offline
    }
  }, []);

  const saveInterview = useCallback(async ({ interview_type, transcript, ai_feedback, duration_seconds }) => {
    try {
      const res = await fetch('/api/progress/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interview_type, transcript, ai_feedback, duration_seconds }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.id;
      }
    } catch {
      // Offline
    }
    return null;
  }, []);

  const getCompletion = useCallback(
    (section) => {
      const entries = Object.values(state.progress).filter((p) => p.section === section);
      if (entries.length === 0) return 0;
      const completed = entries.filter((p) => p.status === 'completed').length;
      return Math.round((completed / entries.length) * 100);
    },
    [state.progress]
  );

  return { updateProgress, updateFlashcard, saveQuiz, saveInterview, getCompletion, progress: state.progress, flashcardProgress: state.flashcardProgress };
}
