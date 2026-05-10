import React from 'react';
import { Shield, Heart, Star, Users, Lock, CheckCircle, ArrowRight, MessageSquare, EyeOff, UserPlus, Search, BookOpen } from 'lucide-react';
import { Hero } from './Hero';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white" aria-label="How it works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Simple Process
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              How NikahPath Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Our thoughtful process ensures meaningful connections rooted in Islamic values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Search className="w-7 h-7" />,
                step: '01',
                title: 'Create Your Profile',
                desc: 'Complete our comprehensive questionnaire covering Islamic values, lifestyle, and partner preferences. Our dynamic schema ensures we capture what matters most.',
                color: 'from-emerald-600 to-emerald-800',
              },
              {
                icon: <Shield className="w-7 h-7" />,
                step: '02',
                title: 'Privacy-First Matching',
                desc: 'Photos are blurred by default. Browse compatible profiles using our advanced filtering engine. Request photo access when you feel a genuine connection.',
                color: 'from-gold-400 to-gold-600',
              },
              {
                icon: <MessageSquare className="w-7 h-7" />,
                step: '03',
                title: 'Connect with Purpose',
                desc: 'Start meaningful conversations with optional Wali integration. Every interaction is designed with Islamic etiquette and mutual respect.',
                color: 'from-emerald-700 to-emerald-900',
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-2xl border border-emerald-100/80 p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-gold-500 mb-2">STEP {item.step}</div>
                  <h3 className="font-display text-xl font-bold text-emerald-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Safety */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-emerald-900 to-emerald-950 relative overflow-hidden" aria-label="Privacy features">
        <div className="absolute inset-0 geometric-pattern" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-200 text-sm font-medium mb-6">
                <Lock className="w-4 h-4 text-gold-400" />
                Islamic Privacy Standards
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Your Privacy is
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                  Our Priority
                </span>
              </h2>
              <p className="text-emerald-200/70 text-lg leading-relaxed mb-8">
                Built from the ground up with Islamic principles of modesty and privacy. 
                Every feature is designed to protect your dignity while facilitating meaningful connections.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: <EyeOff className="w-5 h-5" />,
                    title: 'Blurred Photos by Default',
                    desc: 'Profile photos are blurred until you grant access. Request-based viewing ensures consent.',
                  },
                  {
                    icon: <UserPlus className="w-5 h-5" />,
                    title: 'Wali Integration',
                    desc: 'Include a trusted guardian in your conversations for Islamic compliance and peace of mind.',
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Verified Profiles Only',
                    desc: 'Every profile goes through identity verification to ensure authenticity and safety.',
                  },
                  {
                    icon: <Lock className="w-5 h-5" />,
                    title: 'End-to-End Encryption',
                    desc: 'All messages and personal data are encrypted with military-grade security.',
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-gold-400 flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-emerald-200/50 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy visual card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  {/* Privacy levels */}
                  <h3 className="text-white font-display text-xl font-bold mb-6">Privacy Levels</h3>
                  {[
                    { level: 'Public', desc: 'Visible to all verified members', color: 'bg-emerald-500' },
                    { level: 'Blurred', desc: 'Request access to view photos', color: 'bg-gold-400' },
                    { level: 'Private', desc: 'Only visible after mutual match', color: 'bg-red-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-white/5">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.level}</p>
                        <p className="text-emerald-200/50 text-xs">{item.desc}</p>
                      </div>
                      {i === 1 && <span className="px-3 py-1 bg-gold-400/20 text-gold-400 text-xs font-medium rounded-full border border-gold-400/30">Recommended</span>}
                    </div>
                  ))}

                  <div className="mt-6 p-4 rounded-xl bg-emerald-800/30 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-gold-400 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Wali Oversight Active
                    </div>
                    <p className="text-emerald-200/50 text-xs mt-1">
                      All conversations are monitored by your chosen Wali
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-stone-50 geometric-pattern-gold" aria-label="Testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 text-gold-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Success Stories
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-900 mb-4">
              Blessed Beginnings
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from couples who found their perfect match through NikahPath
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                names: 'Ahmed & Sara',
                location: 'Melbourne',
                text: 'Alhamdulillah, NikahPath helped us find each other. The privacy features made me feel comfortable throughout the process. We got married 6 months after connecting!',
                rating: 5,
              },
              {
                names: 'Yusuf & Fatima',
                location: 'Sydney',
                text: 'The Wali integration was a game-changer for our families. Having my father involved from the start made everything halal and blessed. Truly a platform built with Deen in mind.',
                rating: 5,
              },
              {
                names: 'Ibrahim & Amina',
                location: 'London',
                text: 'I was skeptical about online matrimonial sites, but NikahPath\'s focus on Islamic values and privacy won me over. The detailed matching based on Deen was exactly what I needed.',
                rating: 5,
              },
            ].map((story, i) => (
              <div key={i} className="bg-white rounded-2xl border border-emerald-100/80 p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: story.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm italic">"{story.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-emerald-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-gold-400 font-display font-bold text-sm">
                    {story.names[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900 text-sm">{story.names}</p>
                    <p className="text-xs text-gray-400">{story.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white" aria-label="Call to action">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-3xl p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute inset-0 geometric-pattern" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-emerald-900" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Begin Your Journey Today
              </h2>
              <p className="text-emerald-200/70 max-w-xl mx-auto mb-8 text-lg">
                Join thousands of Muslims who trust NikahPath to find their life partner.
                Free to register, forever private.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('register')}
                  className="group px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-emerald-950 font-semibold rounded-xl hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-400/20 transition-all flex items-center justify-center gap-2"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('browse')}
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  Browse Profiles
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8">
                {[
                  { icon: <Users className="w-4 h-4" />, text: '2,500+ Members' },
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Verified Profiles' },
                  { icon: <Lock className="w-4 h-4" />, text: '100% Private' },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-emerald-200/60 text-xs">
                    {item.icon}
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-600 flex items-center justify-center">
                  <span className="text-gold-400 font-display text-lg font-bold">N</span>
                </div>
                <div>
                  <span className="font-display text-lg font-bold text-white">Nikah</span>
                  <span className="font-display text-lg font-bold text-gold-400">Path</span>
                </div>
              </div>
              <p className="text-emerald-300/50 text-sm leading-relaxed">
                A premium Islamic marriage platform built on the principles of Deen, dignity, and modern technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-emerald-300/50">
                <li><button onClick={() => onNavigate('browse')} className="hover:text-gold-400 transition-colors">Browse Profiles</button></li>
                <li><button onClick={() => onNavigate('register')} className="hover:text-gold-400 transition-colors">Register</button></li>
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Success Stories</span></li>
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">How It Works</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Safety</h4>
              <ul className="space-y-2 text-sm text-emerald-300/50">
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Verification Process</span></li>
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Wali Guidelines</span></li>
                <li><span className="hover:text-gold-400 transition-colors cursor-pointer">Safety Tips</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-emerald-300/50">
                <li>support@nikahpath.com</li>
                <li>FAQ</li>
                <li>About Us</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-emerald-800 text-center">
            <p className="text-emerald-300/30 text-sm">
              © 2025 NikahPath. All rights reserved. Built with ❤️ for the Ummah.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
