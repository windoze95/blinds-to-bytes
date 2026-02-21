import { useApp } from '../../context/AppContext.jsx';
import {
  Sun,
  Moon,
  MessageCircle,
  Menu,
  BarChart3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sectionTitles = [
  'What Even Is AI?',
  'How Machines Learn',
  'Data — The Raw Material',
  'Neural Networks',
  'Language AI',
  'Vision AI',
  'Large Language Models',
  'Prompt Engineering',
  'AI Tools You Can Use',
  'Ethics, Safety & Bias',
  'AI in Business',
  'The AI Job Landscape',
  'Building Without Code',
  'Capstone — Prove It',
];

function getOverallProgress(progress) {
  if (!progress || Object.keys(progress).length === 0) return 0;
  const completed = Object.values(progress).filter((v) => v === 'completed').length;
  // Rough estimate: 14 sections * ~4 activities each = 56 total activities
  const total = 56;
  return Math.min(100, Math.round((completed / total) * 100));
}

export default function TopBar({ onMenuToggle }) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const overallPct = getOverallProgress(state.progress);
  const currentTitle = sectionTitles[state.currentSection - 1] || '';

  return (
    <header className="sticky top-0 z-30 bg-surface-900/80 backdrop-blur-md border-b border-surface-700">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-700 text-gray-400 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Current section indicator */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="badge-amber whitespace-nowrap">
              Section {state.currentSection}
            </span>
            <span className="text-sm text-gray-300 truncate hidden sm:block">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Overall progress */}
        <div className="hidden md:flex items-center gap-3 min-w-[200px]">
          <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-workshop-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
            {overallPct}%
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/progress')}
            className="p-2 rounded-lg hover:bg-surface-700 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="View progress"
            title="Progress dashboard"
          >
            <BarChart3 size={18} />
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_DARK_MODE', payload: !state.darkMode })}
            className="p-2 rounded-lg hover:bg-surface-700 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Toggle dark mode"
            title={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {state.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
            className={`
              p-2 rounded-lg transition-colors relative
              ${
                state.chatOpen
                  ? 'bg-workshop-500/15 text-workshop-400'
                  : 'hover:bg-surface-700 text-gray-400 hover:text-gray-200'
              }
            `}
            aria-label="Toggle AI tutor chat"
            title="AI Tutor"
          >
            <MessageCircle size={18} />
            {!state.chatOpen && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-workshop-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
