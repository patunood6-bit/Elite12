
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ChatInterface from './ChatInterface';

interface MathFormula {
  id: string;
  name: string;
  formula: string;
  description?: string;
  grade: 10 | 11 | 12;
  category: string;
}

const MATH_DATA: MathFormula[] = [
  // LỚP 12
  { id: '12-1', grade: 12, category: 'Giải tích', name: 'Đạo hàm hàm số mũ', formula: "$(e^x)' = e^x; \\quad (a^x)' = a^x \\ln a$" },
  { id: '12-2', grade: 12, category: 'Giải tích', name: 'Đạo hàm hàm số Logarit', formula: "$(\\ln x)' = \\frac{1}{x}; \\quad (\\log_a x)' = \\frac{1}{x \\ln a}$" },
  { id: '12-3', grade: 12, category: 'Giải tích', name: 'Nguyên hàm cơ bản', formula: "$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$" },
  { id: '12-4', grade: 12, category: 'Giải tích', name: 'Tích phân từng phần', formula: "$\\int u \\, dv = uv - \\int v \\, du$" },
  { id: '12-5', grade: 12, category: 'Hình học', name: 'Thể tích khối chóp', formula: "$V = \\frac{1}{3} B \\cdot h$" },
  { id: '12-6', grade: 12, category: 'Hình học', name: 'Thể tích khối lăng trụ', formula: "$V = B \\cdot h$" },
  { id: '12-7', grade: 12, category: 'Số phức', name: 'Số phức liên hợp', formula: "$z = a + bi \\Rightarrow \\bar{z} = a - bi$" },
  { id: '12-8', grade: 12, category: 'Oxyz', name: 'Phương trình mặt phẳng', formula: "$A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$" },
  
  // LỚP 11
  { id: '11-1', grade: 11, category: 'Lượng giác', name: 'Phương trình sin x = a', formula: "$\\sin x = \\sin \\alpha \\Leftrightarrow \\begin{cases} x = \\alpha + k2\\pi \\\\ x = \\pi - \\alpha + k2\\pi \\end{cases}$" },
  { id: '11-2', grade: 11, category: 'Dãy số', name: 'Cấp số cộng (Số hạng tổng quát)', formula: "$u_n = u_1 + (n-1)d$" },
  { id: '11-3', grade: 11, category: 'Dãy số', name: 'Cấp số nhân (Số hạng tổng quát)', formula: "$u_n = u_1 \\cdot q^{n-1}$" },
  { id: '11-4', grade: 11, category: 'Giới hạn', name: 'Giới hạn cơ bản', formula: "$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$" },
  { id: '11-5', grade: 11, category: 'Đạo hàm', name: 'Đạo hàm hàm hợp', formula: "$y'_x = y'_u \\cdot u'_x$" },
  { id: '11-6', grade: 11, category: 'Tổ hợp', name: 'Chỉnh hợp $A_n^k$', formula: "$A_n^k = \\frac{n!}{(n-k)!}$" },
  { id: '11-7', grade: 11, category: 'Tổ hợp', name: 'Tổ hợp $C_n^k$', formula: "$C_n^k = \\frac{n!}{k!(n-k)!}$" },

  // LỚP 10
  { id: '10-1', grade: 10, category: 'Đại số', name: 'Nghiệm phương trình bậc 2', formula: "$\\Delta = b^2 - 4ac; \\quad x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$" },
  { id: '10-2', grade: 10, category: 'Đại số', name: 'Định lý Vi-ét', formula: "$x_1 + x_2 = -\\frac{b}{a}; \\quad x_1 x_2 = \\frac{c}{a}$" },
  { id: '10-3', grade: 10, category: 'Lượng giác', name: 'Công thức cộng', formula: "$\\cos(a-b) = \\cos a \\cos b + \\sin a \\sin b$" },
  { id: '10-4', grade: 10, category: 'Vectơ', name: 'Tích vô hướng', formula: "$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b})$" },
  { id: '10-5', grade: 10, category: 'Hình học', name: 'Định lý Cosin', formula: "$a^2 = b^2 + c^2 - 2bc \\cos A$" },
  { id: '10-6', grade: 10, category: 'Hình học', name: 'Diện tích tam giác (Heron)', formula: "$S = \\sqrt{p(p-a)(p-b)(p-c)}$" },
];

const MathSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'ai'>('formulas');
  const [selectedGrade, setSelectedGrade] = useState<10 | 11 | 12 | 'all'>(12);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFormulas = MATH_DATA.filter(f => {
    const matchesGrade = selectedGrade === 'all' || f.grade === selectedGrade;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         f.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('formulas')}
            className={`pb-2 px-4 font-bold transition-all ${activeTab === 'formulas' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Sổ tay Công thức
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`pb-2 px-4 font-bold transition-all ${activeTab === 'ai' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Giải bài tập với AI
          </button>
        </div>
        
        {activeTab === 'formulas' && (
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-1 border border-slate-200">
            <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Tìm công thức..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-40 md:w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {activeTab === 'formulas' ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {[12, 11, 10, 'all'].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade as any)}
                className={`px-6 py-2 rounded-full text-sm font-black transition-all border-2 ${
                  selectedGrade === grade 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {grade === 'all' ? 'Tất cả' : `Lớp ${grade}`}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {/* Logic to group and display formulas */}
            {(selectedGrade === 'all' ? [12, 11, 10] : [selectedGrade as number]).map(grade => {
              const gradeFormulas = filteredFormulas.filter(f => f.grade === grade);
              if (gradeFormulas.length === 0) return null;

              // Group by category
              const categories = Array.from(new Set(gradeFormulas.map(f => f.category)));

              return (
                <div key={grade} className="space-y-8">
                  {selectedGrade === 'all' && (
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-black text-slate-900">Lớp {grade}</h2>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                  )}
                  
                  {categories.map(cat => {
                    const catFormulas = gradeFormulas.filter(f => f.category === cat);
                    return (
                      <div key={cat} className="space-y-4">
                        <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                          {cat}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {catFormulas.map(f => (
                            <div key={f.id} className="group p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-200 transition-all transform hover:-translate-y-1">
                              <h3 className="text-lg font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">{f.name}</h3>
                              <div className="p-4 bg-slate-50 rounded-2xl text-center font-mono text-xl text-slate-900 overflow-x-auto border border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                  {f.formula}
                                </ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {filteredFormulas.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <p className="text-lg font-medium">Không tìm thấy công thức nào phù hợp.</p>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-black mb-2">Bạn cần giải bài tập cụ thể?</h4>
                <p className="text-indigo-100">Chụp ảnh hoặc nhập đề bài để AI Elite12 hướng dẫn bạn từng bước giải chi tiết.</p>
              </div>
              <button 
                onClick={() => setActiveTab('ai')}
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-lg whitespace-nowrap"
              >
                Thử ngay AI Tutor
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ChatInterface subject="Math" />
      )}
    </div>
  );
};

export default MathSection;
