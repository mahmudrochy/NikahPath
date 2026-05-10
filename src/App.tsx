import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { RegistrationWizard } from './components/RegistrationWizard';
import { BrowsePage } from './components/BrowsePage';
import { ProfileDetail } from './components/ProfileDetail';
import { AdminPanel } from './components/AdminPanel';
import { Page, RegistrationState } from './types';
import { addProfile } from './data';
import { Heart } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationComplete = (state: RegistrationState) => {
    // Add the new profile to the data store
    addProfile({
      name: state.basicInfo.name,
      age: parseInt(state.basicInfo.age) || 25,
      gender: state.basicInfo.gender as 'male' | 'female',
      location: state.basicInfo.location,
      photoUrl: '',
      photoPrivacy: state.photoPrivacy,
      answers: state.answers,
      verified: false,
      waliIncluded: state.waliIncluded,
      bio: state.basicInfo.bio || 'New member on NikahPath',
    });
    setIsLoggedIn(true);
    handleNavigate('browse');
  };

  const handleBackToBrowse = () => {
    setSelectedProfileId(null);
    setCurrentPage('browse');
  };

  // Page renderer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;

      case 'register':
        return (
          <RegistrationWizard
            onComplete={handleRegistrationComplete}
            onNavigate={handleNavigate}
          />
        );

      case 'browse':
        return (
          <BrowsePage
            onSelectProfile={handleSelectProfile}
          />
        );

      case 'profile':
        return selectedProfileId ? (
          <ProfileDetail
            profileId={selectedProfileId}
            onBack={handleBackToBrowse}
          />
        ) : (
          <BrowsePage onSelectProfile={handleSelectProfile} />
        );

      case 'admin':
        return <AdminPanel />;

      case 'chat':
        return <ChatPage onNavigate={handleNavigate} />;

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
      />
      <main>{renderPage()}</main>
    </div>
  );
}

// Simple Chat Page placeholder
const ChatPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center py-20 fade-in">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gold-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-emerald-900 mb-3">Messages</h1>
          <p className="text-gray-500 mb-8">Your conversations will appear here once you connect with someone.</p>
          <button
            onClick={() => onNavigate('browse')}
            className="px-8 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-600 shadow-md transition-all"
          >
            Browse Profiles to Start Connecting
          </button>
        </div>
      </div>
    </div>
  );
};
