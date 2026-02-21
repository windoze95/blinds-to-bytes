import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ArrowLeft,
  Trophy,
  BookOpen,
  Layers,
  Mic,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const SECTION_NAMES = [
  'What Even Is AI?',
  'How Machines Learn',
  'Data: The Raw Material',
  'Neural Networks',
  'Language AI',
  'Vision AI',
  'Large Language Models',
  'Prompt Engineering',
  'AI Tools Today',
  'AI Ethics & Safety',
  'AI in Business',
  'The AI Job Landscape',
  'Building Without Code',
  'Capstone',
];

const ACTIVITY_TYPES = ['flashcards', 'blinds-to-bytes', 'lab', 'quiz', 'reading'];

export default function ProgressDashboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { progress, flashcardProgress } = state;

  const [quizResults, setQuizResults] = useState([]);
  const [interviewHistory, setInterviewHistory] = useState([]);

  useEffect(() => {
    fetchQuizResults();
    fetchInterviews();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const results = [];
      for (let s = 1; s <= 14; s++) {
        const res = await fetch(`/api/progress/quiz/${s}`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) results.push(...data);
        }
      }
      setQuizResults(results);
    } catch {
      // Offline
    }
  };

  const fetchInterviews = async () => {
    try {
      const res = await fetch('/api/progress/interviews');
      if (res.ok) {
        const data = await res.json();
        setInterviewHistory(data);
      }
    } catch {
      // Offline
    }
  };

  // Calculate stats
  const progressEntries = Object.values(progress);
  const completedEntries = progressEntries.filter((p) => p.status === 'completed');
  const totalActivities = 14 * ACTIVITY_TYPES.length; // rough estimate: 5 activities per section
  const overallCompletion = totalActivities > 0 ? Math.min(100, Math.round((completedEntries.length / totalActivities) * 100)) : 0;

  const totalTimeSeconds = progressEntries.reduce((acc, p) => acc + (p.time_spent_seconds || 0), 0);
  const totalHours = Math.floor(totalTimeSeconds / 3600);
  const totalMinutes = Math.floor((totalTimeSeconds % 3600) / 60);

  // Flashcard stats
  const fcEntries = Object.values(flashcardProgress);
  const fcMastered = fcEntries.filter((f) => f.box >= 5).length;
  const fcDueForReview = fcEntries.filter((f) => {
    if (!f.next_review) return false;
    return new Date(f.next_review) <= new Date();
  }).length;
  const fcTotalReviews = fcEntries.reduce((acc, f) => acc + (f.times_reviewed || 0), 0);
  const fcTotalCorrect = fcEntries.reduce((acc, f) => acc + (f.times_correct || 0), 0);
  const fcAccuracy = fcTotalReviews > 0 ? Math.round((fcTotalCorrect / fcTotalReviews) * 100) : 0;

  // Quiz stats
  const quizBySection = {};
  for (const r of quizResults) {
    const s = r.section;
    if (!quizBySection[s]) quizBySection[s] = [];
    quizBySection[s].push(r);
  }
  const quizBestScores = Object.entries(quizBySection).map(([section, results]) => ({
    section: parseInt(section, 10),
    best: Math.max(...results.map((r) => r.score)),
    attempts: results.length,
  }));
  const quizAverage = quizBestScores.length > 0
    ? Math.round(quizBestScores.reduce((acc, q) => acc + q.best, 0) / quizBestScores.length)
    : 0;

  // Per-section progress
  const sectionProgress = SECTION_NAMES.map((name, i) => {
    const sectionNum = i + 1;
    const sectionEntries = progressEntries.filter((p) => p.section === sectionNum);
    const sectionCompleted = sectionEntries.filter((p) => p.status === 'completed').length;
    const sectionTotal = ACTIVITY_TYPES.length;
    const percent = sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0;
    return { name, section: sectionNum, completed: sectionCompleted, total: sectionTotal, percent };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Progress Dashboard</h1>
          <p className="text-surface-400 mt-1">Track your AI learning journey</p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Overall completion */}
        <div className="card text-center space-y-3">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-800" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${overallCompletion * 2.64} ${264 - overallCompletion * 2.64}`}
                strokeLinecap="round"
                className="text-emerald-400 transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-100">
              {overallCompletion}%
            </span>
          </div>
          <p className="text-surface-400 text-sm">Overall Progress</p>
        </div>

        {/* Flashcards mastered */}
        <div className="card text-center space-y-2">
          <Layers className="w-8 h-8 mx-auto text-workshop-400" />
          <p className="text-3xl font-bold text-gray-100">{fcMastered}</p>
          <p className="text-surface-400 text-sm">Cards Mastered</p>
          {fcDueForReview > 0 && (
            <p className="text-yellow-400 text-xs">{fcDueForReview} due for review</p>
          )}
        </div>

        {/* Quiz average */}
        <div className="card text-center space-y-2">
          <Target className="w-8 h-8 mx-auto text-blue-400" />
          <p className="text-3xl font-bold text-gray-100">{quizAverage}%</p>
          <p className="text-surface-400 text-sm">Quiz Average</p>
          <p className="text-surface-600 text-xs">{quizBestScores.length} quizzes taken</p>
        </div>

        {/* Time spent */}
        <div className="card text-center space-y-2">
          <Clock className="w-8 h-8 mx-auto text-emerald-400" />
          <p className="text-3xl font-bold text-gray-100">
            {totalHours > 0 ? `${totalHours}h ${totalMinutes}m` : `${totalMinutes}m`}
          </p>
          <p className="text-surface-400 text-sm">Time Invested</p>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-workshop-400" />
          Section Progress
        </h2>
        <div className="space-y-3">
          {sectionProgress.map((sp) => (
            <div key={sp.section} className="flex items-center gap-4">
              <span className="w-6 text-right text-surface-500 text-sm font-mono">{sp.section}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300 truncate">{sp.name}</span>
                  <span className="text-xs text-surface-500 ml-2 shrink-0">{sp.completed}/{sp.total}</span>
                </div>
                <div className="w-full bg-surface-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${sp.percent >= 100 ? 'bg-emerald-400' : sp.percent > 0 ? 'bg-workshop-500' : 'bg-surface-700'}`}
                    style={{ width: `${sp.percent}%` }}
                  />
                </div>
              </div>
              {sp.percent >= 100 && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flashcard stats */}
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-workshop-400" />
            Flashcard Progress
          </h2>
          {fcEntries.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-surface-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-400">{fcMastered}</p>
                  <p className="text-xs text-surface-500 mt-1">Mastered (Box 5)</p>
                </div>
                <div className="bg-surface-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-400">{fcDueForReview}</p>
                  <p className="text-xs text-surface-500 mt-1">Due for Review</p>
                </div>
                <div className="bg-surface-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-400">{fcAccuracy}%</p>
                  <p className="text-xs text-surface-500 mt-1">Accuracy</p>
                </div>
              </div>

              {/* Box distribution bar chart */}
              <div>
                <p className="text-sm text-surface-400 mb-2">Box Distribution</p>
                <div className="flex items-end gap-2 h-24">
                  {[1, 2, 3, 4, 5].map((box) => {
                    const count = fcEntries.filter((f) => f.box === box).length;
                    const maxCount = Math.max(...[1, 2, 3, 4, 5].map((b) => fcEntries.filter((f) => f.box === b).length), 1);
                    const height = (count / maxCount) * 100;
                    return (
                      <div key={box} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-surface-500">{count}</span>
                        <div className="w-full rounded-t" style={{ height: `${Math.max(height, 4)}%` }}>
                          <div className={`w-full h-full rounded-t ${box >= 4 ? 'bg-emerald-500' : box >= 2 ? 'bg-workshop-500' : 'bg-surface-600'}`} />
                        </div>
                        <span className="text-xs text-surface-500">Box {box}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <p className="text-surface-500 text-sm py-4 text-center">No flashcard data yet. Start reviewing cards to see your progress here.</p>
          )}
        </div>

        {/* Quiz scores */}
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Quiz Scores
          </h2>
          {quizBestScores.length > 0 ? (
            <div className="space-y-3">
              {quizBestScores.map((q) => (
                <div key={q.section} className="flex items-center gap-3">
                  <span className="text-surface-500 text-sm w-24 shrink-0">Section {q.section}</span>
                  <div className="flex-1 bg-surface-800 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${q.best >= 80 ? 'bg-emerald-400' : q.best >= 60 ? 'bg-workshop-500' : 'bg-red-400'}`}
                      style={{ width: `${q.best}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium w-12 text-right ${q.best >= 80 ? 'text-emerald-400' : q.best >= 60 ? 'text-workshop-400' : 'text-red-400'}`}>
                    {q.best}%
                  </span>
                  <span className="text-xs text-surface-600 w-16 text-right">{q.attempts} tries</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-surface-500 text-sm py-4 text-center">No quiz results yet. Complete a quiz to see your scores here.</p>
          )}
        </div>
      </div>

      {/* Interview history */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <Mic className="w-5 h-5 text-workshop-400" />
          Interview History
        </h2>
        {interviewHistory.length > 0 ? (
          <div className="space-y-3">
            {interviewHistory.map((interview) => {
              const typeLabel = {
                interviewer: 'AI Role Interview',
                behavioral: 'Behavioral Interview',
                technical: 'Technical Explainer',
              }[interview.interview_type] || interview.interview_type;

              const mins = Math.floor((interview.duration_seconds || 0) / 60);
              const date = interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'Unknown';

              return (
                <div key={interview.id} className="flex items-center gap-4 bg-surface-800 rounded-lg p-4">
                  <div className="w-10 h-10 rounded-full bg-workshop-500/15 flex items-center justify-center shrink-0">
                    <Mic className="w-5 h-5 text-workshop-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{typeLabel}</p>
                    <p className="text-xs text-surface-500">{date} &middot; {mins} min</p>
                  </div>
                  {interview.ai_feedback && (
                    <span className="badge-green text-xs">Scored</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-surface-500 text-sm py-4 text-center">No interview sessions yet. Try a mock interview to practice for AI roles.</p>
        )}
      </div>
    </div>
  );
}
