import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookOpen, Mic, PenTool, Brain, Gamepad2, Briefcase } from 'lucide-react';
import HomePage from './pages/HomePage';
import ZonePage from './pages/ZonePage';
import FitInterviewPage from './pages/FitInterviewPage';
import AIFloatingChatBot from './components/AIFloatingChatBot';
import { ChatProvider } from './contexts/ChatContext';
import { ZoneConfig } from './types';

const ZONES: ZoneConfig[] = [
  {
    id: 'reading',
    title: 'Reading Zone',
    description: 'Practice reading comprehension with calming, low-stakes texts. No pressure to read fast.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    promptContext: 'reading'
  },
  {
    id: 'speaking',
    title: 'Speaking Zone',
    description: 'A judgment-free space to practice conversation. Start with simple greetings.',
    icon: <Mic className="w-6 h-6" />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    promptContext: 'speaking'
  },
  {
    id: 'writing',
    title: 'Writing Zone',
    description: 'Express yourself through writing prompts. Focus on ideas, not perfect grammar.',
    icon: <PenTool className="w-6 h-6" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    promptContext: 'writing'
  },
  {
    id: 'memory',
    title: 'Memory Zone',
    description: 'Strengthen your recall with gentle, fun memory exercises.',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    promptContext: 'memory'
  },
  {
    id: 'games',
    title: 'Game Zone',
    description: 'Play simple word games to build vocabulary without the competition.',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    promptContext: 'games'
  },
  {
    id: 'business',
    title: 'Business Ideas',
    description: 'Brainstorm side projects and ideas safely. No idea is "stupid" here.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    promptContext: 'business'
  }
];

const App: React.FC = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<HomePage zones={ZONES} />} />
        <Route path="/zone/:zoneId" element={<ZonePage zones={ZONES} />} />
        <Route path="/fit-interview" element={<FitInterviewPage />} />
      </Routes>
      <AIFloatingChatBot />
    </ChatProvider>
  );
};

export default App;