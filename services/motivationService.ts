
import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI;

try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI for motivation service.", error);
}

const defaultQuotes = [
    "One step at a time.",
    "Progress, not perfection.",
    "Begin with a single task.",
    "Focus on the now.",
    "Small wins lead to big results.",
    "You have what it takes.",
    "Embrace the journey.",
    "Clarity comes from action.",
    "Just start.",
    "Breathe. You've got this."
];

export const motivationService = {
  getMotivationalQuotes: async (): Promise<string[]> => {
    if (!ai) {
        console.warn("Gemini AI not initialized for motivation service. Using default quotes.");
        return defaultQuotes;
    };
    
    const prompt = `You are a source of calm inspiration. Provide a JSON array of 10 short, motivational quotes (5-10 words each) suitable for a productivity app loading screen. The theme should be about focus, growth, and gentle progress.`;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
      });
      const quotes = JSON.parse(response.text);
      return quotes.length > 0 ? quotes : defaultQuotes;
    } catch (error) {
      console.error("Error fetching motivational quotes:", error);
      return defaultQuotes; // Fallback to default quotes on error
    }
  },
};
