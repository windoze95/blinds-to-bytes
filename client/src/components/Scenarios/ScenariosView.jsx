import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  Star,
  Loader2,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { useAI } from '../../hooks/useAI.js';
import { useProgress } from '../../hooks/useProgress.js';
import { useApp } from '../../context/AppContext.jsx';

import { scenarios as scenariosData } from '../../data/scenarios.js';
const scenarios = scenariosData || [];

export default function ScenariosView() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { getReview, loading, error } = useAI();
  const { updateProgress } = useProgress();

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [workspace, setWorkspace] = useState({});
  const [reviews, setReviews] = useState({});
  const [completed, setCompleted] = useState(new Set());

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_SECTION', payload: 14 });
  }, [dispatch]);

  const scenario = selectedIdx !== null ? scenarios[selectedIdx] : null;
  const currentWork = scenario ? workspace[scenario.id || selectedIdx] || '' : '';

  const handleGetReview = async () => {
    if (!scenario || !currentWork.trim()) return;
    const context = `Scenario: ${scenario.title}\n\n${scenario.description || scenario.scenario || ''}\n\nGuiding Questions:\n${(scenario.questions || []).map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
    const response = await getReview(currentWork, context, 'scenario-reviewer');
    if (response) {
      setReviews({ ...reviews, [scenario.id || selectedIdx]: response });
    }
  };

  const handleMarkComplete = () => {
    if (!scenario) return;
    const key = scenario.id || selectedIdx;
    const updated = new Set(completed);
    updated.add(key);
    setCompleted(updated);

    updateProgress({
      section: scenario.section || 14,
      activity_type: 'scenario',
      activity_id: scenario.id || `scenario-${selectedIdx}`,
      status: 'completed',
      notes: currentWork,
    });
  };

  if (scenarios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FileText className="w-16 h-16 text-surface-500" />
        <h2 className="text-2xl font-bold text-gray-200">Scenarios Not Available</h2>
        <p className="text-surface-400 text-center max-w-md">
          Scenario data hasn't been loaded yet. Check back soon.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Study Plan
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Real-World AI Scenarios</h1>
          <p className="text-surface-400 mt-1">Analyze real AI situations and formulate thoughtful responses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario list */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-surface-400 uppercase tracking-wider px-1">Choose a Scenario</h2>
          {scenarios.map((s, idx) => {
            const key = s.id || idx;
            const isSelected = selectedIdx === idx;
            const isDone = completed.has(key);

            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-workshop-500/10 border-workshop-500/40'
                    : isDone
                      ? 'bg-surface-800 border-emerald-500/30'
                      : 'bg-surface-900 border-surface-700 hover:border-surface-500'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-200 text-sm">{s.title}</h3>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <p className="text-surface-500 text-xs mt-1 line-clamp-2">{s.subtitle || s.description?.slice(0, 80) || ''}</p>
              </button>
            );
          })}
        </div>

        {/* Scenario detail + workspace */}
        {scenario ? (
          <div className="lg:col-span-2 space-y-6">
            {/* Scenario text */}
            <div className="card space-y-4">
              <h2 className="text-xl font-bold text-gray-100">{scenario.title}</h2>
              <div className="text-surface-300 leading-relaxed whitespace-pre-wrap text-base">
                {scenario.description || scenario.scenario || ''}
              </div>

              {(scenario.questions || []).length > 0 && (
                <div className="bg-surface-800 rounded-lg p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-workshop-400 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Guiding Questions
                  </h3>
                  <ul className="space-y-1.5">
                    {scenario.questions.map((q, i) => (
                      <li key={i} className="text-surface-300 text-sm flex gap-2">
                        <span className="text-workshop-500 font-medium shrink-0">{i + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Workspace */}
            <div className="card space-y-3">
              <label className="text-sm font-medium text-surface-300">Your Analysis</label>
              <textarea
                value={currentWork}
                onChange={(e) => setWorkspace({ ...workspace, [scenario.id || selectedIdx]: e.target.value })}
                placeholder="Write your analysis here. Address the guiding questions and think critically about the scenario..."
                className="w-full h-56 bg-surface-800 border border-surface-700 rounded-lg p-4 text-gray-200 placeholder-surface-500 resize-y focus:outline-none focus:border-workshop-500/50 text-base leading-relaxed"
              />

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleGetReview}
                  disabled={loading || !currentWork.trim()}
                  className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                  AI Review
                </button>
                <button
                  onClick={handleMarkComplete}
                  disabled={!currentWork.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm disabled:opacity-40"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark Complete
                </button>
              </div>
            </div>

            {/* Review display */}
            {reviews[scenario.id || selectedIdx] && (
              <div className="card border-workshop-500/30 bg-workshop-500/5">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-workshop-400 mt-0.5 shrink-0" />
                  <div className="text-surface-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {reviews[scenario.id || selectedIdx]}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/5 border border-red-500/20 px-4 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center space-y-3 py-20">
              <ChevronRight className="w-10 h-10 text-surface-600 mx-auto" />
              <p className="text-surface-500">Select a scenario from the left to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
