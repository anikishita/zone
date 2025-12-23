# Vercel Serverless Functions

This directory contains Vercel serverless functions for the ZONE application.

## `/api/chat.ts`

Secure server-side proxy for Gemini AI API requests.

### Purpose
- Keeps the `GEMINI_API_KEY` secure on the server-side
- Prevents API key exposure to client browsers
- Provides a clean API interface for the chatbot

### Environment Variables Required
- `GEMINI_API_KEY` - Your Gemini API key (server-side, no VITE_ prefix needed)

### Usage
The client-side AI service (`services/aiService.ts`) makes POST requests to `/api/chat` with:
```json
{
  "prompt": "Your AI prompt text",
  "model": "gemini-2.0-flash-exp"
}
```

### Response
```json
{
  "text": "AI generated response"
}
```

### Security
- API key is never exposed to the client
- Only POST requests are allowed
- Request validation ensures required fields are present
- Error handling with appropriate HTTP status codes
