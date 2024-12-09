import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Initialize the chat model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

class GeminiService {
  private chat;
  private history: ChatMessage[] = [];

  constructor() {
    this.chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      // Add user message to history
      this.history.push({ role: 'user', content: message });

      // Get response from Gemini
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // Add model response to history
      this.history.push({ role: 'model', content: text });

      return text;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    }
  }

  getHistory(): ChatMessage[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
    this.chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
  }
}

export default new GeminiService(); 