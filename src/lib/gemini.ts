import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const RECIPE_SYSTEM_PROMPT = `You are an expert AI chef and recipe assistant called "Recipe Agent". Your personality is warm, enthusiastic, and knowledgeable about cuisines from around the world.

When asked for a recipe, you should provide:
1. **Recipe Name** - A creative and appetizing name
2. **Description** - A brief, mouth-watering description (2-3 sentences)
3. **Prep Time** and **Cook Time**
4. **Servings**
5. **Ingredients** - Listed with precise measurements
6. **Instructions** - Clear, numbered step-by-step directions
7. **Chef's Tips** - 2-3 pro tips to make the dish even better
8. **Nutrition Highlights** - Brief mention of key nutritional benefits

Format your response in clean Markdown. Use headers, bold text, and bullet points for readability.

If the user asks about ingredients they have, suggest creative recipes using those ingredients.
If they have dietary restrictions, always respect and accommodate them.
If they ask non-food questions, politely redirect them to cooking topics with a fun food fact.

Be enthusiastic and use food-related emojis sparingly (1-3 per response) to keep things fun! 🍳`;

// Models to try in order of preference
const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-2.5-flash"];

async function tryWithModel(modelName: string, message: string, history: { role: string; content: string }[]) {
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: RECIPE_SYSTEM_PROMPT,
  });

  const chatHistory = history.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  return response.text();
}

export async function generateRecipeResponse(message: string, history: { role: string; content: string }[]) {
  let lastError: Error | null = null;

  for (const modelName of MODELS) {
    try {
      return await tryWithModel(modelName, message, history);
    } catch (error: unknown) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMsg = lastError.message;

      // If it's a 503/overloaded or 404/not-found, try next model
      if (errorMsg.includes("503") || errorMsg.includes("404") || errorMsg.includes("overloaded")) {
        console.warn(`Model ${modelName} unavailable, trying next...`);
        continue;
      }

      // For other errors (auth, bad request, etc.), don't retry with different model
      throw lastError;
    }
  }

  throw lastError || new Error("All models are currently unavailable. Please try again in a moment.");
}
