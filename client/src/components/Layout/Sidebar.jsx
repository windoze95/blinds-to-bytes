import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Brain,
  Database as DatabaseIcon,
  Network,
  MessageSquare,
  Eye,
  Bot,
  Pen,
  Wrench,
  Shield,
  Briefcase,
  GraduationCap,
  Blocks,
  Trophy,
  BookOpen,
  FlipVertical,
  Layers,
  FileQuestion,
  Beaker,
  X,
} from 'lucide-react';

const sectionIcons = [
  Lightbulb, // 1 - What Even Is AI?
  Brain, // 2 - How Machines Learn
  DatabaseIcon, // 3 - Data
  Network, // 4 - Neural Networks
  MessageSquare, // 5 - Language AI
  Eye, // 6 - Vision AI
  Bot, // 7 - LLMs
  Pen, // 8 - Prompt Engineering
  Wrench, // 9 - AI Tools
  Shield, // 10 - Ethics
  Briefcase, // 11 - AI in Business
  GraduationCap, // 12 - Job Landscape
  Blocks, // 13 - Building Without Code
  Trophy, // 14 - Capstone
];

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

const sectionActivities = [
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 1', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 2', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 3', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 4', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 5', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 6', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 7', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 8', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 9', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 10', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 11', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'flashcards', label: 'Flashcards', icon: FlipVertical },
    { type: 'blinds-to-bytes', label: 'Blinds to Bytes', icon: Layers },
    { type: 'lab', label: 'Lab 12', icon: Beaker },
    { type: 'quiz', label: 'Quiz', icon: FileQuestion },
  ],
  [
    { type: 'lab', label: 'Lab 13', icon: Beaker },
    { type: 'interview', label: 'Mock Interview', icon: MessageSquare },
    { type: 'flashcards', label: 'Flashcard Review', icon: FlipVertical },
    { type: 'quiz', label: 'Final Assessment', icon: FileQuestion },
  ],
];

function getActivityPath(sectionNum, activity) {
  switch (activity.type) {
    case 'flashcards':
      return `/flashcards/${sectionNum}`;
    case 'blinds-to-bytes':
      return `/blinds-to-bytes/${sectionNum}`;
    case 'quiz':
      return `/quiz/${sectionNum}`;
    case 'lab': {
      const labNum = sectionNum === 1 ? 0 : sectionNum - 1;
      return `/lab/${labNum || sectionNum}`;
    }
    case 'interview':
      return '/interview';
    default:
      return '/';
  }
}

function getSectionProgress(sectionNum, progress) {
  const activities = sectionActivities[sectionNum - 1] || [];
  if (activities.length === 0) return 0;
  let completed = 0;
  for (const act of activities) {
    const key = `s${sectionNum}_${act.type}`;
    if (progress[key] === 'completed') completed++;
  }
  return Math.round((completed / activities.length) * 100);
}

export default function Sidebar({ open, onClose }) {
  const { state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(state.currentSection);

  function toggleSection(num) {
    setExpanded(expanded === num ? null : num);
  }

  function handleActivityClick(sectionNum, activity) {
    const path = getActivityPath(sectionNum, activity);
    navigate(path);
    if (onClose) onClose();
  }

  function handleSectionClick(sectionNum) {
    navigate(`/section/${sectionNum}`);
    if (onClose) onClose();
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-surface-900 border-r border-surface-700
          transform transition-transform duration-300 ease-in-out overflow-hidden
          lg:static lg:translate-x-0 lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-700">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-workshop-500/20 flex items-center justify-center">
              <BookOpen size={18} className="text-workshop-400" />
            </div>
            <span className="font-semibold text-gray-100 group-hover:text-workshop-400 transition-colors">
              Blinds to Bytes
            </span>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-surface-700 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section list */}
        <nav className="overflow-y-auto h-[calc(100%-65px)] py-3 px-3 space-y-0.5">
          {sectionTitles.map((title, i) => {
            const num = i + 1;
            const Icon = sectionIcons[i];
            const isExpanded = expanded === num;
            const activities = sectionActivities[i];
            const pct = getSectionProgress(num, state.progress);

            return (
              <div key={num}>
                {/* Section header */}
                <button
                  onClick={() => toggleSection(num)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left
                    transition-colors group
                    ${
                      state.currentSection === num
                        ? 'bg-workshop-500/10 text-workshop-400'
                        : 'text-gray-300 hover:bg-surface-800 hover:text-gray-100'
                    }
                  `}
                >
                  <Icon
                    size={16}
                    className={
                      state.currentSection === num
                        ? 'text-workshop-400 shrink-0'
                        : 'text-gray-500 group-hover:text-gray-400 shrink-0'
                    }
                  />
                  <span className="flex-1 text-sm font-medium truncate">
                    <span className="text-gray-500 mr-1.5">{num}.</span>
                    {title}
                  </span>

                  {/* Progress indicator */}
                  {pct > 0 && (
                    <span className="text-[10px] font-semibold text-emerald-400 shrink-0">
                      {pct}%
                    </span>
                  )}

                  {isExpanded ? (
                    <ChevronDown size={14} className="text-gray-500 shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-500 shrink-0" />
                  )}
                </button>

                {/* Activities */}
                {isExpanded && (
                  <div className="ml-4 mt-0.5 mb-1 pl-4 border-l border-surface-700 space-y-0.5">
                    <button
                      onClick={() => handleSectionClick(num)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs
                        text-gray-400 hover:text-gray-200 hover:bg-surface-800 transition-colors"
                    >
                      <BookOpen size={12} />
                      <span>Overview</span>
                    </button>
                    {activities.map((act, j) => {
                      const ActIcon = act.icon;
                      const actPath = getActivityPath(num, act);
                      const isActive = location.pathname === actPath;
                      const key = `s${num}_${act.type}`;
                      const isDone = state.progress[key] === 'completed';

                      return (
                        <button
                          key={j}
                          onClick={() => handleActivityClick(num, act)}
                          className={`
                            w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs
                            transition-colors
                            ${
                              isActive
                                ? 'bg-workshop-500/10 text-workshop-400'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-800'
                            }
                          `}
                        >
                          <ActIcon size={12} />
                          <span className="flex-1 text-left">{act.label}</span>
                          {isDone && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {/* Data Backup link */}
          <div className="mt-4 pt-4 border-t border-surface-700">
            <button
              onClick={() => {
                navigate('/settings');
                if (onClose) onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left
                transition-colors text-gray-300 hover:bg-surface-800 hover:text-gray-100"
            >
              <DatabaseIcon size={16} className="text-gray-500 shrink-0" />
              <span className="text-sm font-medium">Data Backup</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
