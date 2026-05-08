import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenAI } from '@google/genai';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I am your Smart Tourism Assistant. How can I help you with your trip to Bengaluru or Chennai?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
       const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: newMessages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: 'You are a smart urban tourism assistant for Bengaluru and Chennai. Help users with travel plans. Keep responses concise and friendly. If explaining an itinerary, focus on logic like distance and user interests.',
        }
      });
      
      const content = response.text || 'I could not generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-80 bg-surface rounded-2xl shadow-2xl border border-border-dim flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface p-4 border-b border-border-dim flex justify-between items-center bg-gradient-to-b from-surface to-bg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/20" />
                <span className="text-sm font-bold text-white tracking-tight">Urban Scout Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Close assistant"
                className="text-text-dim hover:text-white transition-colors"
               >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-4 bg-bg custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] shadow-sm",
                    m.role === 'user' 
                      ? "bg-accent text-white rounded-tr-none" 
                      : "bg-surface border border-border-dim text-text-main rounded-tl-none font-medium"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border-dim p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1.5 pt-1 pb-0.5 px-1">
                      <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-surface border-t border-border-dim">
              <div className="flex gap-2 bg-bg border border-border-dim rounded-lg p-1">
                <input
                  type="text"
                  placeholder="Ask Scout..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent border-none px-3 py-1.5 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="text-accent hover:text-indigo-400 p-1.5 rounded-lg disabled:text-text-dim transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Open scout"
        className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/20 hover:bg-indigo-500 transition-all duration-300 border border-indigo-400/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ChatAssistant;
