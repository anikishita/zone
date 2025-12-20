import React, { useState } from 'react';
import { BookOpen, Mic, PenTool, Brain, Gamepad2, Briefcase, Heart, Shield, Sparkles, Layers } from 'lucide-react';
import ZoneCard from './components/ZoneCard';
import PracticeModal from './components/PracticeModal';
import FeatureCard from './components/FeatureCard';
import { ZoneConfig } from './types';

const ZONES: ZoneConfig[] = [
  {
    id: 'reading',
    title: 'Reading Zone',
    description: 'Practice reading comprehension with calming, low-stakes texts. No pressure to read fast.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    promptContext: 'reading'
  },
  {
    id: 'speaking',
    title: 'Speaking Zone',
    description: 'A judgment-free space to practice conversation. Start with simple greetings.',
    icon: <Mic className="w-6 h-6" />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    promptContext: 'speaking'
  },
  {
    id: 'writing',
    title: 'Writing Zone',
    description: 'Express yourself through writing prompts. Focus on ideas, not perfect grammar.',
    icon: <PenTool className="w-6 h-6" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    promptContext: 'writing'
  },
  {
    id: 'memory',
    title: 'Memory Zone',
    description: 'Strengthen your recall with gentle, fun memory exercises.',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    promptContext: 'memory'
  },
  {
    id: 'games',
    title: 'Game Zone',
    description: 'Play simple word games to build vocabulary without the competition.',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    promptContext: 'games'
  },
  {
    id: 'business',
    title: 'Business Ideas',
    description: 'Brainstorm side projects and ideas safely. No idea is "stupid" here.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    promptContext: 'business'
  }
];

const App: React.FC = () => {
  const [activeZone, setActiveZone] = useState<ZoneConfig | null>(null);
  const [showFeatureCard, setShowFeatureCard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-300/5 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>
      
      {/* Navbar - Enhanced glassmorphism */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30 transform hover:scale-105 transition-transform">Z</div>
            <span className="font-bold text-slate-800 text-xl tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">ZONE</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">About</a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">How it Works</a>
            <button 
              onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5 hover:scale-105"
            >
              Start Practicing
            </button>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section - Completely redesigned */}
      <header className="relative pt-32 pb-40 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200/50 backdrop-blur-sm text-brand-700 text-sm font-semibold mb-8 animate-fade-in shadow-lg shadow-brand-500/10">
            <Sparkles className="w-4 h-4" />
            <span>A safe space for shy learners</span>
          </div>
          
          {/* Main heading with gradient */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-[1.1] animate-fade-in">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">Your safe zone</span>
            <br />
            <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 bg-clip-text text-transparent inline-block">to grow.</span>
          </h1>
          
          {/* Subtitle with better contrast */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-1 font-medium">
            Build skills quietly and confidently without pressure, judgment, or competition. 
            <span className="block mt-2 text-brand-600 font-semibold">No leaderboards. Just you and your progress.</span>
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-delay-2">
            <button 
              onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-brand-500/40 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Practicing
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a 
              href="#about"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-slate-700 font-bold text-lg border-2 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Learn More
            </a>
          </div>

          {/* Stats or features */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-slate-600 font-semibold">Private & Safe</div>
            </div>
            <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent mb-2">6+</div>
              <div className="text-slate-600 font-semibold">Practice Zones</div>
            </div>
            <div className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent mb-2">AI</div>
              <div className="text-slate-600 font-semibold">Powered Learning</div>
            </div>
          </div>
        </div>
      </header>

      {/* Zones Grid - Enhanced design */}
      <section id="zones" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            CHOOSE YOUR PATH
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-5">Choose Your Zone</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Select a skill to practice. Remember, you can restart anytime and nobody is watching.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ZONES.map((zone) => (
            <ZoneCard 
              key={zone.id} 
              zone={zone} 
              onClick={setActiveZone} 
            />
          ))}
        </div>
      </section>

      {/* AI Tools Section - Completely redesigned */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-600 p-1 shadow-2xl shadow-brand-500/30">
          <div className="bg-gradient-to-br from-white via-brand-50/50 to-indigo-50/50 rounded-[2.4rem] p-10 md:p-16 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border-2 border-brand-200 text-brand-700 text-xs font-bold mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>AI-POWERED TOOLS</span>
              </div>
              
              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
                Enhanced Learning Experience
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                Explore advanced features designed to make your learning journey even more engaging and personalized.
              </p>
              
              {/* Feature Card Button - Completely redesigned */}
              <button
                onClick={() => setShowFeatureCard(true)}
                className="group inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-white to-brand-50 rounded-3xl border-2 border-white shadow-2xl hover:shadow-brand-500/20 transition-all transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-left flex-1">
                  <div className="text-xl font-bold text-slate-800 group-hover:text-brand-600 transition-colors mb-1">
                    Feature Card
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Interactive learning component
                  </div>
                </div>
                <div className="text-brand-500 group-hover:translate-x-2 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>

              {/* Additional features showcase */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Smart AI</h3>
                  <p className="text-sm text-slate-600">Personalized learning paths</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Safe Space</h3>
                  <p className="text-sm text-slate-600">100% judgment-free zone</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Your Pace</h3>
                  <p className="text-sm text-slate-600">Learn at your own speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced modern design */}
      <section id="about" className="py-28 bg-gradient-to-b from-white to-slate-50 border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Icon badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-2xl shadow-brand-500/30 mb-8">
              <Heart className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-8">
              Why ZONE is Different
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No Judgment</h3>
                  <p className="text-slate-600 leading-relaxed">Our AI practice partner is programmed to be kind, patient, and supportive. It never gets tired or annoyed.</p>
                </div>
              </div>
              
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Private Progress</h3>
                  <p className="text-slate-600 leading-relaxed">No public profiles. No leaderboards. No comparisons. Your journey is yours alone.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Adaptive Learning</h3>
                  <p className="text-slate-600 leading-relaxed">AI adjusts to your pace and style, ensuring you're always comfortable and progressing.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat mockup - Enhanced design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-indigo-200 rounded-[2.5rem] transform rotate-3 scale-95 opacity-40 blur-xl"></div>
            <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border-2 border-white/80 backdrop-blur-sm">
              <div className="space-y-5">
                {/* AI Message */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">Z</div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-3xl rounded-tl-none text-sm text-slate-700 shadow-md max-w-xs font-medium">
                    Welcome to the Writing Zone! Would you like to try a gentle prompt today?
                  </div>
                </div>
                
                {/* User Message */}
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">You</div>
                  <div className="bg-gradient-to-br from-brand-500 to-brand-600 text-white p-4 rounded-3xl rounded-tr-none text-sm shadow-xl shadow-brand-500/30 max-w-xs font-medium">
                    Yes, please. I'm feeling a bit stuck.
                  </div>
                </div>
                
                {/* AI Message */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">Z</div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-3xl rounded-tl-none text-sm text-slate-700 shadow-md max-w-xs font-medium">
                    That's perfectly okay. Let's start small. Describe your favorite mug or cup. What does it look like?
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">Z</div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-3xl rounded-tl-none shadow-md flex gap-1.5">
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce animation-delay-150"></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce animation-delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern design */}
      <footer className="py-16 bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-lg">Z</div>
              <span className="font-bold text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">ZONE</span>
            </div>
            <p className="text-slate-500 text-base mb-8 font-medium max-w-md">Designed for peace of mind. Your safe space to learn and grow.</p>
            
            {/* Social or links */}
            <div className="flex gap-6 mb-8">
              <a href="#about" className="text-slate-600 hover:text-brand-600 font-semibold transition-colors">About</a>
              <a href="#zones" className="text-slate-600 hover:text-brand-600 font-semibold transition-colors">Zones</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-brand-600 font-semibold transition-colors">How It Works</a>
            </div>
          </div>
          
          <div className="border-t border-slate-300 pt-8">
            <p className="text-slate-400 text-sm text-center">© {new Date().getFullYear()} ZONE Educational Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeZone && (
        <PracticeModal 
          zone={activeZone} 
          onClose={() => setActiveZone(null)} 
        />
      )}
      
      {showFeatureCard && (
        <FeatureCard 
          onClose={() => setShowFeatureCard(false)} 
        />
      )}
    </div>
  );
};

export default App;