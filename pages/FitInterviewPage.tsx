import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InterviewFlow from '../components/InterviewFlow';
import { useZoneDetection } from '../contexts/ChatContext';

/**
 * FitInterviewPage - Main page for the User Fit Interview feature
 * This component serves as the container for the interview experience
 * It is completely isolated from the rest of the application
 */
const FitInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  
  // Notify chat context (no specific zone for interview page)
  useZoneDetection(null);

  // Landing screen before interview starts
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white text-3xl font-bold mb-6 shadow-xl shadow-brand-500/20 transform hover:scale-105 transition-transform">
              ✨
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Discover Your Perfect Fit
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Take a quick, fun interview to understand where you fit best. 
              It only takes 2 minutes!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Answer Simple Questions</h3>
                  <p className="text-sm text-slate-600">Click through friendly questions about your interests and preferences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">See Your Results</h3>
                  <p className="text-sm text-slate-600">Get a visual breakdown of where you fit best</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Understand Your Profile</h3>
                  <p className="text-sm text-slate-600">Learn what makes you unique and how to make the most of it</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white text-lg font-semibold hover:shadow-xl hover:shadow-brand-500/30 transition-all transform hover:-translate-y-1"
          >
            Start Interview
          </button>

          <p className="mt-6 text-sm text-slate-400">No account required • 100% private • Takes ~2 minutes</p>
        </div>
      </div>
    );
  }

  // Once started, show the interview flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-indigo-50">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>
      <InterviewFlow onComplete={() => {}} />
    </div>
  );
};

export default FitInterviewPage;
