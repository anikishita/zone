import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { InterviewQuestion } from './interviewConfig';

interface QuestionCardProps {
  question: InterviewQuestion;
  onSelectOption: (optionId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
  questionNumber: number;
}

/**
 * QuestionCard Component
 * 
 * Displays a single question with clickable option cards.
 * Pinterest-style design with smooth animations and hover effects.
 */
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectOption,
  onBack,
  canGoBack,
  questionNumber
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionId: string) => {
    // Show selection feedback
    setSelectedOption(optionId);
    // Trigger parent callback
    onSelectOption(optionId);
  };

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {/* Question */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-4">
          Question {questionNumber}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-lg text-slate-500">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={selectedOption !== null}
            className={`
              group relative p-6 rounded-2xl border-2 text-left transition-all
              hover:shadow-lg hover:-translate-y-1
              ${selectedOption === option.id 
                ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/20' 
                : 'border-slate-200 bg-white hover:border-brand-300'
              }
              ${selectedOption !== null && selectedOption !== option.id 
                ? 'opacity-50' 
                : ''
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeIn 0.5s ease-out forwards'
            }}
          >
            {/* Icon */}
            <div className={`
              text-4xl mb-3 transform transition-transform
              ${selectedOption === option.id ? 'scale-110' : 'group-hover:scale-110'}
            `}>
              {option.icon}
            </div>

            {/* Text */}
            <div className={`
              text-base font-semibold transition-colors
              ${selectedOption === option.id 
                ? 'text-brand-700' 
                : 'text-slate-800 group-hover:text-brand-600'
              }
            `}>
              {option.text}
            </div>

            {/* Selected indicator */}
            {selectedOption === option.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
