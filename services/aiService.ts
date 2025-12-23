import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ZoneConfig } from "../contexts/ChatContext";

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize AI with API key if available
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
}

export const generateAIResponse = async (
  zoneConfig: ZoneConfig,
  userMessage: string,
  conversationHistory: { role: string; content: string }[]
): Promise<string> => {
  if (!ai) {
    return "Hey! I need an API key to chat properly. But I'm still here to keep you company! 😊";
  }
  
  try {
    // Build conversation context
    const historyContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map(m => `${m.role === 'user' ? 'User' : zoneConfig.aiRole}: ${m.content}`)
      .join('\n');
    
    const fullPrompt = `${zoneConfig.systemPrompt}

Current Zone: ${zoneConfig.zoneName}
Your Role: ${zoneConfig.aiRole}
Tone: ${zoneConfig.tone}

Recent Conversation:
${historyContext}

User: ${userMessage}

${zoneConfig.aiRole}:`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: fullPrompt,
    });
    
    return response.text || "I'm here! What's on your mind?";
  } catch (error) {
    console.error("Gemini Error:", error);
    
    // Friendly fallback responses
    const fallbacks = [
      "Hmm, lost my train of thought. What were you saying?",
      "My brain glitched for a sec. Can you say that again?",
      "Connection hiccup! Mind repeating that?",
      "Oops, didn't catch that. Try again?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};

// Welcome message when user first opens chat
export const getWelcomeMessage = (zoneConfig: ZoneConfig): string => {
  if (zoneConfig.zoneId === null) {
    return "Hey there! Pick a zone and let's get started. I'm here to help! 👋";
  }
  
  const welcomes: Record<string, string[]> = {
    reading: [
      "Hey! Ready to read something interesting?",
      "Welcome to Reading Zone! What catches your eye?",
      "Let's find something good to read together!"
    ],
    speaking: [
      "Hey! Want to chat about anything?",
      "Welcome! Let's practice some conversation.",
      "Ready to talk? I'm all ears!"
    ],
    writing: [
      "Hey! Feeling creative today?",
      "Welcome to Writing Zone! Got any ideas brewing?",
      "Let's write something fun together!"
    ],
    memory: [
      "Hey! Ready for some brain games?",
      "Welcome! Let's make memory practice fun.",
      "Ready to flex that memory?"
    ],
    games: [
      "Hey! Let's play something!",
      "Welcome to Game Zone! What sounds fun?",
      "Ready for some wordplay?"
    ],
    business: [
      "Hey! Got any cool ideas today?",
      "Welcome! Let's brainstorm something awesome.",
      "Ready to explore some business ideas?"
    ]
  };
  
  const zoneWelcomes = welcomes[zoneConfig.zoneId || 'reading'] || welcomes.reading;
  return zoneWelcomes[Math.floor(Math.random() * zoneWelcomes.length)];
};
