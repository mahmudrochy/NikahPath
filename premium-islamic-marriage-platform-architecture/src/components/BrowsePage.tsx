import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, BookOpen, Briefcase, Filter, Grid, List } from 'lucide-react';
import { UserProfile, Page, FilterState } from '../types';
import { ProfileCard } from './ProfileCard';
import { getProfiles, filterProfiles, getQuestions, questionCategories } from '../data';

interface BrowsePageProps {
  _onNavigate?: (page: Page) => void;
  onSelectProfile: (id: string) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ onSelectProfile }) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const profiles = getProfiles();
  const allQuestions = getQuestions();

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};
    allQuestions.forEach(q => {
      if (q.options && q.type === 'select') {
        options[q.id] = q.options;
      }
    });
    return options;
  }, []);

  // Filter profiles
  const filteredProfiles = useMemo(() => {
    let result = filterProfiles(profiles, filters, genderFilter);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        String(p.answers.profession || '').toLowerCase().includes(query) ||
        String(p.answers.education || '').toLowerCase().includes(query) ||
        String(p.answers.madhhab || '').toLowerCase().includes(query)
      );
    }

    return result;
  }, [profiles, filters, genderFilter, searchQuery]);

  // Calculate match score (simple heuristic)
  const calculateMatchScore = (profile: UserProfile): number => {
    let score = 70; // Base score
    const answerCount = Object.keys(profile.answers).length;
    score = Math.min(98, score + answerCount * 0.5);
    if (profile.verified) score += 5;
    if (profile.waliIncluded) score += 3;
    return Math.round(score);
  };

  // Update a filter value
  const updateFilter = (key: string, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value === '' ? null : value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setGenderFilter('');
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== null && v !== '' && v !== 'Any').length + (genderFilter ? 1 : 0);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-emerald-900 mb-2">
            Discover Profiles
          </h1>
          <p className="text-gray-500">
            {filteredProfiles.length} profile{filteredProfiles.length !== 1 ? 's' : ''} found
            {genderFilter && ` • Looking for ${genderFilter} profiles`}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, profession, madhhab..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white"
              aria-label="Search profiles"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all font-medium text-sm ${
                showFilters || activeFilterCount > 0
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="hidden sm:flex border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-800 text-white' : 'bg-white text-gray-400'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-emerald-800 text-white' : 'bg-white text-gray-400'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gender filter */}
        <div className="flex gap-2 mb-6">
          {['', 'female', 'male'].map(g => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (g === '' && genderFilter === '') || genderFilter === g
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              {g === '' ? 'All' : g === 'female' ? '♀ Sisters' : '♂ Brothers'}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-emerald-100 p-6 mb-6 fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-emerald-900">Advanced Filters</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                }`}
              >
                All Categories
              </button>
              {questionCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-emerald-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Filter fields */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allQuestions
                .filter(q => q.type === 'select' && (activeCategory === 'all' || q.category === activeCategory))
                .sort((a, b) => a.order - b.order)
                .map(question => (
                  <div key={question.id}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                      {question.category === 'islamic_life' && <BookOpen className="w-3 h-3" />}
                      {question.category === 'professional' && <Briefcase className="w-3 h-3" />}
                      {question.label}
                    </label>
                    <select
                      value={String(filters[question.id] || '')}
                      onChange={e => updateFilter(question.id, e.target.value || null)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all"
                    >
                      <option value="">Any</option>
                      {filterOptions[question.id]?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Results */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-emerald-100">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-emerald-900 mb-2">No profiles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSelect={onSelectProfile}
                matchScore={calculateMatchScore(profile)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
