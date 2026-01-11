# Miyazyuki Chat 🇯🇵

A Next.js chat application for learning Japanese with **Miyazyuki Kuchiyama**.

## Features
- **Furigana Support**: Kanji readings are displayed above the characters.
- **Translation Toggle**: Tap "Translate" to see the Indonesian meaning.
- **Character Persona**: Miyazyuki acts as a friendly language partner.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## AI Setup (Important)

To make Miyazyuki actually reply with AI (instead of the mock response), you need to integrate a real LLM provider like OpenAI or Google Gemini.

1. **Get an API Key** (e.g., from OpenAI).
2. **Configure Environment**
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=sk-...
   ```
3. **Update `src/app/api/chat/route.ts`**
   Uncomment the code in the API route to connect to the SDK.

## Project Structure
- `src/lib/character.ts`: Define Miyazyuki's personality and system prompt.
- `src/components/chat`: Contains the Chat Interface and Message Bubble logic.
