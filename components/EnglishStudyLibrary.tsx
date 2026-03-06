
import React, { useState, useMemo } from 'react';
import { VocabularyItem } from '../types';
import FlashcardComponent, { FlashcardStyles } from './FlashcardComponent';

const ADVANCED_VOCAB: VocabularyItem[] = [
  // --- Psychology & Personal Growth ---
  { word: 'mindfulness', type: 'n', ipa: '/ˈmaɪndflnəs/', meaning: 'sự chánh niệm, sự lưu tâm', level: 'C1', topic: 'Psychology' },
  { word: 'self-esteem', type: 'n', ipa: '/ˌself ɪˈstiːm/', meaning: 'lòng tự trọng, tự tôn', level: 'C1', topic: 'Psychology', synonyms: 'self-worth', antonyms: 'self-doubt' },
  { word: 'impulsive', type: 'adj', ipa: '/ɪmˈpʌlsɪv/', meaning: 'bốc đồng, hấp tấp', level: 'C2', topic: 'Psychology', synonyms: 'rash', antonyms: 'thoughtful' },
  { word: 'perspective', type: 'n', ipa: '/pərˈspektɪv/', meaning: 'góc nhìn, quan điểm', level: 'C1', topic: 'Psychology', synonyms: 'viewpoint' },
  { word: 'resilience', type: 'n', ipa: '/rɪˈzɪliəns/', meaning: 'khả năng phục hồi, kiên cường', level: 'C2', topic: 'Psychology', antonyms: 'fragility' },
  { word: 'self-discipline', type: 'n', ipa: '/ˌselfˈdɪs.ə.plɪn/', meaning: 'kỷ luật bản thân', level: 'C2', topic: 'Psychology' },
  { word: 'compulsive', type: 'adj', ipa: '/kəmˈpʌlsɪv/', meaning: 'không thể cưỡng lại', level: 'C2', topic: 'Psychology' },
  { word: 'gratification', type: 'n', ipa: '/ˌɡrætɪfɪˈkeɪʃn/', meaning: 'sự hài lòng, thỏa mãn', level: 'C1', topic: 'Psychology' },
  { word: 'deteriorate', type: 'v', ipa: '/dɪˈtɪəriəreɪt/', meaning: 'làm giảm giá trị, suy yếu', level: 'C1', topic: 'Psychology' },
  { word: 'altruism', type: 'n', ipa: '/ˈæltruɪzəm/', meaning: 'lòng vị tha', level: 'C2', topic: 'Psychology' },

  // --- Environment & Science ---
  { word: 'irrigation', type: 'n', ipa: '/ˌɪrɪˈɡeɪʃn/', meaning: 'sự tưới tiêu', level: 'C2', topic: 'Environment' },
  { word: 'sustainability', type: 'n', ipa: '/səˌsteɪnəˈbɪləti/', meaning: 'sự bền vững', level: 'C2', topic: 'Environment' },
  { word: 'microplastic', type: 'n', ipa: '/ˌmaɪkrəʊˈplæstɪk/', meaning: 'vi nhựa', level: 'C1', topic: 'Environment' },
  { word: 'contaminate', type: 'v', ipa: '/kənˈtæmɪneɪt/', meaning: 'làm ô nhiễm', level: 'C1', topic: 'Environment' },
  { word: 'deforestation', type: 'n', ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/', meaning: 'sự phá rừng', level: 'C1', topic: 'Environment' },
  { word: 'biodiversity', type: 'n', ipa: '/ˌbaɪəʊdaɪˈvɜːsəti/', meaning: 'sự đa dạng sinh học', level: 'C1', topic: 'Environment' },
  { word: 'ecosystem', type: 'n', ipa: '/ˈiːkəʊˌsɪstəm/', meaning: 'hệ sinh thái', level: 'C1', topic: 'Environment' },
  { word: 'conservation', type: 'n', ipa: '/ˌkɒnsəˈveɪʃn/', meaning: 'sự bảo tồn', level: 'C1', topic: 'Environment' },
  { word: 'depletion', type: 'n', ipa: '/dɪˈpliːʃn/', meaning: 'sự cạn kiệt', level: 'C2', topic: 'Environment' },
  { word: 'greenhouse effect', type: 'n.p', ipa: '/ˈɡriːn.haʊs ɪˌfekt/', meaning: 'hiệu ứng nhà kính', level: 'C1', topic: 'Environment' },

  // --- Technology & Innovation ---
  { word: 'innovation', type: 'n', ipa: '/ˌɪnəˈveɪʃn/', meaning: 'sự đổi mới, sáng tạo', level: 'C1', topic: 'Technology' },
  { word: 'infrastructure', type: 'n', ipa: '/ˈɪnfrəstrʌktʃər/', meaning: 'cơ sở hạ tầng', level: 'C1', topic: 'Technology' },
  { word: 'automation', type: 'n', ipa: '/ˌɔːtəˈmeɪʃn/', meaning: 'tự động hóa', level: 'C1', topic: 'Technology' },
  { word: 'algorithm', type: 'n', ipa: '/ˈælɡərɪðəm/', meaning: 'thuật toán', level: 'C2', topic: 'Technology' },
  { word: 'artificial intelligence', type: 'n.p', ipa: '/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/', meaning: 'trí tuệ nhân tạo', level: 'C1', topic: 'Technology' },
  { word: 'cybersecurity', type: 'n', ipa: '/ˌsaɪbəsɪˈkjʊərəti/', meaning: 'an ninh mạng', level: 'C1', topic: 'Technology' },
  { word: 'virtual reality', type: 'n.p', ipa: '/ˌvɜː.tʃu.əl riˈæl.ə.ti/', meaning: 'thực tế ảo', level: 'C1', topic: 'Technology' },
  { word: 'interconnectivity', type: 'n', ipa: '/ˌɪntəkəˌnekˈtɪvəti/', meaning: 'khả năng kết nối', level: 'C2', topic: 'Technology' },
  { word: 'obsolescence', type: 'n', ipa: '/ˌɒbsəˈlesns/', meaning: 'sự trở nên lỗi thời', level: 'C2', topic: 'Technology' },

  // --- Society & Culture ---
  { word: 'urbanisation', type: 'n', ipa: '/ˌɜːbənaɪˈzeɪʃən/', meaning: 'sự đô thị hóa', level: 'C1', topic: 'Society' },
  { word: 'stereotype', type: 'n', ipa: '/ˈsteriətaɪp/', meaning: 'khuôn mẫu, định kiến', level: 'C1', topic: 'Society' },
  { word: 'integration', type: 'n', ipa: '/ˌɪntɪˈɡreɪʃn/', meaning: 'sự hội nhập', level: 'C1', topic: 'Society' },
  { word: 'heritage', type: 'n', ipa: '/ˈherɪtɪdʒ/', meaning: 'di sản', level: 'C1', topic: 'Society' },
  { word: 'multiculturalism', type: 'n', ipa: '/ˌmʌltiˈkʌltʃərəlɪzəm/', meaning: 'chủ nghĩa đa văn hóa', level: 'C1', topic: 'Society' },
  { word: 'discrimination', type: 'n', ipa: '/dɪˌskrɪmɪˈneɪʃn/', meaning: 'sự phân biệt đối xử', level: 'C1', topic: 'Society' },
  { word: 'marginalized', type: 'adj', ipa: '/ˈmɑːdʒɪnəlaɪzd/', meaning: 'bị gạt ra bên lề', level: 'C2', topic: 'Society' },
  { word: 'solidarity', type: 'n', ipa: '/ˌsɒlɪˈdærəti/', meaning: 'sự đoàn kết', level: 'C1', topic: 'Society' },

  // --- Economics & Business ---
  { word: 'subsidy', type: 'n', ipa: '/ˈsʌbsɪdi/', meaning: 'tiền trợ cấp', level: 'C1', topic: 'Economy' },
  { word: 'inflation', type: 'n', ipa: '/ɪnˈfleɪʃn/', meaning: 'lạm phát', level: 'C1', topic: 'Economy' },
  { word: 'recession', type: 'n', ipa: '/rɪˈseʃn/', meaning: 'sự suy thoái kinh tế', level: 'C1', topic: 'Economy' },
  { word: 'monopoly', type: 'n', ipa: '/məˈnɒpəli/', meaning: 'sự độc quyền', level: 'C2', topic: 'Economy' },
  { word: 'prosperity', type: 'n', ipa: '/prɒsˈperəti/', meaning: 'sự thịnh vượng', level: 'C1', topic: 'Economy' },
  { word: 'entrepreneurship', type: 'n', ipa: '/ˌɒntrəprəˈnɜːʃɪp/', meaning: 'khả năng khởi nghiệp', level: 'C1', topic: 'Economy' },
  
  // --- Academic & Education ---
  { word: 'comprehensive', type: 'adj', ipa: '/ˌkɒmprɪˈhensɪv/', meaning: 'toàn diện', level: 'C1', topic: 'Academic' },
  { word: 'curriculum', type: 'n', ipa: '/kəˈrɪkjələm/', meaning: 'chương trình giảng dạy', level: 'C1', topic: 'Academic' },
  { word: 'pedagogy', type: 'n', ipa: '/ˈpedəɡɒdʒi/', meaning: 'phương pháp giáo dục', level: 'C2', topic: 'Academic' },
  { word: 'literacy', type: 'n', ipa: '/ˈlɪtərəsi/', meaning: 'trình độ học vấn', level: 'C1', topic: 'Academic' },
  { word: 'indispensable', type: 'adj', ipa: '/ˌɪndɪˈspensəbəl/', meaning: 'không thể thiếu', level: 'C2', topic: 'Academic' },
  { word: 'plagiarism', type: 'n', ipa: '/ˈpleɪdʒərɪzəm/', meaning: 'sự đạo văn', level: 'C1', topic: 'Academic' },
  { word: 'assessment', type: 'n', ipa: '/əˈsesmənt/', meaning: 'sự đánh giá', level: 'C1', topic: 'Academic' },
  { word: 'ubiquitous', type: 'adj', ipa: '/juːˈbɪkwɪtəs/', meaning: 'phổ biến khắp nơi', level: 'C1', topic: 'Academic' },
];

const TOPICS = ['All', 'Psychology', 'Environment', 'Technology', 'Society', 'Economy', 'Academic'];

const EnglishStudyLibrary: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [search, setSearch] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  const [styles, setStyles] = useState<FlashcardStyles>({
    theme: 'indigo',
    fontFamily: 'sans',
    textAlign: 'center',
    size: 'md',
  });

  const filtered = useMemo(() => {
    return ADVANCED_VOCAB.filter(item => {
      const matchesSearch = item.word.toLowerCase().includes(search.toLowerCase()) || 
                            item.meaning.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(item.topic);
      return matchesSearch && matchesTopic;
    });
  }, [search, selectedTopics]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">Kho Từ Vựng Elite12</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Dữ liệu từ vựng nâng cao Cô Mai Phương</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl w-full lg:w-auto">
            <button 
              onClick={() => setMode('list')}
              className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl font-bold transition-all text-sm md:text-base ${mode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Danh sách
            </button>
            <button 
              onClick={() => { setMode('flashcard'); setCurrentIndex(0); }}
              className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl font-bold transition-all text-sm md:text-base ${mode === 'flashcard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Flashcard
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text"
              placeholder="Tìm nhanh từ vựng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-sm md:text-base"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Lọc theo chủ đề:</span>
              {selectedTopics.length > 0 && (
                <button 
                  onClick={() => setSelectedTopics([])}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                >
                  Xóa tất cả ({selectedTopics.length})
                </button>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                className="w-full md:w-auto flex items-center justify-between px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-indigo-300 transition-all shadow-sm"
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {selectedTopics.length === 0 
                    ? 'Tất cả chủ đề' 
                    : `Đã chọn ${selectedTopics.length} chủ đề`}
                </div>
                <svg className={`w-4 h-4 ml-4 transition-transform ${isTopicDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTopicDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsTopicDropdownOpen(false)}
                  ></div>
                  <div className="absolute left-0 mt-2 w-full md:w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl z-40 p-3 animate-in fade-in zoom-in-95 duration-200">
                    <div className="space-y-1">
                      <button
                        onClick={() => { setSelectedTopics([]); setCurrentIndex(0); }}
                        className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${selectedTopics.length === 0 ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                        <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center transition-colors ${selectedTopics.length === 0 ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                          {selectedTopics.length === 0 && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                        </div>
                        Tất cả chủ đề
                      </button>
                      <div className="h-px bg-slate-100 my-2"></div>
                      {TOPICS.filter(t => t !== 'All').map(topic => (
                        <button
                          key={topic}
                          onClick={() => { 
                            setSelectedTopics(prev => 
                              prev.includes(topic) 
                                ? prev.filter(t => t !== topic) 
                                : [...prev, topic]
                            ); 
                            setCurrentIndex(0); 
                          }}
                          className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${selectedTopics.includes(topic) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}
                        >
                          <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center transition-colors ${selectedTopics.includes(topic) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                            {selectedTopics.includes(topic) && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </div>
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {mode === 'list' ? (
        <div className="space-y-3">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-5">Từ vựng</th>
                  <th className="px-8 py-5">Nghĩa & Loại</th>
                  <th className="px-8 py-5">Chủ đề</th>
                  <th className="px-8 py-5">Cấp độ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-slate-900">{item.word}</span>
                        <span className="text-xs text-slate-400 font-mono">{item.ipa}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-indigo-400 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">{item.type}</span>
                        <span className="text-base font-bold text-slate-700">{item.meaning}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg border border-slate-200">{item.topic}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${item.level === 'C2' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        {item.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filtered.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{item.word}</h4>
                    <span className="text-xs text-slate-400 font-mono">{item.ipa}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${item.level === 'C2' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {item.level}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-indigo-400 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">{item.type}</span>
                  <span className="text-base font-bold text-slate-700">{item.meaning}</span>
                </div>
                <div className="pt-3 border-t border-slate-50">
                  <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] font-black uppercase rounded border border-slate-100">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold">Không tìm thấy từ vựng nào.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6">
          {filtered.length > 0 ? (
            <>
              <div className="w-full">
                <FlashcardComponent 
                  key={filtered[currentIndex].word}
                  front={filtered[currentIndex].word}
                  back={`${filtered[currentIndex].meaning}\n\n[${filtered[currentIndex].type}] ${filtered[currentIndex].ipa}\n\nChủ đề: ${filtered[currentIndex].topic}`}
                  styles={styles}
                />
              </div>

              <div className="flex items-center justify-between w-full px-4">
                <button 
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="p-4 bg-white border border-slate-200 rounded-2xl disabled:opacity-20 shadow-sm"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="text-center">
                   <span className="text-2xl font-black text-slate-900">{currentIndex + 1} / {filtered.length}</span>
                </div>
                <button 
                  onClick={() => setCurrentIndex(prev => Math.min(filtered.length - 1, prev + 1))}
                  disabled={currentIndex === filtered.length - 1}
                  className="p-4 bg-indigo-600 text-white rounded-2xl disabled:opacity-20 shadow-indigo-100 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </>
          ) : (
            <div className="py-20 text-slate-400 font-bold">Vui lòng chọn chủ đề khác.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnglishStudyLibrary;
