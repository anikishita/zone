import React from 'react';
import { ZoneConfig } from '../types';

interface ZoneCardProps {
  zone: ZoneConfig;
  onPracticeClick: (zone: ZoneConfig) => void;
  onExploreClick: (zone: ZoneConfig) => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, onPracticeClick, onExploreClick }) => {
  return (
    <div 
      className={`group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-slate-100 hover:border-brand-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
    >
      {/* Gradient background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${zone.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
      
      {/* Decorative circle */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${zone.bgColor} opacity-30 transition-all duration-500 group-hover:scale-150 group-hover:opacity-50`}></div>
      
      <div className="relative z-10">
        {/* Icon with enhanced styling */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${zone.bgColor} ${zone.color} shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
          {zone.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">
          {zone.title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
          {zone.description}
        </p>
        
        {/* Explore Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExploreClick(zone);
          }}
          className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold hover:shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5"
        >
          Explore
        </button>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/0 to-brand-500/0 group-hover:from-brand-500/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
    </div>
  );
};

export default ZoneCard;