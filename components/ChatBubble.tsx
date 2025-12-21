import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 pr-10">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* Avatar */}
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-md">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium text-slate-900 mb-1">Zone Assistant</p>
          </div>
        </div>
        
        {/* Message */}
        <div className="ml-13">
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
        
        {/* Pointer */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-slate-200 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default ChatBubble;
