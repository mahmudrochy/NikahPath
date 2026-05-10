import { Question, QuestionCategory, UserProfile, WaliSettings } from './types';

// ============================================================
// DYNAMIC QUESTIONNAIRE SCHEMA
// Admin can add/remove questions without code changes
// ============================================================

export const questionCategories: QuestionCategory[] = [
  {
    id: 'islamic_life',
    name: 'Islamic Life',
    icon: '🕌',
    description: 'Your relationship with Deen and religious practices',
    order: 1,
  },
  {
    id: 'professional',
    name: 'Professional & Personal',
    icon: '💼',
    description: 'Your career, education, and personal interests',
    order: 2,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Values',
    icon: '🏡',
    description: 'Your daily habits, values, and family orientation',
    order: 3,
  },
  {
    id: 'partner_preferences',
    name: 'Ideal Partner',
    icon: '💝',
    description: 'What you\'re looking for in a life partner',
    order: 4,
  },
];

export const defaultQuestions: Question[] = [
  // --- Islamic Life ---
  { id: 'madhhab', category: 'islamic_life', label: 'School of Thought (Madhhab)', type: 'select', options: ['Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali', 'Ja\'fari', 'Not sure / Prefer not to say'], required: true, order: 1 },
  { id: 'prayer_frequency', category: 'islamic_life', label: 'How often do you pray Salah?', type: 'select', options: ['All 5 daily prayers', '3-4 prayers daily', '1-2 prayers daily', 'Occasionally', 'Not currently praying'], required: true, order: 2 },
  { id: 'quran_recitation', category: 'islamic_life', label: 'How often do you read Quran?', type: 'select', options: ['Daily', 'Weekly', 'Occasionally', 'Rarely'], required: false, order: 3 },
  { id: 'hijab_status', category: 'islamic_life', label: 'Hijab Status', type: 'select', options: ['Always wear hijab', 'Sometimes wear hijab', 'Do not wear hijab', 'Not applicable'], required: false, order: 4 },
  { id: 'beard_status', category: 'islamic_life', label: 'Beard Status', type: 'select', options: ['Full beard', 'Trimmed beard', 'Clean shaven', 'Not applicable'], required: false, order: 5 },
  { id: 'halal_diet', category: 'islamic_life', label: 'Do you strictly follow a Halal diet?', type: 'boolean', required: true, order: 6 },
  { id: 'islamic_knowledge', category: 'islamic_life', label: 'How would you rate your Islamic knowledge?', type: 'range', required: false, order: 7, min: 1, max: 10 },
  { id: 'mosque_attendance', category: 'islamic_life', label: 'How often do you attend the mosque?', type: 'select', options: ['Daily', 'Weekly (Jumu\'ah)', 'Occasionally', 'Rarely'], required: false, order: 8 },

  // --- Professional & Personal ---
  { id: 'education', category: 'professional', label: 'Highest Education Level', type: 'select', options: ['High School', 'Associate\'s', 'Bachelor\'s', 'Master\'s', 'PhD / Doctorate', 'Professional Degree', 'Self-taught'], required: true, order: 1 },
  { id: 'profession', category: 'professional', label: 'Profession / Occupation', type: 'text', required: true, placeholder: 'e.g., Software Engineer, Teacher, Doctor', order: 2 },
  { id: 'career_goals', category: 'professional', label: 'What are your career goals?', type: 'textarea', required: false, placeholder: 'Share your professional aspirations...', order: 3 },
  { id: 'income_range', category: 'professional', label: 'Income Range', type: 'select', options: ['Under $30,000', '$30,000 - $60,000', '$60,000 - $100,000', '$100,000+', 'Prefer not to say'], required: false, order: 4 },
  { id: 'hobbies', category: 'professional', label: 'Hobbies & Interests', type: 'multiselect', options: ['Reading', 'Sports', 'Cooking', 'Travel', 'Technology', 'Art', 'Music', 'Gardening', 'Volunteering', 'Photography', 'Writing', 'Fitness'], required: false, order: 5 },
  { id: 'languages', category: 'professional', label: 'Languages Spoken', type: 'multiselect', options: ['English', 'Arabic', 'Urdu', 'Bengali', 'Turkish', 'French', 'Spanish', 'Malay', 'Indonesian', 'Other'], required: false, order: 6 },

  // --- Lifestyle & Values ---
  { id: 'family_values', category: 'lifestyle', label: 'How important is family to you?', type: 'range', required: true, order: 1, min: 1, max: 10 },
  { id: 'children_desired', category: 'lifestyle', label: 'Do you want children?', type: 'select', options: ['Yes, definitely', 'Yes, but not immediately', 'Undecided', 'No'], required: true, order: 2 },
  { id: 'smoking', category: 'lifestyle', label: 'Do you smoke?', type: 'select', options: ['Never', 'Occasionally', 'Former smoker', 'Current smoker'], required: false, order: 3 },
  { id: 'social_media', category: 'lifestyle', label: 'How active are you on social media?', type: 'select', options: ['Very active', 'Moderately active', 'Minimal use', 'Not active at all'], required: false, order: 4 },
  { id: 'living_preference', category: 'lifestyle', label: 'Preferred Living Arrangement', type: 'select', options: ['Independent', 'With extended family', 'Open to either'], required: false, order: 5 },
  { id: 'relocation', category: 'lifestyle', label: 'Are you open to relocating for marriage?', type: 'boolean', required: false, order: 6 },
  { id: 'personality_traits', category: 'lifestyle', label: 'How would you describe your personality?', type: 'multiselect', options: ['Introverted', 'Extroverted', 'Ambivert', 'Calm', 'Ambitious', 'Spiritual', 'Adventurous', 'Homebody', 'Analytical', 'Creative'], required: false, order: 7 },

  // --- Ideal Partner ---
  { id: 'partner_age_min', category: 'partner_preferences', label: 'Minimum Preferred Age', type: 'range', required: true, order: 1, min: 18, max: 60 },
  { id: 'partner_age_max', category: 'partner_preferences', label: 'Maximum Preferred Age', type: 'range', required: true, order: 2, min: 18, max: 60 },
  { id: 'partner_madhhab', category: 'partner_preferences', label: 'Preferred School of Thought', type: 'select', options: ['Any', 'Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali', 'Ja\'fari'], required: false, order: 3 },
  { id: 'partner_prayer', category: 'partner_preferences', label: 'Partner\'s Prayer Commitment', type: 'select', options: ['Must pray 5 times', 'Prays regularly', 'Somehow flexible', 'Not important'], required: true, order: 4 },
  { id: 'partner_education', category: 'partner_preferences', label: 'Minimum Education Level', type: 'select', options: ['No minimum', 'High School', 'Bachelor\'s', 'Master\'s', 'PhD'], required: false, order: 5 },
  { id: 'partner_profession', category: 'partner_preferences', label: 'Preferred Profession (optional)', type: 'text', required: false, placeholder: 'e.g., Any, Healthcare, Education', order: 6 },
  { id: 'partner_location', category: 'partner_preferences', label: 'Preferred Location', type: 'text', required: false, placeholder: 'e.g., Victoria, Melbourne, Anywhere', order: 7 },
  { id: 'partner_children', category: 'partner_preferences', label: 'Partner\'s stance on children', type: 'select', options: ['Must want children', 'Open either way', "Don't want children"], required: false, order: 8 },
];

// ============================================================
// SAMPLE PROFILES
// ============================================================

export const sampleProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Aisha R.',
    age: 26,
    gender: 'female',
    location: 'Melbourne, VIC',
    photoUrl: '',
    photoPrivacy: 'blurred',
    verified: true,
    waliIncluded: true,
    bio: 'A compassionate and driven professional who values both Deen and Dunya. Looking for a partner who shares my love for knowledge and community service.',
    createdAt: '2024-01-15',
    answers: {
      madhhab: 'Hanafi',
      prayer_frequency: 'All 5 daily prayers',
      quran_recitation: 'Daily',
      hijab_status: 'Always wear hijab',
      halal_diet: true,
      islamic_knowledge: 8,
      mosque_attendance: 'Weekly (Jumu\'ah)',
      education: 'Master\'s',
      profession: 'Software Engineer',
      career_goals: 'Lead a team developing technology that benefits the Muslim community',
      income_range: '$60,000 - $100,000',
      hobbies: ['Reading', 'Technology', 'Volunteering', 'Cooking'],
      languages: ['English', 'Arabic', 'Urdu'],
      family_values: 9,
      children_desired: 'Yes, definitely',
      smoking: 'Never',
      social_media: 'Minimal use',
      living_preference: 'Independent',
      relocation: true,
      personality_traits: ['Ambivert', 'Ambitious', 'Spiritual', 'Analytical'],
      partner_age_min: 26,
      partner_age_max: 35,
      partner_madhhab: 'Any',
      partner_prayer: 'Must pray 5 times',
      partner_education: 'Bachelor\'s',
      partner_profession: 'Any',
      partner_location: 'Melbourne',
      partner_children: 'Must want children',
    },
  },
  {
    id: '2',
    name: 'Omar K.',
    age: 30,
    gender: 'male',
    location: 'Sydney, NSW',
    photoUrl: '',
    photoPrivacy: 'blurred',
    verified: true,
    waliIncluded: false,
    bio: 'Dedicated healthcare professional seeking a partner who understands the importance of serving others. I value honesty, kindness, and a strong connection to our faith.',
    createdAt: '2024-02-20',
    answers: {
      madhhab: 'Shafi\'i',
      prayer_frequency: 'All 5 daily prayers',
      quran_recitation: 'Daily',
      beard_status: 'Full beard',
      halal_diet: true,
      islamic_knowledge: 7,
      mosque_attendance: 'Daily',
      education: 'PhD / Doctorate',
      profession: 'Doctor',
      career_goals: 'Specialize in community health and establish a clinic serving underserved areas',
      income_range: '$100,000+',
      hobbies: ['Reading', 'Sports', 'Volunteering', 'Fitness'],
      languages: ['English', 'Arabic', 'French'],
      family_values: 10,
      children_desired: 'Yes, definitely',
      smoking: 'Never',
      social_media: 'Minimal use',
      living_preference: 'Independent',
      relocation: false,
      personality_traits: ['Calm', 'Ambitious', 'Spiritual', 'Analytical'],
      partner_age_min: 22,
      partner_age_max: 30,
      partner_madhhab: 'Any',
      partner_prayer: 'Must pray 5 times',
      partner_education: 'Bachelor\'s',
      partner_profession: 'Healthcare',
      partner_location: 'Sydney',
      partner_children: 'Must want children',
    },
  },
  {
    id: '3',
    name: 'Fatima M.',
    age: 24,
    gender: 'female',
    location: 'Perth, WA',
    photoUrl: '',
    photoPrivacy: 'private',
    verified: true,
    waliIncluded: true,
    bio: 'Teacher by profession, lifelong learner by passion. I believe in building a home filled with barakah, laughter, and mutual respect.',
    createdAt: '2024-03-10',
    answers: {
      madhhab: 'Hanafi',
      prayer_frequency: '3-4 prayers daily',
      quran_recitation: 'Weekly',
      hijab_status: 'Sometimes wear hijab',
      halal_diet: true,
      islamic_knowledge: 6,
      mosque_attendance: 'Occasionally',
      education: 'Bachelor\'s',
      profession: 'Teacher',
      career_goals: 'Become a principal and develop curriculum that integrates Islamic values',
      income_range: '$60,000 - $100,000',
      hobbies: ['Reading', 'Cooking', 'Gardening', 'Writing'],
      languages: ['English', 'Urdu'],
      family_values: 10,
      children_desired: 'Yes, definitely',
      smoking: 'Never',
      social_media: 'Moderately active',
      living_preference: 'With extended family',
      relocation: true,
      personality_traits: ['Introverted', 'Calm', 'Creative', 'Homebody'],
      partner_age_min: 25,
      partner_age_max: 38,
      partner_madhhab: 'Hanafi',
      partner_prayer: 'Prays regularly',
      partner_education: 'Bachelor\'s',
      partner_profession: 'Any',
      partner_location: 'Perth',
      partner_children: 'Must want children',
    },
  },
  {
    id: '4',
    name: 'Yusuf A.',
    age: 28,
    gender: 'male',
    location: 'Brisbane, QLD',
    photoUrl: '',
    photoPrivacy: 'blurred',
    verified: false,
    waliIncluded: false,
    bio: 'Entrepreneur with a passion for halal business ventures. Seeking a partner who supports my ambitions while maintaining our Islamic values at the center of our home.',
    createdAt: '2024-04-05',
    answers: {
      madhhab: 'Hanbali',
      prayer_frequency: 'All 5 daily prayers',
      quran_recitation: 'Weekly',
      beard_status: 'Trimmed beard',
      halal_diet: true,
      islamic_knowledge: 7,
      mosque_attendance: 'Weekly (Jumu\'ah)',
      education: 'Bachelor\'s',
      profession: 'Entrepreneur',
      career_goals: 'Build a portfolio of halal businesses that create jobs for the Muslim community',
      income_range: '$100,000+',
      hobbies: ['Sports', 'Travel', 'Technology', 'Photography'],
      languages: ['English', 'Arabic'],
      family_values: 8,
      children_desired: 'Yes, but not immediately',
      smoking: 'Never',
      social_media: 'Moderately active',
      living_preference: 'Independent',
      relocation: true,
      personality_traits: ['Extroverted', 'Ambitious', 'Adventurous', 'Creative'],
      partner_age_min: 22,
      partner_age_max: 30,
      partner_madhhab: 'Any',
      partner_prayer: 'Must pray 5 times',
      partner_education: 'No minimum',
      partner_profession: 'Any',
      partner_location: 'Anywhere',
      partner_children: 'Open either way',
    },
  },
  {
    id: '5',
    name: 'Maryam S.',
    age: 27,
    gender: 'female',
    location: 'Adelaide, SA',
    photoUrl: '',
    photoPrivacy: 'blurred',
    verified: true,
    waliIncluded: true,
    bio: 'Pharmacist who finds joy in helping others. I am looking for a God-conscious partner who values family, kindness, and continuous growth together.',
    createdAt: '2024-05-12',
    answers: {
      madhhab: 'Maliki',
      prayer_frequency: 'All 5 daily prayers',
      quran_recitation: 'Daily',
      hijab_status: 'Always wear hijab',
      halal_diet: true,
      islamic_knowledge: 9,
      mosque_attendance: 'Weekly (Jumu\'ah)',
      education: 'Professional Degree',
      profession: 'Pharmacist',
      career_goals: 'Open a community pharmacy with free health screening for Muslims',
      income_range: '$60,000 - $100,000',
      hobbies: ['Reading', 'Cooking', 'Volunteering', 'Art'],
      languages: ['English', 'Arabic', 'French'],
      family_values: 10,
      children_desired: 'Yes, definitely',
      smoking: 'Never',
      social_media: 'Minimal use',
      living_preference: 'Independent',
      relocation: false,
      personality_traits: ['Introverted', 'Calm', 'Spiritual', 'Analytical'],
      partner_age_min: 27,
      partner_age_max: 40,
      partner_madhhab: 'Any',
      partner_prayer: 'Must pray 5 times',
      partner_education: 'Bachelor\'s',
      partner_profession: 'Any',
      partner_location: 'Adelaide',
      partner_children: 'Must want children',
    },
  },
  {
    id: '6',
    name: 'Ibrahim H.',
    age: 32,
    gender: 'male',
    location: 'Melbourne, VIC',
    photoUrl: '',
    photoPrivacy: 'public',
    verified: true,
    waliIncluded: true,
    bio: 'University lecturer in Islamic Studies. I am passionate about education, community building, and raising the next generation of conscious Muslims.',
    createdAt: '2024-06-01',
    answers: {
      madhhab: 'Shafi\'i',
      prayer_frequency: 'All 5 daily prayers',
      quran_recitation: 'Daily',
      beard_status: 'Full beard',
      halal_diet: true,
      islamic_knowledge: 10,
      mosque_attendance: 'Daily',
      education: 'PhD / Doctorate',
      profession: 'University Lecturer',
      career_goals: 'Publish research on contemporary Islamic ethics and establish an Islamic studies institute',
      income_range: '$60,000 - $100,000',
      hobbies: ['Reading', 'Writing', 'Volunteering', 'Art'],
      languages: ['English', 'Arabic', 'Turkish', 'Urdu'],
      family_values: 10,
      children_desired: 'Yes, definitely',
      smoking: 'Never',
      social_media: 'Minimal use',
      living_preference: 'Open to either',
      relocation: true,
      personality_traits: ['Ambivert', 'Calm', 'Spiritual', 'Analytical', 'Creative'],
      partner_age_min: 22,
      partner_age_max: 32,
      partner_madhhab: 'Any',
      partner_prayer: 'Must pray 5 times',
      partner_education: 'Master\'s',
      partner_profession: 'Education',
      partner_location: 'Melbourne',
      partner_children: 'Must want children',
    },
  },
];

// ============================================================
// ADMIN: DEFAULT WALI SETTINGS
// ============================================================

export const defaultWaliSettings: WaliSettings = {
  enabled: false,
  waliName: '',
  waliEmail: '',
  waliRelationship: 'Father',
};

// ============================================================
// STATE MANAGEMENT (In-memory, replaceable with backend)
// ============================================================

let _questions: Question[] = [...defaultQuestions];
let _profiles: UserProfile[] = [...sampleProfiles];
let _nextId = 7;

export const getQuestions = (): Question[] => [..._questions];
export const setQuestions = (q: Question[]) => { _questions = [...q]; };

export const getProfiles = (): UserProfile[] => [..._profiles];
export const addProfile = (profile: Omit<UserProfile, 'id' | 'createdAt'>) => {
  const newProfile: UserProfile = {
    ...profile,
    id: String(_nextId++),
    createdAt: new Date().toISOString().split('T')[0],
  };
  _profiles.push(newProfile);
  return newProfile;
};

export const getProfileById = (id: string): UserProfile | undefined =>
  _profiles.find(p => p.id === id);

export const updateProfile = (id: string, updates: Partial<UserProfile>) => {
  const idx = _profiles.findIndex(p => p.id === id);
  if (idx !== -1) {
    _profiles[idx] = { ..._profiles[idx], ...updates };
  }
};

// Admin: Add a new question dynamically
export const addQuestion = (question: Question) => {
  _questions.push(question);
  return question;
};

// Admin: Remove a question
export const removeQuestion = (questionId: string) => {
  _questions = _questions.filter(q => q.id !== questionId);
};

// Admin: Update a question
export const updateQuestion = (questionId: string, updates: Partial<Question>) => {
  const idx = _questions.findIndex(q => q.id === questionId);
  if (idx !== -1) {
    _questions[idx] = { ..._questions[idx], ...updates };
  }
};

// Get questions for a category
export const getQuestionsByCategory = (categoryId: string): Question[] =>
  _questions.filter(q => q.category === categoryId).sort((a, b) => a.order - b.order);

// Advanced filtering engine
export const filterProfiles = (
  profiles: UserProfile[],
  filters: Record<string, unknown>,
  gender?: string
): UserProfile[] => {
  return profiles.filter(profile => {
    // Gender filter
    if (gender && profile.gender !== gender) return false;

    for (const [key, value] of Object.entries(filters)) {
      if (value === null || value === undefined || value === '' || value === 'Any' || value === 'No minimum') continue;

      const answer = profile.answers[key];
      if (answer === undefined || answer === null) continue;

      // Array matching (multiselect)
      if (Array.isArray(value)) {
        if (Array.isArray(answer)) {
          const hasMatch = value.some(v => answer.includes(v));
          if (!hasMatch) return false;
        } else {
          if (!value.includes(String(answer))) return false;
        }
        continue;
      }

      // Range comparison
      if (typeof value === 'number') {
        if (typeof answer === 'number') {
          if (key.includes('min') && answer < value) return false;
          if (key.includes('max') && answer > value) return false;
          if (!key.includes('min') && !key.includes('max')) {
            if (answer !== value) return false;
          }
        }
        continue;
      }

      // Boolean
      if (typeof value === 'boolean') {
        if (answer !== value) return false;
        continue;
      }

      // String matching (case-insensitive partial match for text fields)
      if (typeof value === 'string') {
        const answerStr = String(answer).toLowerCase();
        const valueStr = value.toLowerCase();
        if (!answerStr.includes(valueStr)) return false;
        continue;
      }
    }
    return true;
  });
};
