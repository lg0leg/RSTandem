import type { GroqMessage } from '../types/groq-types';
import { GROQ_MODELS } from './groq-models';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const fetchGroqResponse = async (
  messages: GroqMessage[],
  model: string = GROQ_MODELS.OPENAI_120,
): Promise<string> => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Ошибка запроса к Groq API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
};
