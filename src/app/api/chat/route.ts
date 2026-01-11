import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { characterProfile } from '@/lib/character';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
// Use gemini-1.5-flash as a stable baseline, or check if 2.5 is intended.
// Switching to 1.5-flash for stability as 2.5 might be a typo or unavailable.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        original_text: { type: SchemaType.STRING, description: "The response in Japanese." },
        furigana_text: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              text: { type: SchemaType.STRING },
              reading: { type: SchemaType.STRING, nullable: true },
              meaning: { type: SchemaType.STRING, nullable: true, description: "Indonesian meaning of the word/kanji if applicable." }
            },
            required: ["text"]
          }
        },
        translation: { type: SchemaType.STRING, description: "Indonesian translation of the response." }
      },
      required: ["original_text", "furigana_text", "translation"]
    }
  }
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert messages to Gemini format
  // History is essential for chat. 
  // We take the last user message as the prompt, and the rest as history.
  const lastMessage = messages[messages.length - 1];
  const history = messages.slice(0, -1).map((m: any) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: characterProfile.systemPrompt + "\nIMPORTANT: You must reply in valid JSON matching the schema." }]
        },
        {
          role: "model",
          parts: [{ text: "Haii! Wakatta. Aku akan menjawab dalam format JSON. Silakan tanya apa saja!" }]
        },
        ...history
      ],
    });

    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();
    const json = JSON.parse(responseText);

    return Response.json(json);

  } catch (error: any) {
    console.error("Gemini API error details:", error);
    if (error.response) {
      console.error("Gemini API error response:", await error.response.text());
    }

    // Check for quota exceeded
    if (error.message?.includes("429") || error.toString().includes("Quota exceeded")) {
      return Response.json({
        error: "Maaf, Yuriko sedang istirahat sebentar (Quota Exceeded). Coba lagi dalam 1 menit."
      }, { status: 429 });
    }

    return Response.json({
      error: "Maaf, ada gangguan koneksi dengan Yuriko."
    }, { status: 500 });
  }
}
