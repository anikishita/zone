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
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-xl">Z</div>
            <span className="font-semibold text-slate-800 text-lg tracking-tight">ZONE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors">About</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors">How it Works</a>
            <button 
              onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Start Practicing
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-50/50 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span>A safe space for shy learners</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight animate-fade-in">
            Your safe zone to <span className="text-brand-500">grow.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
            Build skills quietly and confidently without pressure, judgment, or competition. No leaderboards. Just you and your progress.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 transition-all transform hover:-translate-y-1"
            >
              Start Practicing
            </button>
            <a 
              href="#about"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Zones Grid */}
      <section id="zones" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Zone</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Select a skill to practice. Remember, you can restart anytime and nobody is watching.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZONES.map((zone) => (
            <ZoneCard 
              key={zone.id} 
              zone={zone} 
              onClick={setActiveZone} 
            />
          ))}
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-brand-50 via-white to-indigo-50 rounded-3xl p-8 md:p-12 border border-brand-100 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200 text-brand-700 text-xs font-medium mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Tools</span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Enhanced Learning Experience
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Explore advanced features designed to make your learning journey even more engaging and personalized.
            </p>
            
            <button
              onClick={() => setShowFeatureCard(true)}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-brand-300 transition-all transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                  Feature Card
                </div>
                <div className="text-xs text-slate-500">
                  Interactive learning component
                </div>
              </div>
              <div className="ml-2 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all">
                <Sparkles className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why ZONE is Different</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-1">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">No Judgment</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">Our AI practice partner is programmed to be kind, patient, and supportive. It never gets tired or annoyed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Private Progress</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">No public profiles. No leaderboards. No comparisons. Your journey is yours alone.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-indigo-100 rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">Z</div>
                  <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600">
                    Welcome to the Writing Zone! Would you like to try a gentle prompt today?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">You</div>
                  <div className="bg-brand-500 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-md shadow-brand-500/20">
                    Yes, please. I'm feeling a bit stuck.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">Z</div>
                  <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600">
                    That's perfectly okay. Let's start small. Describe your favorite mug or cup. What does it look like?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-xs">Z</div>
          <span className="font-bold text-slate-800">ZONE</span>
        </div>
        <p className="text-slate-400 text-sm mb-6">Designed for peace of mind.</p>
        <p className="text-slate-300 text-xs">© {new Date().getFullYear()} ZONE Educational Platform.</p>
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