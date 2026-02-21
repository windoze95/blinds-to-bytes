import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Wrench,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Star,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useAI } from '../../hooks/useAI.js';
import { useProgress } from '../../hooks/useProgress.js';
import { useApp } from '../../context/AppContext.jsx';

import { labs as labsData } from '../../data/labs.js';
const labs = labsData || [];

export default function LabView() {
  const { labId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { sendMessage, getReview, loading, error } = useAI();
  const { updateProgress } = useProgress();

  const paddedId = labId?.padStart(2, '0');
  const lab = labs.find((l) => l.id === labId || l.id === `lab-${labId}` || l.id === `lab-${paddedId}`) || null;

  const [currentStep, setCurrentStep] = useState(0);
  const [workspace, setWorkspace] = useState({});
  const [review, setReview] = useState(null);
  const [hint, setHint] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    if (lab) {
      dispatch({ type: 'SET_CURRENT_SECTION', payload: lab.section || 1 });
    }
  }, [lab, dispatch]);

  if (!lab) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Wrench className="w-16 h-16 text-surface-500" />
        <h2 className="text-2xl font-bold text-gray-200">Lab Not Found</h2>
        <p className="text-surface-400 text-center max-w-md">
          This lab doesn't exist yet or the lab data hasn't been loaded.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Study Plan
        </button>
      </div>
    );
  }

  const steps = lab.steps || [];
  const step = steps[currentStep] || null;
  const totalSteps = steps.length;
  const currentWork = workspace[currentStep] || '';

  const handleGetHint = async () => {
    setHint(null);
    const context = `Lab: ${lab.title}\nStep ${currentStep + 1}: ${step?.title || ''}\nInstructions: ${step?.instructions || step?.content || ''}`;
    const messages = [
      { role: 'user', content: `I'm working on this lab exercise and need a hint.\n\n${context}\n\nMy work so far:\n${currentWork}\n\nGive me a helpful hint without giving away the full answer. Use window blind installation analogies where possible.` },
    ];
    const response = await sendMessage(messages, 'tutor');
    if (response) setHint(response);
  };

  const handleGetReview = async () => {
    setReview(null);
    const context = `Lab: ${lab.title}\nStep ${currentStep + 1}: ${step?.title || ''}\nInstructions: ${step?.instructions || step?.content || ''}`;
    const response = await getReview(currentWork, context, 'lab-reviewer');
    if (response) setReview(response);
  };

  const handleMarkComplete = () => {
    const updated = new Set(completedSteps);
    updated.add(currentStep);
    setCompletedSteps(updated);

    const section = lab.section || 1;
    updateProgress({
      section,
      activity_type: 'lab',
      activity_id: lab.id,
      status: updated.size >= totalSteps ? 'completed' : 'in_progress',
      notes: JSON.stringify({ completedSteps: [...updated] }),
    });
  };

  const goToStep = (idx) => {
    setCurrentStep(idx);
    setReview(null);
    setHint(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-workshop-500/15 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-workshop-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">{lab.title}</h1>
              <p className="text-surface-400 text-sm">{lab.description || `Section ${lab.section || '?'}`}</p>
            </div>
          </div>
        </div>
        <div className="badge-green">
          {completedSteps.size}/{totalSteps} steps
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-surface-800 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${totalSteps > 0 ? (completedSteps.size / totalSteps) * 100 : 0}%` }}
        />
      </div>

      {/* Step navigation pills */}
      <div className="flex gap-2 flex-wrap">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => goToStep(idx)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              idx === currentStep
                ? 'bg-workshop-500 text-white'
                : completedSteps.has(idx)
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
            }`}
          >
            {completedSteps.has(idx) && <CheckCircle2 className="w-3.5 h-3.5" />}
            Step {idx + 1}
          </button>
        ))}
      </div>

      {/* Main content: instructions + workspace */}
      {step && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel: instructions */}
          <div className="card space-y-4">
            <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-workshop-400" />
              {step.title || `Step ${currentStep + 1}`}
            </h2>
            <div className="text-surface-300 leading-relaxed whitespace-pre-wrap text-base">
              {step.instructions || step.content || 'No instructions available for this step.'}
            </div>

            {step.tips && (
              <div className="bg-workshop-500/10 border border-workshop-500/20 rounded-lg p-4">
                <p className="text-sm text-workshop-300 font-medium mb-1">Tip</p>
                <p className="text-sm text-surface-300">{step.tips}</p>
              </div>
            )}
          </div>

          {/* Right panel: workspace */}
          <div className="space-y-4">
            <div className="card space-y-3">
              <label className="text-sm font-medium text-surface-300">Your Workspace</label>
              <textarea
                value={currentWork}
                onChange={(e) => setWorkspace({ ...workspace, [currentStep]: e.target.value })}
                placeholder="Type your work here..."
                className="w-full h-64 bg-surface-800 border border-surface-700 rounded-lg p-4 text-gray-200 placeholder-surface-500 resize-y focus:outline-none focus:border-workshop-500/50 text-base leading-relaxed"
              />

              <div className="flex gap-3 flex-wrap">
                <button onClick={handleGetHint} disabled={loading} className="btn-secondary flex items-center gap-2 text-sm">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4 text-yellow-400" />}
                  Get Hint
                </button>
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
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </button>
              </div>
            </div>

            {/* Hint display */}
            {hint && (
              <div className="card border-yellow-500/30 bg-yellow-500/5">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <div className="text-surface-300 text-sm leading-relaxed whitespace-pre-wrap">{hint}</div>
                </div>
              </div>
            )}

            {/* Review display */}
            {review && (
              <div className="card border-workshop-500/30 bg-workshop-500/5">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-workshop-400 mt-0.5 shrink-0" />
                  <div className="text-surface-300 text-sm leading-relaxed whitespace-pre-wrap">{review}</div>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="card border-red-500/30 bg-red-500/5">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Step
        </button>
        <span className="text-surface-400 text-sm">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <button
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep >= totalSteps - 1}
          className="btn-primary flex items-center gap-2 disabled:opacity-30"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
