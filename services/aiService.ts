// AI Service - Now using secure server-side API
// The API key is kept secure on the server (Vercel serverless function)
// Client makes requests to /api/chat which proxies to Gemini API

import { ZoneChatConfig } from "../contexts/ChatContext";

export const generateAIResponse = async (
  zoneConfig: ZoneChatConfig,
  userMessage: string,
  conversationHistory: { role: string; content: string }[]
): Promise<string> => {
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
    
    // Call our serverless function instead of Gemini directly
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        model: 'gemini-2.0-flash-exp'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error);
      
      // Friendly fallback responses
      const fallbacks = [
        "Hmm, lost my train of thought. What were you saying?",
        "My brain glitched for a sec. Can you say that again?",
        "Connection hiccup! Mind repeating that?",
        "Oops, didn't catch that. Try again?"
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    const data = await response.json();
    return data.text || "I'm here! What's on your mind?";

  } catch (error) {
    console.error("Client Error:", error);
    
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
export const getWelcomeMessage = (zoneConfig: ZoneChatConfig): string => {
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
