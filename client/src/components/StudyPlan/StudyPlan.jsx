import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { sections } from '../../data/sections.js';
import {
  Lightbulb,
  Brain,
  Database,
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
  ChevronRight,
  FlipVertical,
  Beaker,
  FileQuestion,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const sectionIcons = [
  Lightbulb,
  Brain,
  Database,
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
];

const fallbackSections = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: [
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
  ][i],
  description: '',
  analogyAnchor: '',
  activities: [],
}));

function getActivityCount(section) {
  if (section.activities && section.activities.length > 0) {
    return section.activities.length;
  }
  // Default: sections 1 has 3 activities, sections 2-13 have 4, section 14 has 4
  if (section.id === 1) return 3;
  return 4;
}

function getSectionProgress(sectionNum, progress) {
  if (!progress || Object.keys(progress).length === 0) return 0;
  const actTypes = ['flashcards', 'blinds-to-bytes', 'lab', 'quiz'];
  let total = sectionNum === 1 ? 3 : 4;
  let completed = 0;
  for (const t of actTypes) {
    const key = `s${sectionNum}_${t}`;
    if (progress[key] === 'completed') completed++;
  }
  return Math.round((completed / total) * 100);
}

function SectionCard({ section, progress, onClick }) {
  const Icon = sectionIcons[section.id - 1] || Lightbulb;
  const pct = getSectionProgress(section.id, progress);
  const actCount = getActivityCount(section);

  return (
    <button
      onClick={onClick}
      className="card-hover text-left group flex flex-col h-full"
    >
      {/* Top row: number + icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-workshop-500/10 flex items-center justify-center group-hover:bg-workshop-500/20 transition-colors">
            <Icon size={20} className="text-workshop-400" />
          </div>
          <span className="text-xs font-bold text-workshop-500/60 uppercase tracking-wider">
            Section {section.id}
          </span>
        </div>
        <ChevronRight
          size={16}
          className="text-gray-600 group-hover:text-workshop-400 group-hover:translate-x-0.5 transition-all mt-1"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-100 mb-2 group-hover:text-workshop-300 transition-colors">
        {section.title}
      </h3>

      {/* Description */}
      {section.description && (
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {section.description}
        </p>
      )}

      {/* Analogy anchor quote */}
      {section.analogyAnchor && (
        <div className="bg-workshop-500/5 border border-workshop-500/10 rounded-lg px-3 py-2 mb-4">
          <p className="text-xs text-workshop-400/80 italic leading-relaxed line-clamp-2">
            "{section.analogyAnchor}"
          </p>
        </div>
      )}

      {/* Bottom: activity count + progress */}
      <div className="mt-auto pt-3 border-t border-surface-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">
            {actCount} {actCount === 1 ? 'activity' : 'activities'}
          </span>
          {pct > 0 && (
            <span className="text-xs font-semibold text-emerald-400">{pct}%</span>
          )}
        </div>
        <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-workshop-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
}

function SectionDetail({ section }) {
  const navigate = useNavigate();
  const Icon = sectionIcons[section.id - 1] || Lightbulb;

  const activityRoutes = [
    { label: 'Flashcards', icon: FlipVertical, path: `/flashcards/${section.id}` },
    { label: 'Blinds to Bytes', icon: Layers, path: `/blinds-to-bytes/${section.id}` },
    ...(section.id > 1 && section.id <= 13
      ? [{ label: `Lab ${section.id - 1}`, icon: Beaker, path: `/lab/${section.id - 1}` }]
      : []),
    ...(section.id === 14
      ? [{ label: 'Lab 13', icon: Beaker, path: '/lab/13' }]
      : []),
    { label: section.id === 14 ? 'Final Assessment' : 'Quiz', icon: FileQuestion, path: `/quiz/${section.id}` },
    ...(section.id === 14
      ? [{ label: 'Mock Interview', icon: MessageSquare, path: '/interview' }]
      : []),
  ];

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors"
      >
        <ArrowRight size={14} className="rotate-180" />
        All sections
      </button>

      {/* Section header */}
      <div className="card mb-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-workshop-500/10 flex items-center justify-center shrink-0">
            <Icon size={28} className="text-workshop-400" />
          </div>
          <div className="flex-1">
            <span className="badge-amber mb-2">Section {section.id}</span>
            <h1 className="text-2xl font-bold text-gray-100 mt-1 mb-2">
              {section.title}
            </h1>
            {section.description && (
              <p className="text-gray-400 leading-relaxed">{section.description}</p>
            )}
          </div>
        </div>

        {/* Analogy anchor */}
        {section.analogyAnchor && (
          <div className="mt-6 bg-workshop-500/5 border border-workshop-500/10 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-workshop-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-workshop-400 uppercase tracking-wider">
                  The Blinds Analogy
                </span>
                <p className="text-sm text-gray-300 leading-relaxed mt-1 italic">
                  "{section.analogyAnchor}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activities grid */}
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activityRoutes.map((act) => {
          const ActIcon = act.icon;
          return (
            <button
              key={act.path}
              onClick={() => navigate(act.path)}
              className="card-hover flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-surface-800 flex items-center justify-center group-hover:bg-workshop-500/10 transition-colors">
                <ActIcon size={20} className="text-gray-400 group-hover:text-workshop-400 transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-gray-200 group-hover:text-workshop-300 transition-colors">
                  {act.label}
                </span>
              </div>
              <ChevronRight
                size={16}
                className="text-gray-600 group-hover:text-workshop-400 transition-colors"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StudyPlan() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const data = sections && sections.length > 0 ? sections : fallbackSections;

  useEffect(() => {
    if (sectionId) {
      dispatch({ type: 'SET_CURRENT_SECTION', payload: parseInt(sectionId, 10) });
    }
  }, [sectionId, dispatch]);

  // If a specific section is selected, show the detail view
  if (sectionId) {
    const section = data.find((s) => s.id === parseInt(sectionId, 10));
    if (section) {
      return <SectionDetail section={section} />;
    }
  }

  // Dashboard view — grid of all 14 sections
  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Your AI Learning Journey
        </h1>
        <p className="text-gray-500 text-lg">
          14 sections taking you from "What is AI?" to acing an AI job interview
          — all explained through the lens of blind installation.
        </p>
      </div>

      {/* Section grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            progress={state.progress}
            onClick={() => navigate(`/section/${section.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
