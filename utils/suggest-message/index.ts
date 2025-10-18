"use server";

import { GoogleGenAI } from "@google/genai";
import { messagePrompt, systemInstruction } from "@/constants";

export const suggestedMessage = async () => {
  try {
    const { models } = new GoogleGenAI({});
    const { text } = await models.generateContent({
      model: "gemini-2.5-flash",
      contents: messagePrompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
        systemInstruction,
      },
    });

    if (!text?.trim()) {
      return { messages: [], error: "No script generated." };
    }

    return { messages: text.split("||"), error: "" };
  } catch {
    return { messages: [], error: "Error generating script" };
  }
};
