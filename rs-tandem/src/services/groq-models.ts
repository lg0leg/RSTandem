import Groq from 'groq-sdk';
// import type { Model } from '../types/groq-types';

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export const getModels = async () => {
  return await groq.models.list();
};

// getModels().then((models) => {
//   console.log(models);
// });

export const GROQ_MODELS = {
  OPENAI_120: 'openai/gpt-oss-120b',
  OPENAI_20: 'openai/gpt-oss-20b',
  // MIXTRAL: 'mixtral-8x7b-32768',
  // LLAMA3_8B: 'llama3-8b-8192',
  // LLAMA3_70B: 'llama3-70b-8192',
  // GEMMA2_9B: 'gemma2-9b-it',
  // LLAMA_31_8B: 'llama-3.1-8b-instant',
  // LLAMA_33_70B: 'llama-3.3-70b-versatile',
} as const;
