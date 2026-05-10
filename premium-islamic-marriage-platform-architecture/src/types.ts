export type QuestionType = 'text' | 'select' | 'multiselect' | 'range' | 'boolean' | 'textarea';

export interface Question {
  id: string;
  category: string;
  label: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  placeholder?: string;
  helpText?: string;
  order: number;
  min?: number;
  max?: number;
}

export interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
}

export type PhotoPrivacy = 'public' | 'blurred' | 'private';
export type Gender = 'male' | 'female';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  location: string;
  photoUrl: string;
  photoPrivacy: PhotoPrivacy;
  answers: Record<string, string | string[] | number | boolean>;
  createdAt: string;
  verified: boolean;
  waliIncluded: boolean;
  bio: string;
}

export interface FilterState {
  [key: string]: string | string[] | number | boolean | null;
}

export interface RegistrationState {
  currentStep: number;
  currentCategoryIndex: number;
  basicInfo: {
    name: string;
    age: string;
    gender: Gender | '';
    location: string;
    email: string;
    bio: string;
  };
  answers: Record<string, string | string[] | number | boolean>;
  photoPrivacy: PhotoPrivacy;
  waliIncluded: boolean;
  photoHasAccessRequests: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  waliNotified: boolean;
}

export interface WaliSettings {
  enabled: boolean;
  waliName: string;
  waliEmail: string;
  waliRelationship: string;
}

export type Page = 'home' | 'register' | 'browse' | 'profile' | 'admin' | 'chat';
