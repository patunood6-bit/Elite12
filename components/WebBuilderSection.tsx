
import React, { useState, useEffect } from 'react';

const WebBuilderSection: React.FC = () => {
  const [html, setHtml] = useState('<h1>Chào mừng đến với Elite12 Web Builder!</h1>\n<p>Hãy thử chỉnh sửa code ở bên trái.</p>\n<button onclick="sayHello()">Click me</button>');
  const [css, setCss] = useState('body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 50px;\n  background: #f0f9ff;\n}\nh1 {\n  color: #0369a1;\n}\nbutton {\n  padding: 10px 20px;\n  background: #0ea5e9;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}');
  const [js, setJs] = useState('function sayHello() {\n  alert("Chào bạn! Chúc bạn học tốt!");\n}');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Lập trình Web</h1>
          <p className="text-slate-500 text-sm">Học HTML/CSS/JS trực quan.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => {
              setHtml('<h1>Trang mới</h1>');
              setCss('');
              setJs('');
            }}
            className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
          >
            Làm mới
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Editors */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
          <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="px-4 py-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest flex justify-between">
              <span>HTML</span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="flex-1 p-4 bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          </div>

          <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="px-4 py-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest flex justify-between">
              <span>CSS</span>
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="flex-1 p-4 bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          </div>

          <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="px-4 py-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest flex justify-between">
              <span>JavaScript</span>
            </div>
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              className="flex-1 p-4 bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center">
            <div className="flex space-x-1 mr-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <span>Xem trước kết quả</span>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default WebBuilderSection;
