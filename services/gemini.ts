import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ZoneId } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTIONS = `
You are a gentle, supportive, and non-judgmental practice partner named "Zone Guide".
Your goal is to help shy or introverted users practice skills in a safe environment.
- NEVER judge or criticize harshly.
- ALWAYS start feedback with something positive.
- Use a calm, encouraging tone.
- Keep responses concise (under 100 words) unless asked for a story.
- If the user makes a mistake, gently suggest a correction.
- Do not compare the user to others.
`;

const ZONE_PROMPTS: Record<ZoneId, string> = {
  reading: "Generate a short, calming paragraph (3-4 sentences) about nature, mindfulness, or a cozy setting. Ask one simple comprehension question at the end.",
  speaking: "Act as a friendly conversation partner. Ask me a simple, open-ended question about my day or hobbies to get me talking. Keep it low-pressure.",
  writing: "Give me a creative writing prompt. It should be simple and open-ended, like 'Describe your favorite comfort food' or 'A place where you feel safe'.",
  memory: "Give me a list of 5 simple items to remember. I will try to repeat them back to you.",
  games: "Let's play a simple word association game. You start with a word, and I'll reply with the first word that comes to mind.",
  business: "I want to practice brainstorming business ideas. Ask me about my interests, and help me come up with a low-stress side hustle idea.",
};

const OFFLINE_MESSAGE = "The AI is currently offline, but you can still use this space for practice.";

export const generateInitialPrompt = async (zoneId: ZoneId): Promise<string> => {
  if (!ai) {
    return OFFLINE_MESSAGE;
  }
  try {
    const specificPrompt = ZONE_PROMPTS[zoneId];
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${SYSTEM_INSTRUCTIONS}\n\nTask: ${specificPrompt}`,
    });
    return response.text || "Hello! I'm ready to help you practice.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting right now, but I'm here! What would you like to practice?";
  }
};

export const generateResponse = async (
  zoneId: ZoneId,
  history: { role: string; content: string }[],
  userMessage: string
): Promise<string> => {
  if (!ai) {
    return OFFLINE_MESSAGE;
  }
  try {
    // Construct a simple chat history string for context (stateless for simplicity here, but robust)
    const context = history.map(m => `${m.role === 'user' ? 'User' : 'Guide'}: ${m.content}`).join('\n');
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${SYSTEM_INSTRUCTIONS}\n\nCurrent Context:\n${context}\n\nUser: ${userMessage}\n\nGuide (You):`,
    });
    
    return response.text || "I see. Tell me more.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I didn't quite catch that. Could you try again?";
  }
};
