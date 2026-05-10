import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, BookOpen, Briefcase, Home, Heart, Code } from 'lucide-react';
import { Question, QuestionType } from '../types';
import { getQuestions, addQuestion, removeQuestion, updateQuestion, questionCategories } from '../data';

export const AdminPanel: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(getQuestions());
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'text',
    category: 'islamic_life',
    required: false,
    order: questions.length + 1,
    options: [],
  });
  const [newOption, setNewOption] = useState('');

  const categoryIcons: Record<string, React.ReactNode> = {
    islamic_life: <BookOpen className="w-4 h-4" />,
    professional: <Briefcase className="w-4 h-4" />,
    lifestyle: <Home className="w-4 h-4" />,
    partner_preferences: <Heart className="w-4 h-4" />,
  };

  const handleSaveNewQuestion = () => {
    if (!newQuestion.id || !newQuestion.label) return;
    const question: Question = {
      id: newQuestion.id,
      category: newQuestion.category || 'islamic_life',
      label: newQuestion.label || '',
      type: newQuestion.type as QuestionType || 'text',
      options: newQuestion.type === 'select' || newQuestion.type === 'multiselect'
        ? newQuestion.options || []
        : undefined,
      required: newQuestion.required || false,
      placeholder: newQuestion.placeholder,
      helpText: newQuestion.helpText,
      order: newQuestion.order || questions.length + 1,
      min: newQuestion.min,
      max: newQuestion.max,
    };
    addQuestion(question);
    setQuestions(getQuestions());
    setShowAddForm(false);
    setNewQuestion({
      type: 'text',
      category: 'islamic_life',
      required: false,
      order: questions.length + 2,
      options: [],
    });
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      removeQuestion(id);
      setQuestions(getQuestions());
    }
  };

  const handleSaveEdit = (id: string, updates: Partial<Question>) => {
    updateQuestion(id, updates);
    setQuestions(getQuestions());
    setEditingQuestion(null);
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), newOption.trim()],
    }));
    setNewOption('');
  };

  const handleRemoveOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index),
    }));
  };

  // Group by category
  const questionsByCategory = questionCategories.map(cat => ({
    ...cat,
    questions: questions.filter(q => q.category === cat.id).sort((a, b) => a.order - b.order),
  }));

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold text-emerald-900">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage dynamic questionnaire schema</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-xl font-medium text-sm hover:from-emerald-700 hover:to-emerald-600 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add New Question
          </button>
        </div>

        {/* Developer Info */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-start gap-3">
            <Code className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-2">Dynamic Schema Architecture</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed mb-3">
                Questions are stored as a JSON-based schema, allowing admins to add new fields without frontend code changes.
                Each question supports multiple types (text, select, multiselect, range, boolean, textarea) and is assigned to a category.
                The registration wizard and filtering engine automatically adapt to new questions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Text</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Select</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Multi-Select</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Range</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Boolean</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">Textarea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Question Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-lg p-6 mb-8 fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-emerald-900">Add New Question</h3>
              <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-1">Question ID *</label>
                <input
                  type="text"
                  value={newQuestion.id || ''}
                  onChange={e => setNewQuestion(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/\s+/g, '_') }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                  placeholder="e.g., relocation_willingness"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-1">Category *</label>
                <select
                  value={newQuestion.category || 'islamic_life'}
                  onChange={e => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                >
                  {questionCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-emerald-900 mb-1">Question Label *</label>
              <input
                type="text"
                value={newQuestion.label || ''}
                onChange={e => setNewQuestion(prev => ({ ...prev, label: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                placeholder="e.g., Are you willing to relocate after marriage?"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-1">Type</label>
                <select
                  value={newQuestion.type || 'text'}
                  onChange={e => setNewQuestion(prev => ({ ...prev, type: e.target.value as QuestionType }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select (Dropdown)</option>
                  <option value="multiselect">Multi-Select</option>
                  <option value="range">Range Slider</option>
                  <option value="boolean">Yes / No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-1">Required</label>
                <button
                  onClick={() => setNewQuestion(prev => ({ ...prev, required: !prev.required }))}
                  className={`w-full py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    newQuestion.required
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-gray-200 text-gray-400'
                  }`}
                >
                  {newQuestion.required ? 'Required' : 'Optional'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-1">Order</label>
                <input
                  type="number"
                  value={newQuestion.order || 1}
                  onChange={e => setNewQuestion(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                />
              </div>
            </div>

            {/* Options for select/multiselect */}
            {(newQuestion.type === 'select' || newQuestion.type === 'multiselect') && (
              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-emerald-900 mb-2">Options</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={e => setNewOption(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddOption()}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="Add an option..."
                  />
                  <button
                    onClick={handleAddOption}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(newQuestion.options || []).map((opt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      {opt}
                      <button onClick={() => handleRemoveOption(i)} className="text-emerald-600 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Range min/max */}
            {newQuestion.type === 'range' && (
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">Min Value</label>
                  <input
                    type="number"
                    value={newQuestion.min || 1}
                    onChange={e => setNewQuestion(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">Max Value</label>
                  <input
                    type="number"
                    value={newQuestion.max || 10}
                    onChange={e => setNewQuestion(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                  />
                </div>
              </div>
            )}

            {/* Placeholder */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-emerald-900 mb-1">Placeholder (optional)</label>
              <input
                type="text"
                value={newQuestion.placeholder || ''}
                onChange={e => setNewQuestion(prev => ({ ...prev, placeholder: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/30"
                placeholder="Helper text for the input field"
              />
            </div>

            <button
              onClick={handleSaveNewQuestion}
              disabled={!newQuestion.id || !newQuestion.label}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-emerald-900 font-semibold rounded-xl hover:from-gold-300 hover:to-gold-400 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Save className="w-4 h-4" />
              Add Question to Schema
            </button>
          </div>
        )}

        {/* Questions by Category */}
        {questionsByCategory.map(cat => (
          <div key={cat.id} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-700">{categoryIcons[cat.id]}</span>
              <h3 className="font-display text-lg font-bold text-emerald-900">{cat.name}</h3>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.questions.length}</span>
            </div>

            <div className="space-y-2">
              {cat.questions.map(q => (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-emerald-100/80 p-4 hover:shadow-md transition-shadow"
                >
                  {editingQuestion === q.id ? (
                    <EditInlineQuestion
                      question={q}
                      onSave={(updates) => handleSaveEdit(q.id, updates)}
                      onCancel={() => setEditingQuestion(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-emerald-900">{q.label}</span>
                          {q.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Required</span>
                          )}
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-mono">{q.type}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>ID: <code className="bg-gray-50 px-1 rounded">{q.id}</code></span>
                          {q.options && <span>Options: {q.options.length}</span>}
                          <span>Order: {q.order}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingQuestion(q.id)}
                          className="p-2 hover:bg-emerald-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-colors"
                          aria-label="Edit question"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Delete question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline edit component
const EditInlineQuestion: React.FC<{
  question: Question;
  onSave: (updates: Partial<Question>) => void;
  onCancel: () => void;
}> = ({ question, onSave, onCancel }) => {
  const [label, setLabel] = useState(question.label);
  const [required, setRequired] = useState(question.required);
  const [order, setOrder] = useState(question.order);

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-emerald-300 text-sm font-medium"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={required}
            onChange={e => setRequired(e.target.checked)}
            className="rounded border-emerald-300 text-emerald-600"
          />
          Required
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Order:</span>
          <input
            type="number"
            value={order}
            onChange={e => setOrder(parseInt(e.target.value))}
            className="w-16 px-2 py-1 rounded border border-emerald-300 text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ label, required, order })}
          className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
