import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { useZoneDetection } from '../contexts/ChatContext';
import { ZoneConfig, ZoneId } from '../types';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ZonePageProps {
  zones: ZoneConfig[];
}

const SERVICE_MESSAGES: Record<string, Record<string, string>> = {
  reading: {
    articles: "Great choice! Reading articles will help you build comprehension skills. Take your time and enjoy the process.",
    comprehension: "Perfect! These exercises will gently test your understanding. Remember, there's no pressure here.",
    vocabulary: "Wonderful! Learning new words in context is one of the best ways to expand your vocabulary.",
    speed: "Excellent! Speed reading is a skill that develops gradually. Be patient with yourself.",
  },
  speaking: {
    pronunciation: "Nice! Practicing pronunciation in private helps build confidence. You're in a safe space.",
    conversation: "Great start! These conversation starters will help you feel more comfortable speaking.",
    storytelling: "Lovely choice! Storytelling is a powerful way to practice organizing your thoughts.",
    presentation: "Bold move! Practicing presentations here will help you feel prepared when it counts.",
  },
  writing: {
    prompts: "Inspiring choice! Daily prompts can unlock creativity you didn't know you had.",
    journaling: "Beautiful! Journaling is a wonderful way to express yourself freely.",
    stories: "Exciting! Story writing lets your imagination run wild in a judgment-free zone.",
    grammar: "Smart choice! Gentle grammar practice will strengthen your writing foundation.",
  },
  memory: {
    sequences: "Good pick! Number sequences help train your brain to recognize patterns.",
    matching: "Fun choice! Matching games are proven to strengthen memory recall.",
    recall: "Excellent! Story recall exercises make memory practice engaging and meaningful.",
    lists: "Practical choice! List memory skills are useful in everyday life.",
  },
  games: {
    'word-search': "Relaxing choice! Word searches are perfect for stress-free vocabulary building.",
    crossword: "Nice! Crosswords at your own pace let you think without time pressure.",
    anagrams: "Clever! Anagrams are great for flexible thinking and word play.",
    rhymes: "Musical choice! Playing with rhymes makes language learning fun.",
  },
  business: {
    brainstorm: "Innovative choice! All ideas are welcome here - no judgment, just creativity.",
    planning: "Strategic! Breaking ideas into steps makes big dreams feel achievable.",
    pitch: "Brave choice! Practicing your pitch here will boost your confidence.",
    research: "Smart move! Understanding your audience is key to any successful idea.",
  },
};

const ZONE_SERVICES: Record<string, Service[]> = {
  reading: [
    { id: 'articles', title: 'Read Articles', description: 'Practice with curated articles at your reading level', icon: '📰' },
    { id: 'comprehension', title: 'Comprehension Exercises', description: 'Test your understanding with gentle questions', icon: '📝' },
    { id: 'vocabulary', title: 'Vocabulary Builder', description: 'Learn new words in context without pressure', icon: '📚' },
    { id: 'speed', title: 'Speed Reading Practice', description: 'Gradually improve your reading pace', icon: '⚡' },
  ],
  speaking: [
    { id: 'pronunciation', title: 'Pronunciation Practice', description: 'Practice difficult sounds in a safe space', icon: '🗣️' },
    { id: 'conversation', title: 'Conversation Starters', description: 'Learn common phrases and greetings', icon: '💬' },
    { id: 'storytelling', title: 'Tell a Story', description: 'Practice storytelling at your own pace', icon: '📖' },
    { id: 'presentation', title: 'Presentation Skills', description: 'Build confidence in speaking to groups', icon: '🎤' },
  ],
  writing: [
    { id: 'prompts', title: 'Daily Writing Prompts', description: 'Get inspired with creative writing ideas', icon: '✍️' },
    { id: 'journaling', title: 'Personal Journaling', description: 'Write freely without judgment', icon: '📔' },
    { id: 'stories', title: 'Story Writing', description: 'Craft your own stories step by step', icon: '📚' },
    { id: 'grammar', title: 'Grammar Helper', description: 'Gentle grammar practice and tips', icon: '✏️' },
  ],
  memory: [
    { id: 'sequences', title: 'Number Sequences', description: 'Remember patterns at your own speed', icon: '🔢' },
    { id: 'matching', title: 'Memory Matching', description: 'Match pairs to strengthen recall', icon: '🎴' },
    { id: 'recall', title: 'Story Recall', description: 'Remember details from short stories', icon: '📖' },
    { id: 'lists', title: 'List Memory', description: 'Practice remembering shopping lists and more', icon: '📝' },
  ],
  games: [
    { id: 'word-search', title: 'Word Search', description: 'Find words without time pressure', icon: '🔍' },
    { id: 'crossword', title: 'Gentle Crosswords', description: 'Solve puzzles at your own pace', icon: '📋' },
    { id: 'anagrams', title: 'Anagram Practice', description: 'Rearrange letters to make words', icon: '🔤' },
    { id: 'rhymes', title: 'Rhyme Time', description: 'Play with words that sound similar', icon: '🎵' },
  ],
  business: [
    { id: 'brainstorm', title: 'Idea Brainstorming', description: 'Generate business ideas freely', icon: '💡' },
    { id: 'planning', title: 'Project Planning', description: 'Break down your ideas into steps', icon: '📊' },
    { id: 'pitch', title: 'Practice Your Pitch', description: 'Rehearse explaining your ideas', icon: '🎯' },
    { id: 'research', title: 'Market Research', description: 'Learn about your target audience', icon: '🔬' },
  ],
};

const ZonePage: React.FC<ZonePageProps> = ({ zones }) => {
  const { zoneId } = useParams<{ zoneId: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [showChatBubble, setShowChatBubble] = useState(false);
  
  // Notify chat context about current zone
  useZoneDetection(zoneId as ZoneId | null);

  const zone = zones.find(z => z.id === zoneId);
  const services = zoneId ? ZONE_SERVICES[zoneId] || [] : [];

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    const message = zoneId && SERVICE_MESSAGES[zoneId]?.[service.id] 
      || "Great choice! Let's get started with this service.";
    setChatMessage(message);
    setShowChatBubble(true);
  };

  if (!zone) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Zone Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-slate-100 ${zone.bgColor} bg-white/80 backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-500"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={`p-2 rounded-xl bg-white/50 ${zone.color}`}>
            {zone.icon}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">{zone.title}</h1>
            <p className="text-xs text-slate-500">Choose a service to get started</p>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Select a service below to practice in your safe zone. Take your time and remember - you can start over whenever you want.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleServiceClick(service)}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-20 transition-transform group-hover:scale-150 ${zone.bgColor}`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-brand-500 transition-colors">
                  Start Service <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No services available for this zone yet.</p>
          </div>
        )}
      </main>

      {/* Chat Bubble */}
      <ChatBubble
        message={chatMessage}
        isVisible={showChatBubble}
        onClose={() => setShowChatBubble(false)}
      />
    </div>
  );
};

export default ZonePage;
