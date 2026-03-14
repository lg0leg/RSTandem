import { useState } from 'react';
import {
  fetchGroqResponse,
  // GROQ_MODELS
} from '../services/groq-api';
import type { GroqMessage } from '../types/groq-types';
import { GROQ_MODELS } from '../services/groq-models';

export default function GroqPage() {
  const [messages, setMessages] = useState<GroqMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: GroqMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetchGroqResponse(updatedMessages, GROQ_MODELS.OPENAI_120);
      const assistantMessage: GroqMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex flex-col h-[calc(95vh-20px)] max-w-3xl mx-auto p-4">
    <div className="flex flex-col h-[calc(100vh-58px)] max-w-3xl mx-auto p-4">
      <h2 className="mb-4 text-2xl font-semibold">Groq Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <strong className="block text-sm">{msg.role === 'user' ? 'Вы' : 'AI'}:</strong>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
              <p className="animate-pulse">AI печатает...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          placeholder="Введите сообщение..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
