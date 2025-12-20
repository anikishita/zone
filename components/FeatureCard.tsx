import React, { useState } from 'react';
import { X, ChevronRight, Sparkles, Zap } from 'lucide-react';

interface FeatureCardProps {
  onClose: () => void;
}

const TOTAL_STEPS = 4;

const FeatureCard: React.FC<FeatureCardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-lg">
        {/* Enhanced Stacked Card Container */}
        <div className="relative group">
          {/* Background stacked layers with enhanced effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-indigo-100 rounded-[2.5rem] transform translate-y-3 translate-x-3 opacity-20 group-hover:translate-y-4 group-hover:translate-x-4 transition-all duration-700 ease-out shadow-xl blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-50 rounded-[2.5rem] transform translate-y-1.5 translate-x-1.5 opacity-50 group-hover:translate-y-2.5 group-hover:translate-x-2.5 transition-all duration-700 ease-out shadow-2xl"></div>
          
          {/* Main card with gradient border */}
          <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-600 shadow-2xl group-hover:shadow-[0_30px_70px_-15px_rgba(20,184,166,0.4)] transition-all duration-700 ease-out group-hover:-translate-y-2">
            <div className="relative bg-gradient-to-br from-white via-white to-brand-50/30 rounded-[2.4rem] overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2.5 hover:bg-slate-100 rounded-2xl transition-all text-slate-500 hover:text-slate-700 hover:scale-110 hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Card content */}
              <div className="relative z-10 p-10 pt-14">
                {/* Header with enhanced design */}
                <div className="mb-10">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl blur-xl opacity-50"></div>
                    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-2xl shadow-brand-500/40">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                    Feature Card
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Experience a modern stacked card design with smooth, premium animations.
                  </p>
                </div>

                {/* Content area with enhanced styling */}
                <div className="mb-10">
                  <div className="relative bg-gradient-to-br from-slate-50 to-brand-50/50 rounded-3xl p-8 border-2 border-white shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-brand-500 rounded-xl blur opacity-40"></div>
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                          <span className="text-white font-bold text-lg">{currentStep + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          Step {currentStep + 1}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {currentStep === 0 && "Welcome! This demonstrates a premium stacked card effect with smooth, fluid transitions."}
                          {currentStep === 1 && "Notice the elegant layer expansion on hover, creating beautiful depth and dimension."}
                          {currentStep === 2 && "The design uses subtle gradients, shadows, and transforms for a luxurious feel."}
                          {currentStep >= 3 && "You've explored all features. This modern design works perfectly on all devices!"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced progress indicator */}
                    <div className="flex gap-2">
                      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
                        <div 
                          key={index}
                          className={`h-2 rounded-full flex-1 transition-all duration-500 ${
                            index <= currentStep 
                              ? 'bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg shadow-brand-500/30' 
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced action buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all hover:scale-105"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold hover:shadow-2xl hover:shadow-brand-500/50 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                  >
                    Next
                    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decorative animated elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-200/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
