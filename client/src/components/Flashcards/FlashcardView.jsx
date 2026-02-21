import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import apiFetch from '../../utils/apiFetch.js';
import { flashcards } from '../../data/flashcards.js';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  BarChart3,
  Check,
  X,
  Minus,
  Shuffle,
} from 'lucide-react';

function getNextReview(box) {
  // Simplified Leitner intervals: box 1=now, 2=1day, 3=3days, 4=7days, 5=14days
  const intervals = [0, 0, 86400000, 259200000, 604800000, 1209600000];
  return Date.now() + (intervals[box] || 0);
}

function MasteryBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-16 text-gray-500 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-gray-500">{count}</span>
    </div>
  );
}

export default function FlashcardView() {
  const { sectionId } = useParams();
  const { state, dispatch } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterSection, setFilterSection] = useState(
    sectionId ? parseInt(sectionId, 10) : 0
  );
  const [showStats, setShowStats] = useState(false);
  const [rated, setRated] = useState(false);

  const allCards = flashcards && flashcards.length > 0 ? flashcards : [];

  const filteredCards = useMemo(() => {
    if (filterSection === 0) return allCards;
    return allCards.filter((c) => c.section === filterSection);
  }, [allCards, filterSection]);

  const card = filteredCards[currentIndex] || null;

  // Stats
  const stats = useMemo(() => {
    const fp = state.flashcardProgress || {};
    let mastered = 0;
    let learning = 0;
    let newCards = 0;
    const relevantCards = filterSection === 0 ? allCards : allCards.filter((c) => c.section === filterSection);

    for (const c of relevantCards) {
      const p = fp[c.id];
      if (!p) {
        newCards++;
      } else if (p.box >= 4) {
        mastered++;
      } else {
        learning++;
      }
    }
    return { mastered, learning, new: newCards, total: relevantCards.length };
  }, [allCards, filterSection, state.flashcardProgress]);

  useEffect(() => {
    if (sectionId) {
      setFilterSection(parseInt(sectionId, 10));
    }
  }, [sectionId]);

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
    setRated(false);
  }, [filterSection]);

  function goNext() {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setRated(false);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setRated(false);
    }
  }

  function handleShuffle() {
    // Fisher-Yates on indices would modify the array; just pick a random card
    const rand = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(rand);
    setFlipped(false);
    setRated(false);
  }

  async function handleRate(difficulty) {
    if (!card || rated) return;
    setRated(true);

    const fp = state.flashcardProgress[card.id] || {
      box: 1,
      timesReviewed: 0,
      timesCorrect: 0,
    };

    let newBox = fp.box;
    let correct = fp.timesCorrect;

    if (difficulty === 'easy') {
      newBox = Math.min(5, fp.box + 1);
      correct++;
    } else if (difficulty === 'medium') {
      // Stay in same box
      correct++;
    } else {
      // hard — go back to box 1
      newBox = 1;
    }

    const updatedData = {
      box: newBox,
      timesReviewed: fp.timesReviewed + 1,
      timesCorrect: correct,
      lastReviewed: new Date().toISOString(),
      nextReview: new Date(getNextReview(newBox)).toISOString(),
    };

    dispatch({
      type: 'UPDATE_FLASHCARD',
      payload: { cardId: card.id, data: updatedData },
    });

    // Persist to server
    try {
      await apiFetch('/api/progress/flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_id: card.id, correct: difficulty !== 'hard' }),
      });
    } catch {
      // Offline — already updated local state
    }

    // Auto-advance after a brief delay
    setTimeout(() => {
      goNext();
    }, 600);
  }

  function handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setFlipped(!flipped);
    } else if (e.key === 'ArrowRight') {
      goNext();
    } else if (e.key === 'ArrowLeft') {
      goPrev();
    } else if (flipped && e.key === '1') {
      handleRate('easy');
    } else if (flipped && e.key === '2') {
      handleRate('medium');
    } else if (flipped && e.key === '3') {
      handleRate('hard');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Unique sections for filter
  const sectionOptions = useMemo(() => {
    const set = new Set(allCards.map((c) => c.section));
    return [...set].sort((a, b) => a - b);
  }, [allCards]);

  if (allCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Sparkles size={48} className="text-workshop-400/30 mb-4" />
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Flashcards loading...</h2>
        <p className="text-gray-500">Content is being prepared. Check back shortly.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Flashcards</h1>
          <p className="text-gray-500 text-sm mt-1">
            Click to flip. Rate to drive spaced repetition.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Section filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(parseInt(e.target.value, 10))}
              className="bg-surface-800 border border-surface-700 text-sm text-gray-300
                rounded-lg pl-8 pr-4 py-2 appearance-none cursor-pointer
                hover:border-surface-600 focus:outline-none focus:border-workshop-500/50"
            >
              <option value={0}>All sections</option>
              {sectionOptions.map((s) => (
                <option key={s} value={s}>
                  Section {s}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleShuffle}
            className="btn-secondary flex items-center gap-1.5 text-sm"
            title="Shuffle"
          >
            <Shuffle size={14} />
          </button>

          <button
            onClick={() => setShowStats(!showStats)}
            className={`p-2 rounded-lg transition-colors ${
              showStats
                ? 'bg-workshop-500/15 text-workshop-400'
                : 'bg-surface-800 text-gray-400 hover:bg-surface-700'
            }`}
            title="Toggle stats"
          >
            <BarChart3 size={16} />
          </button>
        </div>
      </div>

      {/* Stats panel */}
      {showStats && (
        <div className="card mb-6 space-y-2.5">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Mastery Progress</h3>
          <MasteryBar
            label="Mastered"
            count={stats.mastered}
            total={stats.total}
            color="bg-emerald-500"
          />
          <MasteryBar
            label="Learning"
            count={stats.learning}
            total={stats.total}
            color="bg-workshop-500"
          />
          <MasteryBar
            label="New"
            count={stats.new}
            total={stats.total}
            color="bg-surface-500"
          />
          <p className="text-xs text-gray-600 mt-2">
            {stats.total} total cards{filterSection > 0 ? ` in section ${filterSection}` : ''}
          </p>
        </div>
      )}

      {/* Card counter */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg hover:bg-surface-800 text-gray-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm text-gray-500">
          {filteredCards.length > 0 ? currentIndex + 1 : 0} / {filteredCards.length}
        </span>
        <button
          onClick={goNext}
          disabled={currentIndex >= filteredCards.length - 1}
          className="p-2 rounded-lg hover:bg-surface-800 text-gray-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Flashcard */}
      {card && (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setFlipped(!flipped)}
            className="w-full max-w-2xl cursor-pointer perspective-1000"
            role="button"
            tabIndex={0}
            aria-label={flipped ? 'Card back - click to flip' : 'Card front - click to flip'}
          >
            <div
              className={`
                relative w-full min-h-[320px] transition-transform duration-500
                ${flipped ? '[transform:rotateY(180deg)]' : ''}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl bg-surface-900 border border-surface-700
                  flex flex-col items-center justify-center p-8 text-center backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {card.category && (
                  <span className="badge-amber mb-4 text-[10px] uppercase tracking-wider">
                    {card.category}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 leading-relaxed">
                  {card.front}
                </h2>
                <p className="text-xs text-gray-600 mt-6">
                  Click to reveal answer
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl bg-surface-900 border border-surface-700
                  flex flex-col p-8 overflow-y-auto backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Definition */}
                <div className="flex-1">
                  <p className="text-base text-gray-200 leading-relaxed mb-6">
                    {card.back}
                  </p>

                  {/* Blinds analogy - the killer feature */}
                  {card.blinds_analogy && (
                    <div className="bg-workshop-500/8 border border-workshop-500/15 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <Sparkles
                          size={16}
                          className="text-workshop-400 mt-0.5 shrink-0"
                        />
                        <div>
                          <span className="text-xs font-bold text-workshop-400 uppercase tracking-wider">
                            The Blinds Analogy
                          </span>
                          <p className="text-sm text-workshop-300/80 leading-relaxed mt-1.5 italic">
                            {card.blinds_analogy}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-600 mt-4 text-center">
                  Rate your confidence below
                </p>
              </div>
            </div>
          </div>

          {/* Rating buttons - shown when flipped */}
          {flipped && (
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => handleRate('hard')}
                disabled={rated}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                  bg-red-500/10 border border-red-500/20 text-red-400
                  hover:bg-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors text-sm font-medium"
              >
                <X size={14} />
                Hard
              </button>
              <button
                onClick={() => handleRate('medium')}
                disabled={rated}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                  bg-workshop-500/10 border border-workshop-500/20 text-workshop-400
                  hover:bg-workshop-500/20 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors text-sm font-medium"
              >
                <Minus size={14} />
                Medium
              </button>
              <button
                onClick={() => handleRate('easy')}
                disabled={rated}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                  bg-emerald-500/10 border border-emerald-500/20 text-emerald-400
                  hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-colors text-sm font-medium"
              >
                <Check size={14} />
                Easy
              </button>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="mt-6 flex items-center gap-4 text-[10px] text-gray-600">
            <span>
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">Space</kbd> flip
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">&larr;</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">&rarr;</kbd> navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">1</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">2</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-surface-800 rounded text-gray-500">3</kbd> rate
            </span>
          </div>
        </div>
      )}

      {filteredCards.length === 0 && allCards.length > 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No flashcards found for this section.</p>
          <button
            onClick={() => setFilterSection(0)}
            className="btn-primary mt-4 text-sm"
          >
            Show all cards
          </button>
        </div>
      )}
    </div>
  );
}
