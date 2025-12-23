import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Sparkles } from 'lucide-react';
import ZoneCard from '../components/ZoneCard';
import ChatBubble from '../components/ChatBubble';
import { useZoneDetection } from '../contexts/ChatContext';
import { ZoneConfig } from '../types';

interface HomePageProps {
  zones: ZoneConfig[];
}

const HomePage: React.FC<HomePageProps> = ({ zones }) => {
  const navigate = useNavigate();
  const [showChatBubble, setShowChatBubble] = useState(false);
  
  // Notify chat context that we're on home page (no specific zone)
  useZoneDetection(null);

  useEffect(() => {
    // Show chat bubble after a short delay
    const timer = setTimeout(() => {
      setShowChatBubble(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              onClick={() => navigate('/fit-interview')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-brand-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Discover Your Fit
            </button>
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
          {zones.map((zone) => (
            <ZoneCard 
              key={zone.id} 
              zone={zone} 
              onClick={(zone) => navigate(`/zone/${zone.id}`)} 
            />
          ))}
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

      {/* Chat Bubble */}
      <ChatBubble
        message="Welcome to ZONE! Choose a zone to explore services tailored to your learning journey. Remember, this is your safe space to grow at your own pace."
        isVisible={showChatBubble}
        onClose={() => setShowChatBubble(false)}
      />
    </div>
  );
};

export default HomePage;
