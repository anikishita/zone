import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, BookOpen, Mic, PenTool, Brain, Gamepad2, Briefcase, Sparkles } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import { generateAIResponse, getWelcomeMessage } from '../services/aiService';

const AIFloatingChatBot: React.FC = () => {
  const {
    messages,
    addMessage,
    currentZone,
    isOpen,
    setIsOpen,
    position,
    setPosition,
    isLoading,
    setIsLoading
  } = useChatContext();
  
  const [inputValue, setInputValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send welcome message when chat is first opened and no messages exist
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg = getWelcomeMessage(currentZone);
      addMessage({
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: welcomeMsg,
        timestamp: Date.now()
      });
    }
  }, [isOpen]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    addMessage({
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });
    
    // Generate AI response
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const aiResponse = await generateAIResponse(currentZone, userMessage, history);
      
      addMessage({
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('AI Error:', error);
      addMessage({
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Oops, something went wrong. Try again?",
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // For open chat, only drag from header. For closed button, drag from anywhere
    const isChatHeader = (e.target as HTMLElement).closest('.chat-header');
    const isClosedButton = !isOpen;
    
    if (isChatHeader || isClosedButton) {
      setIsDragging(true);
      setHasDragged(false);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.preventDefault(); // Prevent text selection while dragging
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setHasDragged(true);
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);
  
  const getZoneIcon = () => {
    const iconClass = "w-4 h-4";
    switch (currentZone.zoneId) {
      case 'reading': return <BookOpen className={iconClass} />;
      case 'speaking': return <Mic className={iconClass} />;
      case 'writing': return <PenTool className={iconClass} />;
      case 'memory': return <Brain className={iconClass} />;
      case 'games': return <Gamepad2 className={iconClass} />;
      case 'business': return <Briefcase className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };
  
  // Floating button (closed state)
  if (!isOpen) {
    return (
      <div
        className="fixed z-50 w-14 h-14"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={(e) => {
            // Only open if not dragging
            if (!hasDragged) {
              setIsOpen(true);
            }
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:shadow-brand-500/30 transition-all transform hover:scale-110 flex items-center justify-center group"
          aria-label="Open AI assistant"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      </div>
    );
  }
  
  // Chat window (open state)
  return (
    <div
      ref={chatRef}
      className="fixed z-50 w-96"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[550px]">
        {/* Header - Draggable */}
        <div
          className="chat-header bg-gradient-to-r from-brand-500 to-indigo-500 px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              {getZoneIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{currentZone.aiRole}</h3>
              <p className="text-xs text-white/80">{currentZone.zoneName}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 hide-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.role === 'assistant'
                    ? 'bg-white text-slate-700 shadow-sm border border-slate-100'
                    : 'bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-700 shadow-sm border border-slate-100 rounded-2xl px-4 py-2 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="border-t border-slate-200 p-3 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Drag header to move • {currentZone.tone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIFloatingChatBot;
