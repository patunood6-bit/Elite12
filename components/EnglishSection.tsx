
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { generateVocabularyByAI } from '../services/geminiService';
import EnglishStudyLibrary from './EnglishStudyLibrary';
import { VocabularyItem } from '../types';

const EnglishSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grammar' | 'library' | 'generator' | 'ai'>('library');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('B1-B2');
  const [count, setCount] = useState(10);
  const [generatedVocab, setGeneratedVocab] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateVocab = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await generateVocabularyByAI(topic, level, count);
      setGeneratedVocab(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const levels = [
    { value: 'A1-A2', label: 'Cơ bản (A1-A2)' },
    { value: 'B1-B2', label: 'Trung cấp (B1-B2)' },
    { value: 'C1-C2', label: 'Cao cấp (C1-C2)' },
    { value: 'A1', label: 'Cấp độ A1' },
    { value: 'A2', label: 'Cấp độ A2' },
    { value: 'B1', label: 'Cấp độ B1' },
    { value: 'B2', label: 'Cấp độ B2' },
    { value: 'C1', label: 'Cấp độ C1' },
    { value: 'C2', label: 'Cấp độ C2' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-slate-200 overflow-x-auto pb-1 whitespace-nowrap scrollbar-hide">
        {['library', 'grammar', 'generator', 'ai'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 px-4 font-bold transition-all ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 scale-105' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {tab === 'library' ? 'Kho từ vựng C1-C2' :
             tab === 'grammar' ? 'Ngữ pháp' : 
             tab === 'generator' ? 'Tạo từ vựng AI' : 'Gia sư AI'}
          </button>
        ))}
      </div>

      {activeTab === 'library' && <EnglishStudyLibrary />}

      {activeTab === 'grammar' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black mb-6 text-slate-800">Trọng tâm Ngữ pháp Lớp 12</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Câu điều kiện (Conditionals)', content: 'Loại 1, 2, 3 và câu hỗn hợp.', color: 'bg-indigo-50 text-indigo-800' },
                { title: 'Câu bị động (Passive Voice)', content: 'Cấu trúc cơ bản và các trường hợp đặc biệt.', color: 'bg-blue-50 text-blue-800' },
                { title: 'Mệnh đề quan hệ', content: 'Who, whom, whose, which, that...', color: 'bg-emerald-50 text-emerald-800' },
                { title: 'Câu tường thuật', content: 'Lùi thì, đổi trạng từ chỉ thời gian.', color: 'bg-amber-50 text-amber-800' },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl ${item.color} border border-white shadow-sm`}>
                  <h4 className="font-black mb-2">{item.title}</h4>
                  <p className="text-sm opacity-80">{item.content}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('ai')} 
              className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
              Hỏi AI về mẹo làm bài Ngữ pháp
            </button>
          </div>
        </div>
      )}

      {activeTab === 'generator' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-3xl font-black mb-2 text-slate-800">AI Vocabulary Pro</h3>
            <p className="text-slate-500 mb-8">Tạo danh sách từ vựng thông minh theo cấp độ và dịch thuật chi tiết.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Chủ đề mong muốn</label>
                <input 
                  type="text" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g. Artificial Intelligence, Climate Change..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Cấp độ (CEFR)</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold appearance-none"
                >
                  {levels.map(lv => (
                    <option key={lv.value} value={lv.value}>{lv.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng từ</label>
                <select 
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold appearance-none"
                >
                  {[5, 10, 15, 20, 25, 30].map(n => <option key={n} value={n}>{n} từ vựng</option>)}
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleGenerateVocab}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 disabled:opacity-50 flex items-center justify-center group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Đang học hỏi dữ liệu...
                </>
              ) : (
                <>
                  Bắt đầu tạo từ vựng 
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
            {generatedVocab.map((item, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-3xl font-black text-indigo-600 leading-none mb-2">{item.word}</h4>
                    <span className="text-slate-400 font-mono text-sm bg-slate-50 px-3 py-1 rounded-full">{item.ipa}</span>
                  </div>
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-tighter shadow-sm border border-indigo-100">
                    LEVEL {item.level}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-xl font-black text-slate-800 mb-1">{item.meaning}</p>
                  <div className="w-12 h-1 bg-indigo-100 rounded-full"></div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                   {item.synonyms && (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Synonyms</span>
                      <p className="text-emerald-700 font-bold">{item.synonyms}</p>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 flex items-center">
                      <span className="w-1 h-1 bg-slate-300 rounded-full mr-2"></span>
                      Example (English)
                    </span>
                    <p className="text-slate-600 italic font-bold leading-relaxed">"{item.example}"</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-2 flex items-center">
                      <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                      Dịch nghĩa (Vietnamese)
                    </span>
                    <p className="text-indigo-900/80 font-bold leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-50">"{item.exampleTranslation}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai' && <ChatInterface subject="English" />}
    </div>
  );
};

export default EnglishSection;
