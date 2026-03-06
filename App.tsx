
import React, { useState } from 'react';
import MathSection from './components/MathSection';
import LiteratureSection from './components/LiteratureSection';
import EnglishSection from './components/EnglishSection';
import ChatInterface from './components/ChatInterface';
import FlashcardsSection from './components/FlashcardsSection';
import WebBuilderSection from './components/WebBuilderSection';
import AboutSection from './components/AboutSection';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

import AIAssistant from './components/AIAssistant';

type AppTab = 'dashboard' | 'math' | 'lit' | 'eng' | 'cards' | 'ai' | 'ai-assistant' | 'web' | 'about';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [showIntro, setShowIntro] = useState(true);
  const [isPlus, setIsPlus] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const handleUpgradeClick = () => {
    if (isPlus) {
      setIsPlus(false); // Demo: toggle back to free
    } else {
      setShowPricing(true);
    }
  };

  const activatePlus = () => {
    setIsPlus(true);
    setShowPricing(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'math', label: 'Toán', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 13h.01M12 13h.01M15 13h.01M12 17h.01M16 21h4a2 2 0 002-2V5a2 2 0 00-2-2h-4M8 21H4a2 2 0 01-2-2V5a2 2 0 012-2h4' },
    { id: 'lit', label: 'Văn', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'eng', label: 'Anh', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
    { id: 'cards', label: 'Thẻ', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'ai', label: 'Hỏi AI', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'ai-assistant', label: 'Trợ giảng AI', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'web', label: 'Code Web', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'about', label: 'Về Elite12', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
            {showIntro && (
              <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl mb-12 group border border-white/10">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                
                <button 
                  onClick={() => setShowIntro(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all z-20 group/close"
                >
                  <svg className="w-5 h-5 text-white/50 group-hover/close:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <img 
                      src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d__4D_MUCXBOumxjWS4Pyrbgb0Uto0yI7uR7h3ZAyBHcNXRBcVpuyZ_-tWu8HcOAtn7jn2UDv3MWjmR9U8-Fdk_PetDsHl2PcyURyMzkIaAg9_WX_z1f-nd16LNuGjTZywPyCOgXvyh5IZeJn-fuHepIj8lMXpRWfJysW7A7s_iSxepBnYWfTz2mxC2Ef2lDDj8nDbcPNzKU27Cw286Pwd5xmw0V_k8Qaw_VrvOP0AwHJlZuTCEtQIEb_-Y44gPB8uczC5KDVZbpBcpsFtlj0SuD0F0oDwfJE32jMHi8sM5ZcVegIBsFfeZMbTUnDlIuCEpnW-3sq5Oh3uGsi-mtpjJDwRklWx8ANUoLKqM0Ym3q7bummPh0dvX0yJzGwQl6NrxqxW8sFUoUZMtFYhNHv0b_9e6LHqj0sWdMzkHXHp9rgvQiunREFTWQ_Qa05rqfts-Tc0Te3oHFDvXQylGT4mgwK7LPCj2jkW3CKxatcAtPLcEgGc6j5gAssgmEWuwJfbKKMOVq8RLnRJW36My165FPDHj2Xp-HkVlWRLBvM89U1EBe4PgkryeV8IyMnFfGpN6erJblXM-vbL_Xph0GoJE3yk-aFv_U2i6MzTGiwMJU1aptpEqGi-ASupjQP0xwLyFENNWvZAzKtYas60ein449-Rlup_JWTCng2p2WV2R1ntUi7qFciWv6qc70gDFxBlVt6m3cCOxT3iWYK0gEKwbaBpP_r2n-mXD9PkIOS1fmCuzKaauArRh5WAB8YvLpRzLJ0vCe9p__wrmNMmQRaRZWKfZ4gr_AugI3uyONeoG9sjK4v4n3hjr1jUxmQSegxl__7GxFoErVH16jfOra0fSBeeCgnSgWIaACVdtPlPiu1kUBHi6e_TcZtFxa3i2kYn41EKD0vymeiXetE_narzJwADf4GQD31sj6DLPCDH3VKkY5mXxRydWOnHWXYUObeCoZ4n5ex9mdLQ2k5uAtQYSX83Z3JKHNwUlIWM8ZU9tuc8Ruz2mhjhvXoR31hxQXXdS97_zOeZNVJvOJEQXbFN_ekGGbVGh0dAIQ4lF576HWPuDhTjq6qOrmHL0hQVDgbfHcTsjy0OwiGXchUKyy3y2lpYoPyKgL4dhAQ_6lzHBZpGP98bnAJTYRa6oytKQQ-rrAuSsJKSNKL_D3_8lJpiYaf0C0lb89kcKOJy2Fc4X1KAaMeKMJRLx-aPoUynefGgkt1JkXi5nhcmiCQOuAZ8P4a7beCnP8ZDASs5xAuUVOkRkmq98zkmNgHZ6sY39UChQJu3-2D5EsVvJlI3PrGG7DxxOI1iQ=s1024-rj" 
                      alt="Tú" 
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-2 border-white/20 shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl">Founder</div>
                  </div>

                  <div className="text-center md:text-left space-y-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-ping"></span>
                      New Update 2026
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black leading-tight">
                      Chào mừng bạn đến với <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Elite12</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg max-w-2xl leading-relaxed">
                      Sản phẩm được sáng tạo và phát triển bởi <span className="text-white font-bold underline decoration-indigo-500 underline-offset-4">Tú</span>. 
                      Chúng mình mang đến giải pháp học tập tối ưu nhất để bạn chinh phục mọi kỳ thi với kết quả rực rỡ nhất!
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                      <button 
                        onClick={() => setActiveTab('about')}
                        className="px-6 py-2 bg-white text-slate-900 rounded-xl font-black text-xs hover:scale-105 transition-transform shadow-lg"
                      >
                        Tìm hiểu về Elite12
                      </button>
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <span>🚀</span>
                        <span>Tốc độ vượt trội</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <span>🤖</span>
                        <span>AI Thông minh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <header className="mb-6 md:mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Chào sĩ tử <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPlus ? 'from-amber-500 to-yellow-600' : 'from-indigo-600 to-purple-600'}`}>Lớp 12!</span>
                  {isPlus && <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-tighter">Plus Member</span>}
                </h1>
                <p className="text-slate-500 text-base md:text-lg mt-2 font-medium">Lộ trình ôn thi 2026 đã sẵn sàng.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { id: 'math', title: 'Toán Học', desc: 'Công thức & tư duy.', color: 'from-blue-500 to-indigo-600', icon: 'Σ' },
                { id: 'lit', title: 'Ngữ Văn', desc: 'Phân tích & viết văn.', color: 'from-pink-500 to-rose-600', icon: '✎' },
                { id: 'eng', title: 'Tiếng Anh', desc: 'Từ vựng & Ngữ pháp.', color: 'from-emerald-500 to-teal-600', icon: 'A' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveTab(sub.id as AppTab)}
                  className="relative group overflow-hidden p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white shadow-sm border border-slate-100 text-left hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg`}>
                    {sub.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">{sub.title}</h3>
                  <p className="text-slate-500 mt-1 text-xs md:text-sm">{sub.desc}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
               <button 
                  onClick={() => setActiveTab('cards')}
                  className="flex items-center p-6 md:p-8 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all group"
               >
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${isPlus ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'} rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mr-4 md:mr-6`}>📇</div>
                  <div className="text-left">
                    <h3 className="text-xl md:text-2xl font-black text-slate-800">Flashcards AI</h3>
                    <p className="text-slate-500 text-sm">Ghi nhớ thông minh.</p>
                  </div>
               </button>
               <button 
                  onClick={() => setActiveTab('ai-assistant')}
                  className={`flex items-center p-6 md:p-8 ${isPlus ? 'bg-gradient-to-br from-amber-500 to-yellow-600 shadow-amber-200' : 'bg-indigo-600 shadow-indigo-200'} rounded-2xl md:rounded-[2.5rem] shadow-xl hover:opacity-90 transition-all group text-white`}
               >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mr-4 md:mr-6">🤖</div>
                  <div className="text-left">
                    <h3 className="text-xl md:text-2xl font-black">Trợ Giảng AI</h3>
                    <p className="text-white/70 text-sm">{isPlus ? 'Ưu tiên phản hồi 24/7' : 'Giải đáp mọi thắc mắc.'}</p>
                  </div>
               </button>
               <button 
                  onClick={() => setActiveTab('web')}
                  className="flex items-center p-6 md:p-8 bg-slate-800 rounded-2xl md:rounded-[2.5rem] shadow-xl hover:bg-slate-900 transition-all group text-white"
               >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mr-4 md:mr-6">💻</div>
                  <div className="text-left">
                    <h3 className="text-xl md:text-2xl font-black">Code Web</h3>
                    <p className="text-white/50 text-sm">Học lập trình trực quan.</p>
                  </div>
               </button>
            </div>

            {isPlus && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {[
                  { title: 'Đề thi thử ĐGNL', icon: '📝', desc: 'Cập nhật 2026' },
                  { title: 'Video bài giảng', icon: '🎥', desc: 'Độc quyền Tổ 4' },
                  { title: 'Tài liệu PDF', icon: '📂', desc: 'Tải xuống không giới hạn' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-amber-50 border border-amber-100 rounded-3xl flex items-center space-x-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">{item.title}</h4>
                      <p className="text-amber-700 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black mb-3">500 Từ vựng Nâng cao</h3>
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-6 leading-relaxed">Dữ liệu từ vựng chuyên sâu từ tài liệu Cô Mai Phương phục vụ kì thi THPTQG & ĐGNL 2026.</p>
                  <button 
                    onClick={() => setActiveTab('eng')}
                    className="bg-white text-indigo-900 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:scale-105 transition-transform"
                  >
                    Mở kho tài liệu ngay
                  </button>
               </div>
            </div>
          </div>
        );
      case 'math': return <MathSection />;
      case 'lit': return <LiteratureSection />;
      case 'eng': return <EnglishSection />;
      case 'cards': return <FlashcardsSection />;
      case 'ai': return <ChatInterface subject="General" />;
      case 'ai-assistant': return <AIAssistant />;
      case 'web': return <WebBuilderSection />;
      case 'about': return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex w-72 bg-white border-r border-slate-200 p-6 flex-col space-y-2 sticky top-0 h-screen z-20">
        <div className="flex flex-col items-center mb-12 px-2 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
          <div className="relative w-36 h-36 bg-white border-2 border-indigo-400 flex items-center justify-center overflow-hidden mb-4 shadow-sm">
            <img 
              src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_86ua4ypt-pEq57KMZTfLUDPBpL3zzkohuLeDMK7ssPxpgKzbqBFHR9iGYwDlJ2gRu6ZVj65CNLHpvfphSf1grK_BxBTiLGFkwpbX85pyNJ5W_XU0TuyVm1YEdkbtJsrgJI3LIZQ1tdemHzDnobmLO1IQZGNAZg-p_tdYvz5mzD0neKWqKpau11c4GZDO6K51y9915oRbNpiKuEPasMjHptc-Bwge0Zj-yi_lTp8cKw-u4s0LTt0uehqPGtHaBZxxy8N2YR8x-BCTV_VCXU_EOuebjKIlFkYT7VOJ0grUlTiwXPaPT1HunrDaCkJDffRc73OjrjobjmqcXNBHZ4htsy5cc6fq9ugIF2-WrMlv6EvWY1k-fOACeKKw2CAmau5g1j3recpHruauNBaIw4rdLj50xBsQKTp8lxpJUDcTJDhst273Kcv3oYMtDe08GLLn-7LLGeyHeYXMdYHZr7sTnY09PSL7rQ1XZQsqCt1TdbOsUrQA4aflkyOXmBieCDoojoc07yIIUjFfCD3vFM6Qc91SLkLzRu-Ewyrt4_sOJoqsJMBV6X-d0J29oA9IhDA3QR2QKMNHKrZwkJv9b98aBHmgD9yERaWrhmIglaOh-INz6BRrghooQw5BEoDD9KHUSNsGskMrxZjLZ0hyP-sRqu9npn2eovvUgJ7q339u655sDPpM5vrV-4PcrWDlr4bohKAa7fNY8urRzXlertQX9I-wuEQX6TpwJdK7xlf5ejLY1kWnUE9E-QmR4kDKElG1uV6QSm6pebINUTOIoJh5roxBQIu3-mZcTOY-iPj3nrwGyVGxg4IlRwMyYyWNCRhFF8zRS_p1VUrhju2e4JyQHNxoaM-dzIa1dwpl83Quqb7Pfpola-Rp1SpL_69ZGDhOneVysmD57JQI-jkVj6glsgSVyuLiNmKcMyps-OmRgw3d8ZDd9cPZYzyrf8oMBX5poEAsk0zrAQ0oA7EqjwxrpnKEYlv3o8OAALUI1kw6h-OefmtrBVjoJkZCw2tweY8ciNM35oOB4eI62eFONExzEfTx6tQDIx37dbDr-xN-Z7vyeS4MELoSftPZZQ79sZaZI_wQsVW4D_Mp6OEr4XbdUkaE4oL3NKXMnLAinAlPZ7eUhrGnDJfZaWwe6-anEtKpYnOBGHTVxkUr_zplHttEmNer1LFP-2xH5gISrpIdBgBfTwo3OlsVk5eq_0lERUdJjuop7AThjFoNDnIhuZXBLjncCMpb96JiUHLhR9aiCX3s9QLf0SrqY4A1IO8pFTrDYz8ABUpPu7lYYAqH9ubN6aQEGkcL4=s1024-rj" 
              alt="Elite12 Logo" 
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-slate-800 tracking-tight leading-none">Elite12</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter text-indigo-600 mt-2 text-center">
              KẾT NỐI TRI THỨC | CHINH PHỤC TƯƠNG LAI
            </span>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AppTab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all font-semibold ${
                activeTab === item.id 
                  ? (isPlus ? 'bg-amber-50 text-amber-700 shadow-sm' : 'bg-indigo-50 text-indigo-600 shadow-sm')
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={handleUpgradeClick}
            className={`w-full p-4 rounded-2xl flex flex-col items-center text-center transition-all ${
              isPlus 
                ? 'bg-slate-900 text-white' 
                : 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-lg shadow-amber-200 hover:scale-[1.02]'
            }`}
          >
            <span className="text-2xl mb-1">{isPlus ? '✨' : '💎'}</span>
            <span className="text-sm font-black uppercase tracking-wider">{isPlus ? 'Đang dùng Plus' : 'Nâng cấp Plus'}</span>
            <span className="text-[10px] opacity-70 mt-1">{isPlus ? 'Quản lý gói cước' : 'Mở khóa mọi tính năng'}</span>
          </button>
        </div>
      </nav>

      {/* Top Bar for Mobile */}
      <header className={`md:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between`}>
        <div className="flex items-center space-x-2" onClick={() => setActiveTab('dashboard')}>
          <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src="https://picsum.photos/seed/elite12-logo/100/100" 
              alt="Elite12 Logo" 
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-lg font-black text-slate-800">Elite12</span>
        </div>
        <button 
          onClick={handleUpgradeClick}
          className={`text-[10px] font-black ${isPlus ? 'text-amber-700 bg-amber-100 border-amber-200' : 'text-indigo-600 bg-indigo-50 border-indigo-100'} px-3 py-1 rounded-full uppercase border shadow-sm`}
        >
          {isPlus ? '✨ Plus' : '💎 Lên Plus'}
        </button>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 md:p-12 pb-24 md:pb-12">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AppTab)}
            className={`flex flex-col items-center p-2 min-w-[64px] rounded-xl transition-all ${
              activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
            </svg>
            <span className="text-[10px] font-bold truncate w-full text-center">{item.label}</span>
          </button>
        ))}
      </nav>
      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative bg-gradient-to-br from-amber-400 to-yellow-600 p-8 text-white text-center">
              <button 
                onClick={() => setShowPricing(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="text-4xl mb-4">💎</div>
              <h2 className="text-3xl font-black mb-2">Nâng cấp Elite12 Plus</h2>
              <p className="text-white/80 font-medium">Mở khóa toàn bộ sức mạnh AI và tài liệu độc quyền</p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <button 
                  onClick={activatePlus}
                  className="group relative p-6 rounded-3xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 transition-all text-left"
                >
                  <div className="absolute top-4 right-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">✓</div>
                  <h3 className="text-lg font-black text-slate-800 mb-1">Gói Tháng</h3>
                  <div className="text-2xl font-black text-amber-600 mb-4">99.000đ <span className="text-sm font-normal text-slate-400">/tháng</span></div>
                  <ul className="text-xs text-slate-500 space-y-2">
                    <li>• Đầy đủ tính năng Plus</li>
                    <li>• Gia hạn hàng tháng</li>
                    <li>• Hỗ trợ 24/7</li>
                  </ul>
                </button>

                <button 
                  onClick={activatePlus}
                  className="group relative p-6 rounded-3xl border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 transition-all text-left"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Tiết kiệm nhất</div>
                  <div className="absolute top-4 right-4 text-amber-500">✓</div>
                  <h3 className="text-lg font-black text-slate-800 mb-1">Gói Trọn Đời</h3>
                  <div className="text-2xl font-black text-amber-600 mb-4">800.000đ <span className="text-sm font-normal text-slate-400">/vĩnh viễn</span></div>
                  <ul className="text-xs text-slate-500 space-y-2">
                    <li>• Mọi tính năng mãi mãi</li>
                    <li>• Không phí phát sinh</li>
                    <li>• Ưu tiên cập nhật sớm nhất</li>
                  </ul>
                </button>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={activatePlus}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-amber-200 hover:scale-[1.02] transition-transform"
                >
                  Bắt đầu trải nghiệm ngay
                </button>
                <p className="text-center text-[10px] text-slate-400">Thanh toán an toàn qua chuyển khoản hoặc ví điện tử. Hoàn tiền trong 7 ngày nếu không hài lòng.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center group">
        {/* Label - Hidden by default, slides in on group hover */}
        <div 
          className="bg-[#333333] text-white px-4 py-2 rounded-md mr-3 shadow-xl border border-white/5 flex items-center opacity-0 group-hover:opacity-100 translate-x-8 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none"
        >
          <span className="font-bold text-[13px] tracking-tight whitespace-nowrap" style={{ textShadow: '0 0 2px rgba(255,255,255,0.3)' }}>
            Đường dây nóng: <span className="ml-1">0924898765</span>
          </span>
        </div>
        
        {/* Icon with ripple and ringing effects */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative cursor-pointer"
          onClick={() => window.location.href = 'tel:0924898765'}
        >
          {/* Ripple Effects (Subtle) */}
          <div className="absolute inset-0 rounded-full bg-[#38761d]/40 animate-ping opacity-20 scale-150"></div>
          
          {/* Outer Rings */}
          <div className="absolute -inset-3 rounded-full border-2 border-[#38761d]/10 animate-pulse"></div>
          <div className="absolute -inset-1.5 rounded-full border-2 border-[#38761d]/30"></div>
          
          {/* Main Circle */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 bg-[#38761d] rounded-full flex items-center justify-center shadow-2xl relative z-10 border-4 border-white/10 overflow-hidden"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut",
                repeatDelay: 2
              }}
            >
              <Phone size={24} className="text-white fill-current" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
