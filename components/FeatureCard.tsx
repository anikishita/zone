import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  onClose: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Stacked Card Container */}
        <div className="relative group">
          {/* Background stacked layers */}
          <div className="absolute inset-0 bg-white rounded-3xl transform translate-y-2 translate-x-2 opacity-30 group-hover:translate-y-3 group-hover:translate-x-3 transition-all duration-500 ease-out shadow-md"></div>
          <div className="absolute inset-0 bg-white rounded-3xl transform translate-y-1 translate-x-1 opacity-60 group-hover:translate-y-2 group-hover:translate-x-2 transition-all duration-500 ease-out shadow-lg"></div>
          
          {/* Main card */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] group-hover:-translate-y-1">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Card content */}
            <div className="p-8 pt-12">
              {/* Header */}
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/30">
                  <span className="text-2xl font-bold text-white">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Feature Card
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  This is a modern feature card with a unique stacked design. Hover over it to see the smooth animation effect.
                </p>
              </div>

              {/* Content area */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">{currentStep + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Step {currentStep + 1}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {currentStep === 0 && "Welcome to the feature card! This demonstrates the stacked card effect with smooth transitions."}
                        {currentStep === 1 && "Notice how the card layers expand on hover, creating a sense of depth and dimension."}
                        {currentStep === 2 && "The design uses subtle shadows and transforms for a premium, modern appearance."}
                        {currentStep >= 3 && "You've explored all the basic features. Feel free to continue or close the card."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="flex gap-1.5 mt-4">
                    {[0, 1, 2, 3].map((step) => (
                      <div 
                        key={step}
                        className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                          step <= currentStep ? 'bg-brand-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group/btn"
                >
                  Next
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-100/50 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
