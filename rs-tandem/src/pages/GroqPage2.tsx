import React, { useState } from 'react';
import Groq from 'groq-sdk';
import { GROQ_MODELS } from '../services/groq-models';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function GroqPage2() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        model: GROQ_MODELS.OPENAI_120,
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...messages, userMessage],
      });

      const reply = completion.choices[0]?.message?.content ?? 'Нет ответа от модели.';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setError('Ошибка при запросе к Groq. Проверьте ключ и сеть.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(95vh-20px)] max-w-xl mx-auto p-4">
      {/* <div className="h-[calc(100vh-58px)] max-w-xl mx-auto p-4"> */}
      <h2 className="mb-4 text-2xl font-semibold">Groq Chat</h2>

      <div className="h-[80%] border border-gray-200 rounded-lg p-3 overflow-y-auto mb-3 bg-gray-50">
        {messages.length === 0 && <div className="text-gray-400">Напишите что‑нибудь, чтобы начать.</div>}

        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-1 rounded-md ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              <strong>{m.role === 'user' ? 'Вы' : 'Groq'}: </strong>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение…"
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:bg-blue-300"
        >
          {loading ? 'Отправка…' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}
