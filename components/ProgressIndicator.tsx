import React from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  progress: number;
}

/**
 * ProgressIndicator Component
 * 
 * Shows the user's progress through the interview.
 * Displays both a progress bar and step counter.
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total, progress }) => {
  return (
    <div className="w-full">
      {/* Step counter */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">
          {current} of {total}
        </span>
        <span className="text-sm font-medium text-brand-600">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots (optional visual enhancement) */}
      <div className="flex items-center justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index < current 
                ? 'bg-brand-500 scale-100' 
                : index === current - 1
                ? 'bg-brand-400 scale-125'
                : 'bg-slate-300 scale-100'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
