
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { startAIChatSession } from '../services/aiAssistantService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      const session = await startAIChatSession();
      setChatSession(session);
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading || !chatSession) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: input });
      const aiMsg: ChatMessage = { 
        role: 'model', 
        content: response.text || "Xin lỗi, mình không thể trả lời lúc này.", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMsg: ChatMessage = { 
        role: 'model', 
        content: "Đã có lỗi xảy ra. Vui lòng thử lại sau.", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    const initChat = async () => {
      const session = await startAIChatSession();
      setChatSession(session);
    };
    initChat();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-white font-black text-xl tracking-tight">Trợ giảng AI</h2>
            <div className="flex items-center text-indigo-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Đang trực tuyến | Gemini 3.1 Pro
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          title="Xóa hội thoại"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-4xl">👋</div>
            <div className="max-w-md">
              <h3 className="text-2xl font-black text-slate-800 mb-2">Chào sĩ tử!</h3>
              <p className="text-slate-500 font-medium">Mình là trợ giảng AI của Elite12. Mình có thể giúp bạn giải bài tập, tóm tắt kiến thức hoặc tư vấn lộ trình học tập. Bạn muốn bắt đầu với môn nào?</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {['Giải bài tập Toán', 'Tóm tắt Ngữ Văn', 'Học từ vựng Anh', 'Lộ trình ôn thi'].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-slate-200' : 'bg-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`p-4 rounded-[2rem] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
                }`}>
                  <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath]} 
                      rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-3 bg-white border border-slate-100 p-4 rounded-[2rem] rounded-bl-none shadow-sm">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trợ giảng đang suy nghĩ...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi của bạn tại đây..."
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 pr-16 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center">
            <Sparkles size={12} className="mr-1 text-indigo-400" />
            Hỗ trợ giải bài tập
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <div className="flex items-center">
            <Sparkles size={12} className="mr-1 text-indigo-400" />
            Tư vấn lộ trình
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
