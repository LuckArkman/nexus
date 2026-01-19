import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ShieldCheck } from 'lucide-react';
import { sendMessageToAdvisor } from '../services/gemini';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Olá! Sou o Nexus AI Advisor. Posso ajudar você a analisar riscos, explicar contratos inteligentes ou sugerir estratégias de investimento DeFi. Como posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    
    // Add user message
    const newMessages = [
      ...messages, 
      { role: 'user', text: userMsg, timestamp: new Date() } as ChatMessage
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Stream response
      const stream = await sendMessageToAdvisor(userMsg, history);
      
      let fullResponse = "";
      
      // Add placeholder for model response
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullResponse;
          return updated;
        });
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, encontrei um erro ao processar sua solicitação. Tente novamente mais tarde.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">Nexus AI Advisor</h3>
            <p className="text-xs text-indigo-400 flex items-center gap-1">
              <ShieldCheck size={12} />
              Gemini 3 Pro Ativo
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Modo Pensamento Ativado
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-slate-600' : 'bg-indigo-600'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-slate-700 text-white rounded-tr-none' 
                : 'bg-indigo-900/30 border border-indigo-500/20 text-slate-200 rounded-tl-none'
            }`}>
              <div className="prose prose-invert prose-sm whitespace-pre-wrap">
                {msg.text || (isLoading && index === messages.length - 1 ? <span className="animate-pulse">Pensando...</span> : '')}
              </div>
              <span className="text-[10px] opacity-50 block mt-2">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-700">
        <div className="relative flex items-end gap-2 bg-slate-800 rounded-xl p-2 border border-slate-700 focus-within:border-indigo-500 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Pergunte sobre contratos, tokens ou estratégias..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none resize-none p-2 max-h-32 min-h-[44px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-lg flex-shrink-0 transition-all ${
              !input.trim() || isLoading
                ? 'bg-slate-700 text-slate-500'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg'
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          O Nexus AI pode cometer erros. Verifique informações financeiras importantes.
        </p>
      </div>
    </div>
  );
};

export default AIChat;