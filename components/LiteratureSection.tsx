
import React, { useState } from 'react';
import ChatInterface from './ChatInterface';

const WORKS = [
  { id: '1', title: 'Tuyên ngôn Độc lập', author: 'Hồ Chí Minh', year: 1945 },
  { id: '2', title: 'Tây Tiến', author: 'Quang Dũng', year: 1948 },
  { id: '3', title: 'Việt Bắc', author: 'Tố Hữu', year: 1954 },
  { id: '4', title: 'Sóng', author: 'Xuân Quỳnh', year: 1967 },
  { id: '5', title: 'Vợ chồng A Phủ', author: 'Tô Hoài', year: 1952 },
];

const LiteratureSection: React.FC = () => {
  const [selectedWork, setSelectedWork] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {!selectedWork ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKS.map(work => (
            <div 
              key={work.id} 
              onClick={() => setSelectedWork(work.title)}
              className="group cursor-pointer p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${work.title}/400/300`} 
                  alt={work.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{work.title}</h3>
              <p className="text-slate-500 font-medium">{work.author}</p>
              <div className="mt-4 flex items-center text-indigo-600 text-sm font-semibold">
                Xem phân tích & soạn bài
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedWork(null)}
            className="flex items-center text-indigo-600 hover:underline mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Quay lại danh sách
          </button>
          <ChatInterface 
            subject="Literature" 
            initialMessage={`Phân tích chi tiết tác phẩm "${selectedWork}", tập trung vào các ý chính để ôn thi THPT Quốc gia.`} 
          />
        </div>
      )}
    </div>
  );
};

export default LiteratureSection;
