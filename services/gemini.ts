import { GoogleGenAI } from "@google/genai";
import { StorageService } from "./storage";

const SCHOOL_CONTEXT = `
You are the Virtual Assistant for Gatundu Goodluck Primary School.
Your goal is to help parents, students, and visitors with information about the school.

Key Information:
- Name: Gatundu Goodluck Primary School
- Motto: "Strive for Excellence"
- Location: Gatundu, Kenya
- Curriculum: CBC (Competency Based Curriculum)
- Grades: PP1, PP2, Grades 1-8 (Junior Secondary)
- Facilities: Modern Library, Science Labs, Computer Lab, Spacious Playground
- Headteacher: Mrs. Jane Doe
- Admission: Open for 2024. Requires Birth Certificate, Previous Report Forms.

Tone: Professional, warm, welcoming, and helpful. 
Keep answers concise (under 100 words) unless detailed info is requested.

Current School News/Events (Use this to answer current questions):
${JSON.stringify(StorageService.getAnnouncements().slice(0, 3))}
`;

export const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm sorry, my AI brain is missing its API Key key! Please contact the administrator.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash for speed and cost-effectiveness for a simple chatbot
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SCHOOL_CONTEXT,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to the server. Please try again later.";
  }
};