import React from 'react';
import { ArrowRight, Shield, Star, Users, Lock, Heart, ChevronDown } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />
      <div className="absolute inset-0 geometric-pattern" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left fade-in">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Shield className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-white/90 font-medium">Islamic Privacy Standards</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                Perfect Match
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-emerald-200/80 font-medium italic">
                The Halal Way
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              A premium, privacy-first platform designed for Muslims seeking meaningful 
              connections. Built with Deen, dignity, and modern technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('register')}
                className="group px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-emerald-950 font-semibold rounded-xl hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-400/20 hover:shadow-gold-400/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Browse Profiles
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              {[
                { icon: <Users className="w-5 h-5" />, value: '2,500+', label: 'Active Members' },
                { icon: <Star className="w-5 h-5" />, value: '850+', label: 'Successful Matches' },
                { icon: <Lock className="w-5 h-5" />, value: '100%', label: 'Privacy Protected' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="flex items-center gap-1.5 justify-center lg:justify-start text-gold-400 mb-1">
                    {stat.icon}
                    <span className="font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs text-emerald-200/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-display text-xl font-bold">Compatibility Score</h3>
                    <p className="text-emerald-200/60 text-sm">Based on Islamic values & preferences</p>
                  </div>
                </div>

                {/* Match preview cards */}
                <div className="space-y-3">
                  {[
                    { name: 'Aisha R.', score: 94, location: 'Melbourne' },
                    { name: 'Fatima M.', score: 87, location: 'Perth' },
                    { name: 'Maryam S.', score: 82, location: 'Adelaide' },
                  ].map((match, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-gold-400 font-display font-bold text-lg">
                        {match.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{match.name}</p>
                        <p className="text-emerald-200/50 text-xs">{match.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gold-400 font-bold text-lg">{match.score}%</span>
                        <p className="text-emerald-200/40 text-xs">Match</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl border border-gold-400/40 text-gold-400 font-medium hover:bg-gold-400/10 transition-colors text-sm">
                  View All Compatible Matches
                </button>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-emerald-700/90 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30 shadow-lg">
                <span className="text-xs text-gold-300 font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Verified Profiles
                </span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <span className="text-xs text-white/90 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Wali Integration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
};
