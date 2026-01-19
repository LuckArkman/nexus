import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageSize } from '../types';

const getAIClient = async (): Promise<GoogleGenAI> => {
  // Check if we need to select a key for advanced models
  // Use type assertion to avoid conflict with existing global definition of window.aistudio
  const hasKey = await (window as any).aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await (window as any).aistudio.openSelectKey();
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Chat Service
export const sendMessageToAdvisor = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<AsyncGenerator<string, void, unknown>> => {
  const ai = await getAIClient();
  
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
    config: {
      systemInstruction: `Você é o Nexus AI, um consultor financeiro Web3 avançado e especialista em blockchain. 
      Ajude o usuário com análises de mercado, explicações sobre smart contracts, gestão de risco e estratégias DeFi.
      Mantenha as respostas concisas, profissionais e em Português do Brasil. Use formatação Markdown.`,
      thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for reasoning
    },
  });

  const resultStream = await chat.sendMessageStream({ message });
  
  async function* streamGenerator() {
    for await (const chunk of resultStream) {
       // Correct way to access text from chunk as per instructions
       const responseChunk = chunk as GenerateContentResponse;
       if (responseChunk.text) {
         yield responseChunk.text;
       }
    }
  }

  return streamGenerator();
};

// Image Generation Service
export const generateNFTArt = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  const ai = await getAIClient();
  
  // Using gemini-3-pro-image-preview as requested for high quality
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1", // Square for NFTs
        imageSize: size
      }
    }
  });

  // Extract image
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Nenhuma imagem gerada.");
};