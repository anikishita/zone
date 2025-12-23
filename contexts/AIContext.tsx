import React, { createContext, useContext, useState, useCallback } from 'react';
import { ZoneId } from '../types';

// AI Mode configuration for each tool/zone
interface AIMode {
  id: ZoneId;
  name: string;
  description: string;
  systemPrompt: string;
  welcomeMessage: string;
}

// Define AI modes for each zone with unique behaviors
const AI_MODES: Record<ZoneId, AIMode> = {
  reading: {
    id: 'reading',
    name: 'Reading Assistant',
    description: 'Helps with reading comprehension and text analysis',
    systemPrompt: 'You are a patient reading tutor. Help users understand texts, build comprehension skills, and answer questions about reading material. Be encouraging and supportive. Break down complex ideas into simple explanations.',
    welcomeMessage: "Hi! I'm your Reading Assistant. I can help you understand texts, answer questions, or suggest interesting reading materials. What would you like to explore?"
  },
  speaking: {
    id: 'speaking',
    name: 'Speaking Coach',
    description: 'Guides conversation practice and speaking skills',
    systemPrompt: 'You are a friendly conversation partner and speaking coach. Help users practice conversations, provide dialogue examples, and give gentle feedback. Create a judgment-free space for speaking practice. Be warm and encouraging.',
    welcomeMessage: "Hello! I'm your Speaking Coach. I'm here to help you practice conversations without any pressure. Want to try a simple greeting or discuss a topic?"
  },
  writing: {
    id: 'writing',
    name: 'Writing Mentor',
    description: 'Supports creative writing and expression',
    systemPrompt: 'You are a creative writing mentor who values ideas over perfection. Help users with writing prompts, story ideas, and gentle feedback. Focus on encouraging expression and creativity, not grammar policing. Be inspirational and supportive.',
    welcomeMessage: "Hey there! I'm your Writing Mentor. Let's explore your ideas together. Need a writing prompt, feedback on a draft, or just want to brainstorm?"
  },
  memory: {
    id: 'memory',
    name: 'Memory Trainer',
    description: 'Assists with memory exercises and recall techniques',
    systemPrompt: 'You are a gentle memory coach who makes learning fun. Suggest memory games, recall exercises, and mnemonic techniques. Be patient and celebrate small victories. Make memory training feel like play, not work.',
    welcomeMessage: "Hi! I'm your Memory Trainer. Ready for some fun memory exercises? I can create games, teach memory techniques, or just chat about how memory works."
  },
  games: {
    id: 'games',
    name: 'Game Buddy',
    description: 'Facilitates word games and vocabulary building',
    systemPrompt: 'You are a playful game companion who focuses on fun over competition. Suggest word games, vocabulary challenges, and puzzles. Keep things light and enjoyable. Celebrate creativity and effort, not just correct answers.',
    welcomeMessage: "Hey! I'm your Game Buddy. Let's play some word games together! No scores, no pressure - just fun. Want to try a word association game or something else?"
  },
  business: {
    id: 'business',
    name: 'Ideas Partner',
    description: 'Brainstorms business and project ideas',
    systemPrompt: 'You are a supportive brainstorming partner for business and side project ideas. All ideas are valid. Help users explore concepts, think through possibilities, and build confidence. Be encouraging and practical without being critical. Remind them that every big business started as a "crazy" idea.',
    welcomeMessage: "Hello! I'm your Ideas Partner. Got a business idea you want to explore? No idea is too small or too wild. Let's brainstorm together!"
  }
};

interface AIContextType {
  currentMode: AIMode | null;
  setCurrentZone: (zoneId: ZoneId | null) => void;
  getWelcomeMessage: () => string;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<AIMode | null>(null);

  const setCurrentZone = useCallback((zoneId: ZoneId | null) => {
    if (zoneId) {
      setCurrentMode(AI_MODES[zoneId]);
    } else {
      setCurrentMode(null);
    }
  }, []);

  const getWelcomeMessage = useCallback(() => {
    if (currentMode) {
      return currentMode.welcomeMessage;
    }
    return "Hi! I'm your Zone Assistant. Select a zone to get started, and I'll adapt to help you with that specific area.";
  }, [currentMode]);

  return (
    <AIContext.Provider value={{ currentMode, setCurrentZone, getWelcomeMessage }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAIContext must be used within AIContextProvider');
  }
  return context;
};

// Export AI modes for reference
export { AI_MODES };
export type { AIMode };
