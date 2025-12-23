import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel serverless function to proxy Gemini API requests
// This keeps the API key secure on the server-side
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from server-side environment variable (no VITE_ prefix needed)
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'API key not configured on server',
      message: 'Please set GEMINI_API_KEY in Vercel environment variables'
    });
  }

  try {
    const { prompt, model = 'gemini-2.0-flash-exp' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Make request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return res.status(response.status).json({ 
        error: 'Gemini API request failed',
        details: error
      });
    }

    const data = await response.json();
    
    // Extract the text from Gemini's response format
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 'I\'m here! What\'s on your mind?';

    return res.status(200).json({ text });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
