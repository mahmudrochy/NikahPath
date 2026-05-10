import React from 'react';
import { MapPin, CheckCircle, Shield, EyeOff, Lock, Star, Heart } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  profile: UserProfile;
  onSelect: (id: string) => void;
  matchScore?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect, matchScore }) => {
  const isBlurred = profile.photoPrivacy === 'blurred' || profile.photoPrivacy === 'private';
  const isPrivate = profile.photoPrivacy === 'private';

  const avatarColors = [
    'from-emerald-600 to-emerald-800',
    'from-emerald-700 to-emerald-900',
    'from-emerald-500 to-emerald-700',
    'from-gold-400 to-gold-600',
  ];
  const colorIndex = parseInt(profile.id) % avatarColors.length;

  return (
    <div
      onClick={() => onSelect(profile.id)}
      className="group bg-white rounded-2xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
      role="article"
      aria-label={`Profile of ${profile.name}`}
    >
      {/* Photo / Avatar area */}
      <div className={`relative h-56 bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center overflow-hidden`}>
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 geometric-pattern" />
        
        {/* Avatar */}
        <div className={`relative w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 ${isBlurred ? 'photo-blur' : ''}`}>
          <span className="font-display text-4xl font-bold text-white/90">
            {profile.name[0]}
          </span>
        </div>

        {/* Match score badge */}
        {matchScore && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
            <span className="text-xs font-bold text-emerald-900">{matchScore}%</span>
          </div>
        )}

        {/* Privacy badge */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {isBlurred && (
            <span className="bg-black/40 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              {isPrivate ? <Lock className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {isPrivate ? 'Private' : 'Blurred'}
            </span>
          )}
          {profile.verified && (
            <span className="bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Wali badge */}
        {profile.waliIncluded && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-gold-400/90 backdrop-blur-sm text-emerald-900 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Wali
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-lg font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-500">{profile.age} years old</p>
          </div>
          <Heart className="w-5 h-5 text-gray-300 group-hover:text-gold-400 transition-colors" />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {profile.location}
        </div>

        {/* Key attributes */}
        <div className="flex flex-wrap gap-1.5">
          {profile.answers.madhhab && (
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium">
              {profile.answers.madhhab as string}
            </span>
          )}
          {profile.answers.profession && (
            <span className="px-2.5 py-1 bg-gold-50 text-gold-700 rounded-md text-xs font-medium">
              {profile.answers.profession as string}
            </span>
          )}
          {profile.answers.education && (
            <span className="px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md text-xs font-medium">
              {profile.answers.education as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
