import React, { useState } from 'react';
import { ArrowLeft, MapPin, CheckCircle, Shield, BookOpen, Briefcase, Home, Heart, User, MessageSquare, Eye, Lock, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { getProfileById, getQuestions, questionCategories } from '../data';

interface ProfileDetailProps {
  profileId: string;
  onBack: () => void;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({ profileId, onBack }) => {
  const profile = getProfileById(profileId);
  const questions = getQuestions();
  const [showChat, setShowChat] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'NikahPath',
      text: 'Assalamu Alaikum! Remember to keep conversations respectful and purposeful.',
      timestamp: new Date().toISOString(),
      waliNotified: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!profile) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Profile not found</p>
          <button onClick={onBack} className="px-6 py-2.5 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const avatarColors = [
    'from-emerald-600 to-emerald-800',
    'from-emerald-700 to-emerald-900',
    'from-emerald-500 to-emerald-700',
    'from-gold-400 to-gold-600',
  ];
  const colorIndex = parseInt(profile.id) % avatarColors.length;
  const isBlurred = profile.photoPrivacy !== 'public';
  const isPrivate = profile.photoPrivacy === 'private';

  // Group answers by category
  const answersByCategory = questionCategories.map(cat => ({
    ...cat,
    questions: questions
      .filter(q => q.category === cat.id && profile.answers[q.id] !== undefined && profile.answers[q.id] !== '')
      .map(q => ({
        ...q,
        value: profile.answers[q.id],
      })),
  }));

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: String(chatMessages.length + 1),
      senderId: 'you',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      waliNotified: profile.waliIncluded,
    };
    setChatMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-800 mb-6 transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to browsing
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-emerald-100/80 shadow-lg overflow-hidden mb-6">
          <div className={`relative h-48 sm:h-64 bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center`}>
            <div className="absolute inset-0 geometric-pattern" />
            <div className={`relative w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 ${isBlurred ? 'photo-blur' : ''}`}>
              <span className="font-display text-6xl font-bold text-white/90">{profile.name[0]}</span>
            </div>
            {isBlurred && !accessRequested && (
              <button
                onClick={() => setAccessRequested(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium text-emerald-800 hover:bg-white transition-colors shadow-lg flex items-center gap-2"
              >
                {isPrivate ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPrivate ? 'Request Photo Access' : 'Request to Unblur Photo'}
              </button>
            )}
            {accessRequested && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold-400/90 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium text-emerald-900 shadow-lg">
                ✓ Access Requested — Awaiting Response
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold text-emerald-900">{profile.name}</h1>
                  {profile.verified && (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {profile.age} years old
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {profile.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {profile.waliIncluded && (
                  <span className="bg-gold-100 text-gold-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <Shield className="w-4 h-4" /> Wali Active
                  </span>
                )}
              </div>
            </div>

            {profile.bio && (
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{profile.bio}"</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowChat(!showChat)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                {showChat ? 'Close Chat' : 'Send Interest'}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-200 text-emerald-800 rounded-xl font-medium hover:bg-emerald-50 transition-all">
                <Heart className="w-4 h-4" />
                Favorite
              </button>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="bg-white rounded-2xl border border-emerald-100/80 shadow-lg overflow-hidden mb-6 fade-in">
            <div className="p-5 border-b border-emerald-100 bg-emerald-50/50">
              <h3 className="font-display font-bold text-emerald-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                Conversation with {profile.name}
              </h3>
              {profile.waliIncluded && (
                <p className="text-xs text-gold-600 mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Wali is included in this conversation
                </p>
              )}
            </div>
            <div className="p-5 max-h-80 overflow-y-auto space-y-3">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.senderId === 'you' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
                    msg.senderId === 'you'
                      ? 'bg-emerald-800 text-white rounded-br-md'
                      : msg.senderId === 'system'
                      ? 'bg-gold-50 text-gold-800 border border-gold-200'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    {msg.senderId !== 'you' && (
                      <p className="text-xs font-medium mb-0.5 text-emerald-600">{msg.senderName}</p>
                    )}
                    <p>{msg.text}</p>
                  </div>
                  {msg.waliNotified && (
                    <p className="text-xs text-gold-500 mt-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Wali notified
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-emerald-100 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 bg-emerald-50/30"
              />
              <button
                onClick={handleSendMessage}
                className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Detailed Answers */}
        <div className="space-y-6">
          {answersByCategory.map(cat => (
            <div key={cat.id} className="bg-white rounded-2xl border border-emerald-100/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-emerald-50 bg-emerald-50/30">
                <h3 className="font-display text-lg font-bold text-emerald-900 flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4">
                {cat.questions.map(q => (
                  <div key={q.id} className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      {q.category === 'islamic_life' && <BookOpen className="w-3 h-3 text-emerald-500" />}
                      {q.category === 'professional' && <Briefcase className="w-3 h-3 text-gold-500" />}
                      {q.category === 'lifestyle' && <Home className="w-3 h-3 text-emerald-500" />}
                      {q.label}
                    </label>
                    <p className="text-sm font-medium text-emerald-900">
                      {Array.isArray(q.value) ? q.value.join(', ') : String(q.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
