import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { conceptMappings } from '../../data/conceptMappings.js';
import {
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowRightLeft,
  Sparkles,
  Wrench,
  Cpu,
  Search,
} from 'lucide-react';

const categoryLabels = {
  data: 'Data',
  learning: 'Learning',
  architecture: 'Architecture',
  engineering: 'Engineering',
  tools: 'Tools',
  business: 'Business',
  ethics: 'Ethics',
};

const categoryColors = {
  data: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  learning: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  architecture: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  engineering: 'bg-workshop-500/15 text-workshop-400 border-workshop-500/20',
  tools: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  business: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  ethics: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

function MappingRow({ mapping, isExpanded, onToggle }) {
  const colorClass = categoryColors[mapping.category] || categoryColors.data;

  return (
    <div className="card-hover group">
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        {/* Category + section badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`badge text-[10px] uppercase tracking-wider border ${colorClass}`}
          >
            {categoryLabels[mapping.category] || mapping.category}
          </span>
          <span className="text-[10px] text-gray-600">
            Section {mapping.section}
          </span>
        </div>

        {/* Two column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {/* Blinds side */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-workshop-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Wrench size={16} className="text-workshop-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-workshop-500/60 font-semibold">
                Blind Installation
              </span>
              <h3 className="text-sm font-semibold text-gray-200 mt-0.5">
                {mapping.blinds.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">
                {mapping.blinds.description}
              </p>
            </div>
          </div>

          {/* Connecting arrow */}
          <div className="hidden md:flex items-center justify-center self-center">
            <div className="flex flex-col items-center gap-1">
              <ArrowRightLeft size={16} className="text-workshop-500/40" />
            </div>
          </div>

          {/* Visible divider on mobile */}
          <div className="md:hidden flex items-center gap-2 px-4">
            <div className="flex-1 h-px bg-surface-700" />
            <ArrowRightLeft size={12} className="text-workshop-500/40" />
            <div className="flex-1 h-px bg-surface-700" />
          </div>

          {/* AI side */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={16} className="text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-blue-500/60 font-semibold">
                AI Concept
              </span>
              <h3 className="text-sm font-semibold text-gray-200 mt-0.5">
                {mapping.ai.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">
                {mapping.ai.description}
              </p>
            </div>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-center mt-3">
          {isExpanded ? (
            <ChevronDown size={14} className="text-gray-600" />
          ) : (
            <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-surface-700 space-y-4">
          {/* Quick note */}
          {mapping.notes && (
            <div className="bg-workshop-500/5 border border-workshop-500/10 rounded-lg px-4 py-3">
              <div className="flex items-start gap-2">
                <Sparkles size={14} className="text-workshop-400 mt-0.5 shrink-0" />
                <p className="text-sm text-workshop-300/80 italic leading-relaxed">
                  {mapping.notes}
                </p>
              </div>
            </div>
          )}

          {/* Full descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={12} className="text-workshop-400" />
                <span className="text-xs font-semibold text-workshop-400 uppercase tracking-wider">
                  Blinds Detail
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {mapping.blinds.description}
              </p>
            </div>
            <div className="bg-surface-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={12} className="text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  AI Detail
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {mapping.ai.description}
              </p>
            </div>
          </div>

          {/* Detailed comparison */}
          {mapping.detailedComparison && (
            <div className="bg-surface-800/30 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Deep Dive
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {mapping.detailedComparison}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BlindsToBytes() {
  const { sectionId } = useParams();
  const [expandedId, setExpandedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSection, setFilterSection] = useState(
    sectionId ? parseInt(sectionId, 10) : 0
  );
  const [searchQuery, setSearchQuery] = useState('');

  const allMappings = conceptMappings && conceptMappings.length > 0 ? conceptMappings : [];

  const filteredMappings = useMemo(() => {
    let result = allMappings;

    if (filterCategory) {
      result = result.filter((m) => m.category === filterCategory);
    }
    if (filterSection > 0) {
      result = result.filter((m) => m.section === filterSection);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.blinds.name.toLowerCase().includes(q) ||
          m.ai.name.toLowerCase().includes(q) ||
          (m.notes && m.notes.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allMappings, filterCategory, filterSection, searchQuery]);

  // Unique categories and sections from data
  const categories = useMemo(() => {
    const set = new Set(allMappings.map((m) => m.category));
    return [...set].sort();
  }, [allMappings]);

  const sectionOptions = useMemo(() => {
    const set = new Set(allMappings.map((m) => m.section));
    return [...set].sort((a, b) => a - b);
  }, [allMappings]);

  if (allMappings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ArrowRightLeft size={48} className="text-workshop-400/30 mb-4" />
        <h2 className="text-xl font-semibold text-gray-300 mb-2">
          Concept mappings loading...
        </h2>
        <p className="text-gray-500">
          The Blinds to Bytes Rosetta Stone is being prepared.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-1">
          Blinds to Bytes
        </h1>
        <p className="text-gray-500">
          Your Rosetta Stone — every AI concept mapped to something you already know
          from blind installation.
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts..."
            className="w-full bg-surface-800 border border-surface-700 text-sm text-gray-300
              rounded-lg pl-9 pr-4 py-2 placeholder-gray-600
              focus:outline-none focus:border-workshop-500/50"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-surface-800 border border-surface-700 text-sm text-gray-300
              rounded-lg pl-8 pr-4 py-2 appearance-none cursor-pointer
              hover:border-surface-600 focus:outline-none focus:border-workshop-500/50"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c] || c}
              </option>
            ))}
          </select>
        </div>

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
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-600 mb-4">
        {filteredMappings.length} concept{filteredMappings.length !== 1 ? 's' : ''} found
      </p>

      {/* Mapping rows */}
      <div className="space-y-4">
        {filteredMappings.map((mapping) => (
          <MappingRow
            key={mapping.id}
            mapping={mapping}
            isExpanded={expandedId === mapping.id}
            onToggle={() =>
              setExpandedId(expandedId === mapping.id ? null : mapping.id)
            }
          />
        ))}
      </div>

      {filteredMappings.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No concepts match your filters.</p>
          <button
            onClick={() => {
              setFilterCategory('');
              setFilterSection(0);
              setSearchQuery('');
            }}
            className="btn-primary mt-4 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
