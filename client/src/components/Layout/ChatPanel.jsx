import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import apiFetch from '../../utils/apiFetch.js';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatPanel() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const messages = state.chatMessages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (state.chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [state.chatOpen]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text, timestamp: Date.now() };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMsg });
    setInput('');
    setLoading(true);

    try {
      const res = await apiFetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].slice(-20).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode: 'tutor',
        }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data = await res.json();
      dispatch({
        type: 'ADD_CHAT_MESSAGE',
        payload: {
          role: 'assistant',
          content: data.content || 'I had trouble responding. Try again?',
          timestamp: Date.now(),
        },
      });
    } catch {
      dispatch({
        type: 'ADD_CHAT_MESSAGE',
        payload: {
          role: 'assistant',
          content:
            'Sorry, I couldn\'t connect to the AI tutor. Make sure the server is running and your API key is configured.',
          timestamp: Date.now(),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  if (!state.chatOpen) return null;

  return (
    <aside className="fixed right-0 top-0 z-40 h-full w-80 sm:w-96 bg-surface-900 border-l border-surface-700 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-workshop-500/20 flex items-center justify-center">
            <Bot size={16} className="text-workshop-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-100">AI Tutor</span>
            <span className="block text-[10px] text-gray-500 leading-tight">
              Ask me anything about AI
            </span>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: false })}
          className="p-1.5 rounded-md hover:bg-surface-700 text-gray-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-workshop-500/10 flex items-center justify-center mb-4">
              <Bot size={28} className="text-workshop-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-200 mb-2">
              Your AI study buddy
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Ask questions about any AI concept and I will explain it using
              window blind installation analogies you already understand.
            </p>
            <div className="mt-4 space-y-2 w-full">
              {[
                'What is a neural network?',
                'Explain supervised learning',
                'How do LLMs work?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-surface-800
                    text-gray-400 hover:text-gray-200 hover:bg-surface-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.filter(Boolean).map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`
                w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5
                ${
                  msg.role === 'user'
                    ? 'bg-blue-500/15'
                    : 'bg-workshop-500/15'
                }
              `}
            >
              {msg.role === 'user' ? (
                <User size={14} className="text-blue-400" />
              ) : (
                <Bot size={14} className="text-workshop-400" />
              )}
            </div>
            <div
              className={`
                max-w-[80%] text-sm leading-relaxed rounded-xl px-3.5 py-2.5
                ${
                  msg.role === 'user'
                    ? 'bg-blue-500/15 text-gray-200'
                    : 'bg-surface-800 text-gray-300'
                }
              `}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-workshop-500/15 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-workshop-400" />
            </div>
            <div className="bg-surface-800 rounded-xl px-4 py-3">
              <Loader2 size={16} className="text-workshop-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="px-4 py-3 border-t border-surface-700"
      >
        <div className="flex items-center gap-2 bg-surface-800 rounded-xl px-3 py-1.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI tutor..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500
              outline-none py-1.5"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-1.5 rounded-lg text-workshop-400 hover:bg-workshop-500/10
              disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </aside>
  );
}
