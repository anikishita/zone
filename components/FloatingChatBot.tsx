import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2, HelpCircle, BookOpen, Mic, PenTool, Brain, Gamepad2, Briefcase, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();

  // Context-aware welcome messages based on current page/zone
  const getContextualWelcome = (): string => {
    const path = location.pathname;
    
    if (path === '/') {
      return "Welcome to ZONE! I'm here to help you navigate your learning journey. Click on any zone to explore services tailored to your needs. Remember, this is your safe space to grow at your own pace.";
    }
    
    if (path === '/fit-interview') {
      return "Welcome to the Fit Interview! I'm here to guide you through discovering your perfect fit. Take your time answering each question - there are no wrong answers here.";
    }
    
    if (path.startsWith('/zone/reading')) {
      return "Welcome to the Reading Zone! 📰 I can help you with reading comprehension, vocabulary building, and speed reading. All exercises are designed to be stress-free and at your own pace.";
    }
    
    if (path.startsWith('/zone/speaking')) {
      return "Welcome to the Speaking Zone! 🗣️ This is a judgment-free space to practice pronunciation, conversation, and presentation skills. Feel free to explore any service that interests you.";
    }
    
    if (path.startsWith('/zone/writing')) {
      return "Welcome to the Writing Zone! ✍️ Express yourself through writing prompts, journaling, and stories. Focus on your ideas - perfect grammar comes with practice!";
    }
    
    if (path.startsWith('/zone/memory')) {
      return "Welcome to the Memory Zone! 🧠 Strengthen your recall with fun, gentle exercises. These games are designed to make memory training enjoyable and stress-free.";
    }
    
    if (path.startsWith('/zone/games')) {
      return "Welcome to the Game Zone! 🎮 Play word games and puzzles at your own pace. No timers, no competition - just fun learning!";
    }
    
    if (path.startsWith('/zone/business')) {
      return "Welcome to Business Ideas! 💡 Brainstorm and develop your ideas in a supportive environment. Every idea has potential - let's explore yours together!";
    }
    
    return "Hello! I'm your Zone Assistant. I'm here to help you with any questions or guidance you need. How can I assist you today?";
  };

  // Get service-specific tips
  const getServiceTip = (): string | null => {
    const path = location.pathname;
    
    if (path.includes('/zone/')) {
      return "💡 Tip: Take breaks whenever you need. Your progress is automatically saved, and you can come back anytime.";
    }
    
    return null;
  };

  // Initialize or update welcome message when location changes
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: getContextualWelcome(),
      sender: 'bot',
      timestamp: new Date(),
    };
    
    const tip = getServiceTip();
    
    // Set initial messages - include tip if available
    if (tip) {
      const tipMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: tip,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage, tipMessage]);
    } else {
      setMessages([welcomeMessage]);
    }
  }, [location.pathname]);

  const getZoneIcon = () => {
    const path = location.pathname;
    if (path.startsWith('/zone/reading')) return <BookOpen className="w-4 h-4" />;
    if (path.startsWith('/zone/speaking')) return <Mic className="w-4 h-4" />;
    if (path.startsWith('/zone/writing')) return <PenTool className="w-4 h-4" />;
    if (path.startsWith('/zone/memory')) return <Brain className="w-4 h-4" />;
    if (path.startsWith('/zone/games')) return <Gamepad2 className="w-4 h-4" />;
    if (path.startsWith('/zone/business')) return <Briefcase className="w-4 h-4" />;
    if (path === '/fit-interview') return <Sparkles className="w-4 h-4" />;
    return <HelpCircle className="w-4 h-4" />;
  };

  const quickActions = [
    { id: 'help', label: 'How does this work?', response: 'ZONE is designed to be your safe practice space. Choose a zone that interests you, select a service, and start practicing. There are no grades, no timers, and no judgment. You can restart or switch zones anytime!' },
    { id: 'progress', label: 'Where is my progress?', response: 'Your progress is private and stored locally. You can track your journey in each zone, but remember - this is about growth, not competition. Take your time and enjoy the process!' },
    { id: 'stuck', label: 'I feel stuck', response: "It's completely normal to feel stuck sometimes. Try starting with a different service, take a short break, or switch to another zone. Remember, you're here to explore and learn at your own pace - there's no pressure!" },
  ];

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action.label,
      sender: 'user',
      timestamp: new Date(),
    };
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: action.response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:shadow-brand-500/30 transition-all transform hover:scale-110 flex items-center justify-center group"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-64' : 'w-96'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col" style={{ height: isMinimized ? 'auto' : '500px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-500 to-indigo-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              {getZoneIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-sm">Zone Assistant</h3>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 hide-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'bot'
                        ? 'bg-white text-slate-700 shadow-sm border border-slate-100'
                        : 'bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-slate-200 p-3 bg-white">
              <p className="text-xs text-slate-500 mb-2 font-medium">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors border border-slate-200 hover:border-brand-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingChatBot;
