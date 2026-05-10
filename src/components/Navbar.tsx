import React, { useState } from 'react';
import { Menu, X, User, Search, Shield, Settings, MessageSquare, Heart } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isLoggedIn }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: Page; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Heart className="w-4 h-4" /> },
    { label: 'Browse', page: 'browse', icon: <Search className="w-4 h-4" /> },
    ...(isLoggedIn ? [
      { label: 'Messages', page: 'chat' as Page, icon: <MessageSquare className="w-4 h-4" /> },
      { label: 'My Profile', page: 'profile' as Page, icon: <User className="w-4 h-4" /> },
      { label: 'Admin', page: 'admin' as Page, icon: <Settings className="w-4 h-4" /> },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
            aria-label="Go to home page"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-300/30 transition-shadow">
              <span className="text-gold-400 font-display text-lg font-bold">N</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-emerald-900">Nikah</span>
              <span className="font-display text-xl font-bold text-gold-500">Path</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'bg-emerald-800/10 text-emerald-800'
                    : 'text-gray-600 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('browse')}
                  className="px-5 py-2.5 text-sm font-medium text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  <Shield className="w-4 h-4 inline mr-1" />
                  Privacy First
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
                  <User className="w-4 h-4 text-gold-400" />
                </div>
                <span className="text-sm font-medium text-emerald-800">Welcome</span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6 text-emerald-800" /> : <Menu className="w-6 h-6 text-emerald-800" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-lg animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'bg-emerald-800/10 text-emerald-800'
                    : 'text-gray-600 hover:bg-emerald-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            {!isLoggedIn && (
              <button
                onClick={() => { onNavigate('register'); setMobileOpen(false); }}
                className="w-full mt-3 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-lg"
              >
                Get Started — It's Free
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
