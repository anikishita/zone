import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, RefreshCw, Volume2, BookOpen, PenTool, Brain, Gamepad2, Briefcase, ArrowRight } from 'lucide-react';
import { ZoneConfig, ChatMessage, ZoneId } from '../types';
import { generateInitialPrompt, generateResponse } from '../services/gemini';
import { useAIContext } from '../contexts/AIContext';

interface PracticeModalProps {
  zone: ZoneConfig;
  onClose: () => void;
}

// Define all available zones for the selection grid
const AVAILABLE_ZONES = [
  {
    id: 'reading',
    title: 'Reading Zone',
    description: 'Practice reading comprehension with calming, low-stakes texts.',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'speaking',
    title: 'Speaking Zone',
    description: 'A judgment-free space to practice conversation. Start with simple greetings.',
    icon: Mic,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    id: 'writing',
    title: 'Writing Zone',
    description: 'Express yourself through writing prompts. Focus on ideas, not perfect grammar.',
    icon: PenTool,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'memory',
    title: 'Memory Zone',
    description: 'Strengthen your recall with gentle, fun memory exercises.',
    icon: Brain,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50'
  },
  {
    id: 'games',
    title: 'Game Zone',
    description: 'Play simple word games to build vocabulary without the competition.',
    icon: Gamepad2,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50'
  },
  {
    id: 'business',
    title: 'Business Ideas',
    description: 'Brainstorm side projects and ideas safely. No idea is "stupid" here.',
    icon: Briefcase,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  }
];

const PracticeModal: React.FC<PracticeModalProps> = ({ zone, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<ZoneConfig | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setCurrentZone } = useAIContext();

  // Update AI context when zone is selected from grid
  const handleZoneSelection = (zoneConfig: ZoneConfig) => {
    setSelectedZone(zoneConfig);
    setCurrentZone(zoneConfig.id);
  };

  // Initialize session when a zone is selected
  useEffect(() => {
    if (!selectedZone) return;
    
    const startSession = async () => {
      setIsLoading(true);
      const greeting = await generateInitialPrompt(selectedZone.id);
      setMessages([{
        id: 'init',
        role: 'assistant',
        content: greeting,
        timestamp: Date.now()
      }]);
      setIsLoading(false);
    };
    startSession();
  }, [selectedZone]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedZone) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await generateResponse(selectedZone.id, history, userMsg.content);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Speech Recognition Setup (Browser native)
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(prev => prev ? prev + ' ' + transcript : transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for calming effect
    utterance.pitch = 1;
    window.speechSynthesis.cancel(); // Stop previous
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[700px]">
        
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b border-slate-100 ${selectedZone ? selectedZone.bgColor : zone.bgColor}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white/50 ${selectedZone ? selectedZone.color : zone.color}`}>
              {selectedZone ? selectedZone.icon : zone.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">{selectedZone ? selectedZone.title : zone.title}</h2>
              <p className="text-xs text-slate-500">Private Session • No Judgment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conditional Content - Zone Selection Grid or Chat */}
        {!selectedZone ? (
          /* Zone Selection Grid */
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {AVAILABLE_ZONES.map((zoneOption) => {
                const IconComponent = zoneOption.icon;
                return (
                  <div
                    key={zoneOption.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => {
                      // Create a full ZoneConfig object for the selected zone
                      const fullZoneConfig: ZoneConfig = {
                        id: zoneOption.id as ZoneId,
                        title: zoneOption.title,
                        description: zoneOption.description,
                        icon: <IconComponent className="w-6 h-6" />,
                        color: zoneOption.color,
                        bgColor: zoneOption.bgColor,
                        promptContext: zoneOption.id
                      };
                      handleZoneSelection(fullZoneConfig);
                    }}
                  >
                    {/* Icon in top left */}
                    <div className={`w-10 h-10 rounded-lg ${zoneOption.bgColor} ${zoneOption.color} flex items-center justify-center mb-3`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-slate-800 text-base mb-2">{zoneOption.title}</h3>
                    
                    {/* Description - 2 lines */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {zoneOption.description}
                    </p>
                    
                    {/* Enter Zone link */}
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
                      <span>Enter Zone</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Chat Area */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative group ${
                      msg.role === 'user'
                        ? 'bg-brand-500 text-white rounded-tr-none'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    
                    {/* TTS Button for Assistant messages */}
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => handleSpeak(msg.content)}
                        className="absolute -right-8 top-2 p-1.5 text-slate-300 hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all"
                        title="Read aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-all ${
                    isListening 
                      ? 'bg-red-100 text-red-500 animate-pulse' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your response safely..."
                  className="flex-1 bg-slate-50 border-0 rounded-full px-6 py-3 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-200 focus:outline-none"
                  autoFocus
                />
                
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() && !isLoading}
                  className={`p-3 rounded-full transition-all ${
                    inputValue.trim()
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:scale-105'
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Zone AI creates a private, judgment-free space. Mistakes are part of learning.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PracticeModal;