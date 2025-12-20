<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GHoBpO61AxS8kwLPwrZnJu4NM-fjEl-Y

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (see [.env.example](.env.example) for format)
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add `GEMINI_API_KEY` or `VITE_GEMINI_API_KEY` with your API key from https://aistudio.google.com/app/apikey
4. Deploy!

**Important:** The app requires a Gemini API key to function. Without it, users will see a message indicating the API key is missing.
