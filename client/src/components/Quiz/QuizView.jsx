import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ChevronRight,
  Trophy,
  Clock,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useTimer } from '../../hooks/useTimer.js';
import { useProgress } from '../../hooks/useProgress.js';
import { useApp } from '../../context/AppContext.jsx';

import { quizzes as quizzesData } from '../../data/quizzes.js';
const quizzes = quizzesData || [];

export default function QuizView() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { formatted, seconds, start, stop, reset } = useTimer();
  const { saveQuiz, updateProgress } = useProgress();

  const sectionNum = parseInt(sectionId, 10);
  const quiz = quizzes.find((q) => q.section === sectionNum || q.id === sectionId) || null;
  const questions = quiz?.questions || [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (sectionNum) dispatch({ type: 'SET_CURRENT_SECTION', payload: sectionNum });
  }, [sectionNum, dispatch]);

  useEffect(() => {
    if (questions.length > 0 && !finished) start();
    return () => stop();
  }, []);

  const question = questions[currentIdx] || null;
  const totalQuestions = questions.length;

  if (!quiz || totalQuestions === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <HelpCircle className="w-16 h-16 text-surface-500" />
        <h2 className="text-2xl font-bold text-gray-200">Quiz Not Available</h2>
        <p className="text-surface-400 text-center max-w-md">
          No quiz found for Section {sectionId}. Quiz data may not be loaded yet.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Study Plan
        </button>
      </div>
    );
  }

  const handleSelectAnswer = (optionIdx) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIdx);
    setShowFeedback(true);

    const isCorrect = optionIdx === question.correctAnswer;
    setAnswers([...answers, { questionIdx: currentIdx, selected: optionIdx, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    stop();
    setFinished(true);

    const correctCount = [...answers].filter((a) => a.correct).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    saveQuiz({
      section: sectionNum,
      quiz_id: quiz.id || `quiz-section-${sectionNum}`,
      answers,
      score,
      time_spent_seconds: seconds,
    });

    updateProgress({
      section: sectionNum,
      activity_type: 'quiz',
      activity_id: quiz.id || `quiz-section-${sectionNum}`,
      status: 'completed',
      score,
      time_spent_seconds: seconds,
    });
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFinished(false);
    setReviewMode(false);
    reset(0);
    start();
  };

  const handleReview = () => {
    setReviewMode(true);
    setCurrentIdx(0);
    setShowFeedback(true);
    setSelectedAnswer(answers[0]?.selected ?? null);
  };

  const handleReviewNav = (idx) => {
    setCurrentIdx(idx);
    setSelectedAnswer(answers[idx]?.selected ?? null);
    setShowFeedback(true);
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const progressPercent = totalQuestions > 0 ? ((currentIdx + (showFeedback ? 1 : 0)) / totalQuestions) * 100 : 0;

  if (finished && !reviewMode) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="card text-center space-y-6 py-10">
          <Trophy className={`w-20 h-20 mx-auto ${scorePercent >= 80 ? 'text-yellow-400' : scorePercent >= 60 ? 'text-workshop-400' : 'text-surface-400'}`} />
          <h2 className="text-3xl font-bold text-gray-100">Quiz Complete!</h2>
          <p className="text-surface-400">Section {sectionNum} - {quiz.title || 'Quiz'}</p>

          <div className="flex justify-center gap-8 py-4">
            <div className="text-center">
              <p className={`text-5xl font-bold ${scorePercent >= 80 ? 'text-emerald-400' : scorePercent >= 60 ? 'text-workshop-400' : 'text-red-400'}`}>
                {scorePercent}%
              </p>
              <p className="text-surface-400 text-sm mt-1">Score</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-200">
                {correctCount}/{totalQuestions}
              </p>
              <p className="text-surface-400 text-sm mt-1">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-400">{formatted}</p>
              <p className="text-surface-400 text-sm mt-1">Time</p>
            </div>
          </div>

          {scorePercent >= 80 ? (
            <p className="text-emerald-400 font-medium">
              Outstanding work! You really know your stuff.
            </p>
          ) : scorePercent >= 60 ? (
            <p className="text-workshop-400 font-medium">
              Good effort! Review the ones you missed to strengthen your understanding.
            </p>
          ) : (
            <p className="text-red-400 font-medium">
              Keep at it! Review the material and try again — every expert was once a beginner.
            </p>
          )}

          <div className="flex justify-center gap-4 pt-4">
            <button onClick={handleReview} className="btn-secondary flex items-center gap-2">
              <Eye className="w-4 h-4" /> Review Answers
            </button>
            <button onClick={handleRestart} className="btn-secondary flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button onClick={() => navigate('/')} className="btn-primary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Study Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-xl font-bold text-gray-100">{quiz.title || `Section ${sectionNum} Quiz`}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-surface-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatted}</span>
          </div>
          {reviewMode && <span className="badge-amber">Review Mode</span>}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-surface-800 rounded-full h-2">
        <div
          className="bg-workshop-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${reviewMode ? ((currentIdx + 1) / totalQuestions) * 100 : progressPercent}%` }}
        />
      </div>

      {/* Question card */}
      {question && (
        <div className="card space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-100 leading-relaxed">
              <span className="text-workshop-400 mr-2">Q{currentIdx + 1}.</span>
              {question.question}
            </h2>
            <span className="text-surface-500 text-sm whitespace-nowrap">
              {currentIdx + 1} / {totalQuestions}
            </span>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {(question.options || []).map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctAnswer;
              let optionStyle = 'bg-surface-800 border-surface-700 hover:border-surface-500 cursor-pointer';

              if (showFeedback) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-500/10 border-red-500/50 text-red-300';
                } else {
                  optionStyle = 'bg-surface-800/50 border-surface-700/50 text-surface-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                    {showFeedback && isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : showFeedback && isSelected && !isCorrect ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className="text-base">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && question.explanation && (
            <div className={`p-4 rounded-lg border ${selectedAnswer === question.correctAnswer ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-workshop-500/5 border-workshop-500/20'}`}>
              <p className="text-surface-300 text-sm leading-relaxed">{question.explanation}</p>
              {question.blindsAnalogy && (
                <p className="text-workshop-400 text-sm mt-2 italic">{question.blindsAnalogy}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          {showFeedback && (
            <div className="flex justify-end">
              {reviewMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReviewNav(currentIdx - 1)}
                    disabled={currentIdx === 0}
                    className="btn-secondary text-sm disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {currentIdx < totalQuestions - 1 ? (
                    <button
                      onClick={() => handleReviewNav(currentIdx + 1)}
                      className="btn-primary text-sm flex items-center gap-2"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={() => { setReviewMode(false); setFinished(true); }} className="btn-primary text-sm">
                      Back to Results
                    </button>
                  )}
                </div>
              ) : (
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  {currentIdx < totalQuestions - 1 ? (
                    <>Next Question <ChevronRight className="w-4 h-4" /></>
                  ) : (
                    'Finish Quiz'
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
