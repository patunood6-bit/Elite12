
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const startAIChatSession = async () => {
  const ai = getAI();
  return ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "Bạn là một trợ lý học tập siêu cấp cho học sinh lớp 12 tại Việt Nam. Chuyên môn của bạn là ôn thi THPT Quốc Gia tất cả các môn. Hãy trả lời một cách dễ hiểu, có cấu trúc, sử dụng Markdown và tập trung vào các kiến thức trọng tâm. Bạn có thể giải bài tập, giải thích lý thuyết, hoặc tư vấn lộ trình học tập.",
    },
  });
};
