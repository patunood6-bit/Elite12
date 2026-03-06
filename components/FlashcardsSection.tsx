
import React, { useState } from 'react';
import { generateFlashcardsByAI } from '../services/geminiService';
import FlashcardComponent, { FlashcardStyles } from './FlashcardComponent';
import { Subject } from '../types';

const FlashcardsSection: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState<Subject>('English');
  const [cards, setCards] = useState<{front: string, back: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Customization state
  const [styles, setStyles] = useState<FlashcardStyles>({
    theme: 'indigo',
    fontFamily: 'sans',
    textAlign: 'center',
    size: 'md',
  });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await generateFlashcardsByAI(subject, topic);
      setCards(result);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-black mb-1 text-slate-800 tracking-tight">Flashcards AI</h2>
            <p className="text-slate-500 font-medium">Học thông minh với trợ lý Elite12.</p>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${showSettings ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <span>Tùy chỉnh thẻ</span>
          </button>
        </div>

        {/* Customization Panel */}
        {showSettings && (
          <div className="mb-10 p-8 bg-slate-50 rounded-[2rem] border border-slate-200 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Theme Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Chủ đề màu sắc</label>
                <div className="flex flex-wrap gap-2">
                  {(['indigo', 'rose', 'emerald', 'amber', 'slate'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setStyles({ ...styles, theme: t })}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        styles.theme === t ? 'border-indigo-600 scale-110' : 'border-transparent'
                      } ${
                        t === 'indigo' ? 'bg-indigo-600' : 
                        t === 'rose' ? 'bg-rose-500' : 
                        t === 'emerald' ? 'bg-emerald-600' : 
                        t === 'amber' ? 'bg-amber-500' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Kiểu chữ</label>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                  {(['sans', 'serif', 'mono'] as const).map(f => (
                    <button 
                      key={f}
                      onClick={() => setStyles({ ...styles, fontFamily: f })}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold capitalize transition-all ${
                        styles.fontFamily === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Align Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Căn lề</label>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                  {(['left', 'center', 'right'] as const).map(a => (
                    <button 
                      key={a}
                      onClick={() => setStyles({ ...styles, textAlign: a })}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center ${
                        styles.textAlign === a ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {a === 'left' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16" />}
                        {a === 'center' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M4 18h16" />}
                        {a === 'right' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M10 12h10M4 18h16" />}
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Kích thước</label>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                  {(['sm', 'md', 'lg'] as const).map(s => (
                    <button 
                      key={s}
                      onClick={() => setStyles({ ...styles, size: s })}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-tighter transition-all ${
                        styles.size === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="w-full md:w-48">
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold appearance-none text-slate-700"
            >
              <option value="Math">Toán Học</option>
              <option value="Literature">Ngữ Văn</option>
              <option value="English">Tiếng Anh</option>
            </select>
          </div>
          <div className="flex-1">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Nhập chủ đề kiến thức lớp 12..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center min-w-[180px]"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : 'Tạo bộ thẻ ngay'}
          </button>
        </div>

        {cards.length > 0 && (
          <div className="flex flex-col items-center max-w-2xl mx-auto py-10 animate-in fade-in duration-500">
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
               <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
               />
            </div>

            <div className="w-full mb-12">
              <FlashcardComponent 
                key={`${currentIndex}-${styles.theme}-${styles.fontFamily}`}
                front={cards[currentIndex].front} 
                back={cards[currentIndex].back}
                styles={styles}
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="group flex items-center space-x-2 p-5 bg-white border border-slate-200 rounded-3xl hover:border-indigo-300 hover:shadow-xl disabled:opacity-30 transition-all"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                <span className="font-black text-slate-800 hidden sm:block">Trước</span>
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {currentIndex + 1}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">trên {cards.length} thẻ</span>
              </div>
              
              <button 
                onClick={() => setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))}
                disabled={currentIndex === cards.length - 1}
                className="group flex items-center space-x-2 p-5 bg-indigo-600 rounded-3xl hover:bg-indigo-700 hover:shadow-xl shadow-indigo-100 disabled:opacity-30 transition-all"
              >
                <span className="font-black text-white hidden sm:block">Tiếp theo</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        )}

        {!loading && cards.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[3rem]">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <p className="text-2xl font-black text-slate-400">Khám phá kiến thức mới</p>
            <p className="mt-2 text-slate-300 font-medium">AI sẽ tạo thẻ dựa trên chủ đề bạn quan tâm.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsSection;
