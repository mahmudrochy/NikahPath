import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Check, Shield, Eye, EyeOff, UserPlus, MessageSquare } from 'lucide-react';
import { RegistrationState, Question, Page, PhotoPrivacy } from '../types';
import { questionCategories, getQuestionsByCategory } from '../data';

interface RegistrationWizardProps {
  onComplete: (state: RegistrationState) => void;
  onNavigate: (page: Page) => void;
}

const initialRegistrationState: RegistrationState = {
  currentStep: 0,
  currentCategoryIndex: 0,
  basicInfo: { name: '', age: '', gender: '', location: '', email: '', bio: '' },
  answers: {},
  photoPrivacy: 'blurred',
  waliIncluded: false,
  photoHasAccessRequests: [],
};

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onComplete, onNavigate }) => {
  const [state, setState] = useState<RegistrationState>(initialRegistrationState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 0: Basic Info, Steps 1-4: Questionnaire Categories, Step 5: Privacy Settings
  const totalSteps = 2 + questionCategories.length; // Basic + Categories + Privacy
  const currentStep = state.currentStep;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentCategory = currentStep >= 1 && currentStep <= questionCategories.length
    ? questionCategories[currentStep - 1]
    : null;

  const currentQuestions = currentCategory
    ? getQuestionsByCategory(currentCategory.id)
    : [];

  const validateBasicInfo = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!state.basicInfo.name.trim()) newErrors.name = 'Name is required';
    if (!state.basicInfo.age || parseInt(state.basicInfo.age) < 18) newErrors.age = 'Must be 18 or older';
    if (!state.basicInfo.gender) newErrors.gender = 'Please select your gender';
    if (!state.basicInfo.location.trim()) newErrors.location = 'Location is required';
    if (!state.basicInfo.email.includes('@')) newErrors.email = 'Valid email required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAnswers = (): boolean => {
    const newErrors: Record<string, string> = {};
    currentQuestions.forEach(q => {
      if (q.required) {
        const val = state.answers[q.id];
        if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
          newErrors[q.id] = `${q.label} is required`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && !validateBasicInfo()) return;
    if (currentStep >= 1 && currentStep <= questionCategories.length && !validateAnswers()) return;
    setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, totalSteps - 1) }));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
    setErrors({});
  };

  const handleComplete = () => {
    onComplete(state);
  };

  const updateBasicInfo = (field: string, value: string) => {
    setState(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const updateAnswer = (questionId: string, value: string | string[] | number | boolean) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
    setErrors(prev => ({ ...prev, [questionId]: '' }));
  };

  // Render step indicators
  const stepIndicators = useMemo(() => {
    return [
      { label: 'Basic Info', done: currentStep > 0 },
      ...questionCategories.map((cat, i) => ({ label: cat.name, done: currentStep > i + 1 })),
      { label: 'Privacy', done: currentStep > questionCategories.length },
    ];
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-emerald-50/30 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-emerald-800">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-emerald-600">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-700 to-gold-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-2">
            {stepIndicators.map((step, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === currentStep
                    ? 'bg-emerald-800 text-white'
                    : step.done
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.done && <Check className="w-3 h-3" />}
                {step.label}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100/50 overflow-hidden fade-in">
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center">
                  <span className="text-gold-400 text-xl font-bold">1</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-emerald-900">Basic Information</h2>
                  <p className="text-gray-500 text-sm mt-1">Let's start with the essentials</p>
                </div>
              </div>

              <div className="space-y-5">
                <FormField label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={state.basicInfo.name}
                    onChange={e => updateBasicInfo('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30"
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Age" error={errors.age}>
                    <input
                      type="number"
                      min="18"
                      max="80"
                      value={state.basicInfo.age}
                      onChange={e => updateBasicInfo('age', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30"
                      placeholder="25"
                      aria-required="true"
                      aria-invalid={!!errors.age}
                    />
                  </FormField>

                  <FormField label="Gender" error={errors.gender}>
                    <div className="grid grid-cols-2 gap-3">
                      {(['male', 'female'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => updateBasicInfo('gender', g)}
                          className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                            state.basicInfo.gender === g
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                              : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                          }`}
                          aria-pressed={state.basicInfo.gender === g}
                        >
                          {g === 'male' ? '♂ Male' : '♀ Female'}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>

                <FormField label="Location" error={errors.location}>
                  <input
                    type="text"
                    value={state.basicInfo.location}
                    onChange={e => updateBasicInfo('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30"
                    placeholder="City, State"
                    aria-required="true"
                    aria-invalid={!!errors.location}
                  />
                </FormField>

                <FormField label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={state.basicInfo.email}
                    onChange={e => updateBasicInfo('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30"
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                </FormField>

                <FormField label="Short Bio" optional>
                  <textarea
                    value={state.basicInfo.bio}
                    onChange={e => updateBasicInfo('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30 resize-none"
                    placeholder="Tell us a little about yourself..."
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* Steps 1-N: Questionnaire Categories */}
          {currentCategory && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{currentCategory.icon}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-emerald-900">{currentCategory.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{currentCategory.description}</p>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                {currentQuestions.map(question => (
                  <QuestionField
                    key={question.id}
                    question={question}
                    value={state.answers[question.id]}
                    error={errors[question.id]}
                    onChange={(val) => updateAnswer(question.id, val)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Final Step: Privacy Settings */}
          {currentStep === totalSteps - 1 && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-900" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-emerald-900">Privacy & Safety</h2>
                  <p className="text-gray-500 text-sm mt-1">Control your visibility and safety settings</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Photo Privacy */}
                <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Photo Privacy
                  </h3>
                  <div className="space-y-3">
                    {([
                      { value: 'public' as PhotoPrivacy, label: 'Public', desc: 'Visible to all verified members', icon: <Eye className="w-4 h-4" /> },
                      { value: 'blurred' as PhotoPrivacy, label: 'Blurred by Default', desc: 'Members must request access to view', icon: <EyeOff className="w-4 h-4" /> },
                      { value: 'private' as PhotoPrivacy, label: 'Private', desc: 'Only visible after mutual match', icon: <Shield className="w-4 h-4" /> },
                    ]).map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setState(prev => ({ ...prev, photoPrivacy: opt.value }))}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          state.photoPrivacy === opt.value
                            ? 'border-emerald-600 bg-white shadow-md'
                            : 'border-gray-200 hover:border-emerald-200'
                        }`}
                        aria-pressed={state.photoPrivacy === opt.value}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          state.photoPrivacy === opt.value ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {opt.icon}
                        </div>
                        <div>
                          <p className="font-medium text-emerald-900">{opt.label}</p>
                          <p className="text-xs text-gray-500">{opt.desc}</p>
                        </div>
                        {state.photoPrivacy === opt.value && (
                          <Check className="w-5 h-5 text-emerald-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wali Integration */}
                <div className="p-5 rounded-xl bg-gold-50 border border-gold-200">
                  <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-gold-600" />
                    Wali / Chaperone Integration
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Include a trusted third party (Wali) in your conversations for added peace of mind and Islamic compliance.
                  </p>
                  <button
                    onClick={() => setState(prev => ({ ...prev, waliIncluded: !prev.waliIncluded }))}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      state.waliIncluded
                        ? 'border-gold-400 bg-white shadow-md'
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      state.waliIncluded ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-emerald-900">
                        {state.waliIncluded ? 'Wali Enabled' : 'Enable Wali Integration'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {state.waliIncluded ? 'Your Wali will be included in chats' : 'Your Wali will oversee conversations'}
                      </p>
                    </div>
                    {state.waliIncluded && (
                      <Check className="w-5 h-5 text-gold-600 ml-auto" />
                    )}
                  </button>
                </div>

                {/* Summary */}
                <div className="p-5 rounded-xl bg-emerald-800 text-white">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-gold-400" />
                    Registration Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-emerald-300">Name</p>
                      <p className="font-medium">{state.basicInfo.name || '—'}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300">Age</p>
                      <p className="font-medium">{state.basicInfo.age || '—'}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300">Location</p>
                      <p className="font-medium">{state.basicInfo.location || '—'}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300">Photo Privacy</p>
                      <p className="font-medium capitalize">{state.photoPrivacy}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300">Wali</p>
                      <p className="font-medium">{state.waliIncluded ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                      <p className="text-emerald-300">Questions Answered</p>
                      <p className="font-medium">{Object.keys(state.answers).length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="px-6 sm:px-8 py-5 bg-stone-50/80 border-t border-emerald-100 flex items-center justify-between">
            <button
              onClick={currentStep === 0 ? () => onNavigate('home') : handleBack}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-emerald-800 rounded-lg hover:bg-emerald-50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-600 shadow-md transition-all"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-emerald-900 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl hover:from-gold-300 hover:to-gold-400 shadow-lg hover:shadow-xl transition-all"
              >
                Complete Registration
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components

interface FormFieldProps {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, optional, children }) => (
  <div>
    <label className="block text-sm font-medium text-emerald-900 mb-2">
      {label} {optional && <span className="text-gray-400 font-normal">(optional)</span>}
    </label>
    {children}
    {error && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">{error}</p>}
  </div>
);

interface QuestionFieldProps {
  question: Question;
  value?: string | string[] | number | boolean;
  error?: string;
  onChange: (value: string | string[] | number | boolean) => void;
}

const QuestionField: React.FC<QuestionFieldProps> = ({ question, value, error, onChange }) => {
  switch (question.type) {
    case 'text':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <input
            type="text"
            value={typeof value === 'string' ? value : ''}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30"
            placeholder={question.placeholder}
          />
        </FormField>
      );

    case 'textarea':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <textarea
            value={typeof value === 'string' ? value : ''}
            onChange={e => onChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30 resize-none"
            placeholder={question.placeholder}
          />
        </FormField>
      );

    case 'select':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <select
            value={typeof value === 'string' ? value : ''}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-emerald-50/30 appearance-none"
          >
            <option value="">Select an option...</option>
            {question.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </FormField>
      );

    case 'multiselect':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <div className="flex flex-wrap gap-2">
            {question.options?.map(opt => {
              const selected = Array.isArray(value) && value.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    const current = Array.isArray(value) ? value : [];
                    const newVal = selected
                      ? current.filter(v => v !== opt)
                      : [...current, opt];
                    onChange(newVal);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}
                  aria-pressed={selected}
                >
                  {selected && '✓ '}{opt}
                </button>
              );
            })}
          </div>
        </FormField>
      );

    case 'range':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <div className="space-y-3">
            <input
              type="range"
              min={question.min || 1}
              max={question.max || 10}
              value={typeof value === 'number' ? value : (question.min || 1)}
              onChange={e => onChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{question.min || 1}</span>
              <span className="text-emerald-700 font-bold text-base">
                {typeof value === 'number' ? value : (question.min || 1)} / {question.max || 10}
              </span>
              <span>{question.max || 10}</span>
            </div>
          </div>
        </FormField>
      );

    case 'boolean':
      return (
        <FormField label={question.label} error={error} optional={!question.required}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Yes', val: true },
              { label: 'No', val: false },
            ].map(opt => (
              <button
                key={String(opt.val)}
                onClick={() => onChange(opt.val)}
                className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                  value === opt.val
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                }`}
                aria-pressed={value === opt.val}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>
      );

    default:
      return null;
  }
};
