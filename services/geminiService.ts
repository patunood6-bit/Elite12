
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudyContent = async (prompt: string, subject: string) => {
  const ai = getAI();
  const systemInstruction = `Bạn là một trợ lý học tập siêu cấp cho học sinh lớp 12 tại Việt Nam. 
    Chuyên môn của bạn là ôn thi THPT Quốc Gia môn ${subject}. 
    Hãy trả lời một cách dễ hiểu, có cấu trúc, sử dụng Markdown và tập trung vào các kiến thức trọng tâm.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
  }
};

export const generateVocabularyByAI = async (topic: string, level: string, count: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tạo danh sách ${count} từ vựng tiếng Anh trình độ ${level} về chủ đề "${topic}" dành cho học sinh lớp 12 Việt Nam ôn thi đại học. 
    Yêu cầu: Mỗi từ phải có phiên âm IPA, nghĩa tiếng Việt, từ loại (v, n, adj, adv), từ đồng nghĩa, từ trái nghĩa, một câu ví dụ tiếng Anh và bản dịch tiếng Việt của ví dụ đó.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            ipa: { type: Type.STRING },
            meaning: { type: Type.STRING },
            type: { type: Type.STRING },
            level: { type: Type.STRING },
            example: { type: Type.STRING },
            exampleTranslation: { type: Type.STRING },
            synonyms: { type: Type.STRING },
            antonyms: { type: Type.STRING },
          },
          required: ["word", "ipa", "meaning", "type", "level", "example", "exampleTranslation"],
        },
      },
    },
  });
  return JSON.parse(response.text || '[]');
};

export const generateFlashcardsByAI = async (subject: string, topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tạo 5 thẻ flashcards cho môn ${subject} về chủ đề "${topic}". Đảm bảo nội dung bám sát chương trình lớp 12.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            front: { type: Type.STRING },
            back: { type: Type.STRING },
          },
          required: ["front", "back"],
        },
      },
    },
  });
  return JSON.parse(response.text || '[]');
};
