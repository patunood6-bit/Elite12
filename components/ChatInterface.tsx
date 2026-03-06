
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { generateStudyContent } from '../services/geminiService';
import { ChatMessage, Subject } from '../types';

interface ChatInterfaceProps {
  subject: Subject;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ subject, initialMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await generateStudyContent(content, subject);
    
    // Pre-process LaTeX delimiters
    const processedResponse = (response || '')
      .replace(/\\\[/g, '$$$$')
      .replace(/\\\]/g, '$$$$')
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$');

    const aiMsg: ChatMessage = { role: 'model', content: processedResponse, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] glass-morphism rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-indigo-600 text-white p-4 font-bold flex items-center justify-between">
        <span>Gia sư AI - {subject === 'General' ? 'Tổng quát' : subject}</span>
        {loading && <div className="animate-pulse flex space-x-1">
          <div className="h-2 w-2 bg-white rounded-full"></div>
          <div className="h-2 w-2 bg-white rounded-full"></div>
          <div className="h-2 w-2 bg-white rounded-full"></div>
        </div>}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/90">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            <p>Chào bạn! Mình có thể giúp gì cho việc học môn {subject} của bạn?</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
            }`}>
              <div className="prose prose-sm prose-slate max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  components={{
                    p: ({children}) => <p className="mb-2 last:mb-0 text-slate-800 font-medium">{children}</p>,
                    li: ({children}) => <li className="text-slate-800 font-medium">{children}</li>,
                    table: ({children}) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-slate-300">{children}</table>
                      </div>
                    ),
                    th: ({children}) => <th className="border border-slate-300 px-4 py-2 bg-slate-100 text-slate-900 font-bold">{children}</th>,
                    td: ({children}) => <td className="border border-slate-300 px-4 py-2 text-slate-800">{children}</td>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Đặt câu hỏi về bài học..."
            className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={loading}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
