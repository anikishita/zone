import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage, ZoneId } from '../types';

interface ZoneConfig {
  zoneId: ZoneId | null;
  zoneName: string;
  aiRole: string;
  tone: string;
  systemPrompt: string;
}

interface ChatPosition {
  x: number;
  y: number;
}

interface ChatContextType {
  // Chat state
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  
  // Zone state
  currentZone: ZoneConfig;
  setCurrentZone: (zone: ZoneConfig) => void;
  
  // UI state
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  position: ChatPosition;
  setPosition: (position: ChatPosition) => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ZONE_CONFIGURATIONS: Record<ZoneId, Omit<ZoneConfig, 'zoneId'>> = {
  reading: {
    zoneName: 'Reading Zone',
    aiRole: 'Calm Reading Companion',
    tone: 'calm, patient, encouraging',
    systemPrompt: `You are a calm reading companion. Speak casually and warmly, like a friend who loves books. 
Keep responses SHORT (1-3 sentences). Be supportive about reading speed and comprehension. 
Avoid robotic language. Use natural conversation. Never be formal or long-winded unless asked.`
  },
  speaking: {
    zoneName: 'Speaking Zone',
    aiRole: 'Friendly Conversation Partner',
    tone: 'friendly, warm, relaxed',
    systemPrompt: `You are a friendly conversation partner. Talk naturally and casually. 
Keep responses BRIEF (1-2 sentences). Encourage speaking practice gently. 
Be warm and supportive. Make the user feel comfortable. Avoid long paragraphs.`
  },
  writing: {
    zoneName: 'Writing Zone',
    aiRole: 'Relaxed Writing Coach',
    tone: 'creative, supportive, laid-back',
    systemPrompt: `You are a relaxed writing coach. Be casual and creative. 
Keep responses SHORT (1-3 sentences). Focus on ideas, not perfection. 
Be encouraging and non-judgmental. Speak like a supportive friend, not a teacher.`
  },
  memory: {
    zoneName: 'Memory Zone',
    aiRole: 'Gentle Recall Guide',
    tone: 'gentle, playful, patient',
    systemPrompt: `You are a gentle guide for memory exercises. Be playful and patient. 
Keep responses VERY SHORT (1-2 sentences). Make memory fun, not stressful. 
Be casual and warm. Celebrate small wins. Never pressure the user.`
  },
  games: {
    zoneName: 'Game Zone',
    aiRole: 'Playful Game Partner',
    tone: 'playful, light, fun',
    systemPrompt: `You are a playful game partner. Keep things light and fun. 
Keep responses SUPER SHORT (1-2 sentences). Be casual and playful. 
Make games enjoyable, not competitive. Speak naturally, like playing with a friend.`
  },
  business: {
    zoneName: 'Business Ideas',
    aiRole: 'Casual Idea Brainstormer',
    tone: 'insightful, casual, supportive',
    systemPrompt: `You are a casual brainstorming buddy for business ideas. Be insightful but relaxed. 
Keep responses SHORT (2-3 sentences). Help explore ideas without pressure. 
Be supportive and realistic. Speak casually, like chatting over coffee.`
  }
};

const DEFAULT_ZONE: ZoneConfig = {
  zoneId: null,
  zoneName: 'ZONE',
  aiRole: 'Zone Assistant',
  tone: 'calm, supportive, friendly',
  systemPrompt: `You are a helpful zone assistant. Be warm and casual. 
Keep responses SHORT (1-2 sentences). Help users navigate the platform. 
Be friendly and approachable. Avoid being robotic or formal.`
};

const STORAGE_KEYS = {
  MESSAGES: 'zone_chat_messages',
  POSITION: 'zone_chat_position',
  IS_OPEN: 'zone_chat_is_open'
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize messages from localStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentZone, setCurrentZoneState] = useState<ZoneConfig>(DEFAULT_ZONE);
  
  // Initialize position from localStorage or default to bottom-right
  const [position, setPositionState] = useState<ChatPosition>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.POSITION);
    if (stored) {
      return JSON.parse(stored);
    }
    // Default position (bottom-right with some padding)
    return { x: window.innerWidth - 420, y: window.innerHeight - 570 };
  });
  
  // Initialize isOpen from localStorage
  const [isOpen, setIsOpenState] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.IS_OPEN);
    return stored ? JSON.parse(stored) : false;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);
  
  // Persist position to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSITION, JSON.stringify(position));
  }, [position]);
  
  // Persist isOpen to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_OPEN, JSON.stringify(isOpen));
  }, [isOpen]);
  
  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  };
  
  const setCurrentZone = (zone: ZoneConfig) => {
    const previousZoneId = currentZone.zoneId;
    setCurrentZoneState(zone);
    
    // Add a casual greeting when switching zones (only if chat is open, zone changed, and both zones are valid)
    if (isOpen && zone.zoneId && previousZoneId && zone.zoneId !== previousZoneId) {
      const greetings = [
        `Hey! Switched to ${zone.zoneName}. What's up?`,
        `Cool, ${zone.zoneName} now. What can I help with?`,
        `Alright, we're in ${zone.zoneName}. Ready when you are!`,
        `${zone.zoneName} mode activated. How can I help?`
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      addMessage({
        id: `zone-switch-${Date.now()}`,
        role: 'assistant',
        content: randomGreeting,
        timestamp: Date.now()
      });
    }
  };
  
  const setPosition = (newPosition: ChatPosition) => {
    // Ensure position stays within viewport bounds
    const maxX = window.innerWidth - 400; // Chat width
    const maxY = window.innerHeight - 560; // Chat height
    
    setPositionState({
      x: Math.max(0, Math.min(newPosition.x, maxX)),
      y: Math.max(0, Math.min(newPosition.y, maxY))
    });
  };
  
  const setIsOpen = (open: boolean) => {
    setIsOpenState(open);
  };
  
  const value: ChatContextType = {
    messages,
    addMessage,
    clearMessages,
    currentZone,
    setCurrentZone,
    isOpen,
    setIsOpen,
    position,
    setPosition,
    isLoading,
    setIsLoading
  };
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

// Helper hook to update zone based on route
export const useZoneDetection = (zoneId: ZoneId | null) => {
  const { setCurrentZone } = useChatContext();
  
  useEffect(() => {
    if (zoneId) {
      const config = ZONE_CONFIGURATIONS[zoneId];
      setCurrentZone({
        zoneId,
        ...config
      });
    } else {
      setCurrentZone(DEFAULT_ZONE);
    }
  }, [zoneId, setCurrentZone]);
};

// Export zone configurations for use in AI service
export { ZONE_CONFIGURATIONS, DEFAULT_ZONE };
export type { ZoneConfig, ChatPosition };
