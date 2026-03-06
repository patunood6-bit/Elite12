
import React from 'react';
import { motion } from 'motion/react';

const AboutSection: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(79,70,229,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative group p-8 bg-slate-900 rounded-[3rem] border-4 border-indigo-400 shadow-2xl">
            <div className="relative bg-white rounded-[2.5rem] overflow-hidden p-8 shadow-inner">
              <img 
                src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d__4D_MUCXBOumxjWS4Pyrbgb0Uto0yI7uR7h3ZAyBHcNXRBcVpuyZ_-tWu8HcOAtn7jn2UDv3MWjmR9U8-Fdk_PetDsHl2PcyURyMzkIaAg9_WX_z1f-nd16LNuGjTZywPyCOgXvyh5IZeJn-fuHepIj8lMXpRWfJysW7A7s_iSxepBnYWfTz2mxC2Ef2lDDj8nDbcPNzKU27Cw286Pwd5xmw0V_k8Qaw_VrvOP0AwHJlZuTCEtQIEb_-Y44gPB8uczC5KDVZbpBcpsFtlj0SuD0F0oDwfJE32jMHi8sM5ZcVegIBsFfeZMbTUnDlIuCEpnW-3sq5Oh3uGsi-mtpjJDwRklWx8ANUoLKqM0Ym3q7bummPh0dvX0yJzGwQl6NrxqxW8sFUoUZMtFYhNHv0b_9e6LHqj0sWdMzkHXHp9rgvQiunREFTWQ_Qa05rqfts-Tc0Te3oHFDvXQylGT4mgwK7LPCj2jkW3CKxatcAtPLcEgGc6j5gAssgmEWuwJfbKKMOVq8RLnRJW36My165FPDHj2Xp-HkVlWRLBvM89U1EBe4PgkryeV8IyMnFfGpN6erJblXM-vbL_Xph0GoJE3yk-aFv_U2i6MzTGiwMJU1aptpEqGi-ASupjQP0xwLyFENNWvZAzKtYas60ein449-Rlup_JWTCng2p2WV2R1ntUi7qFciWv6qc70gDFxBlVt6m3cCOxT3iWYK0gEKwbaBpP_r2n-mXD9PkIOS1fmCuzKaauArRh5WAB8YvLpRzLJ0vCe9p__wrmNMmQRaRZWKfZ4gr_AugI3uyONeoG9sjK4v4n3hjr1jUxmQSegxl__7GxFoErVH16jfOra0fSBeeCgnSgWIaACVdtPlPiu1kUBHi6e_TcZtFxa3i2kYn41EKD0vymeiXetE_narzJwADf4GQD31sj6DLPCDH3VKkY5mXxRydWOnHWXYUObeCoZ4n5ex9mdLQ2k5uAtQYSX83Z3JKHNwUlIWM8ZU9tuc8Ruz2mhjhvXoR31hxQXXdS97_zOeZNVJvOJEQXbFN_ekGGbVGh0dAIQ4lF576HWPuDhTjq6qOrmHL0hQVDgbfHcTsjy0OwiGXchUKyy3y2lpYoPyKgL4dhAQ_6lzHBZpGP98bnAJTYRa6oytKQQ-rrAuSsJKSNKL_D3_8lJpiYaf0C0lb89kcKOJy2Fc4X1KAaMeKMJRLx-aPoUynefGgkt1JkXi5nhcmiCQOuAZ8P4a7beCnP8ZDASs5xAuUVOkRkmq98zkmNgHZ6sY39UChQJu3-2D5EsVvJlI3PrGG7DxxOI1iQ=s1024-rj" 
                alt="Elite12 Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm border border-slate-200 whitespace-nowrap">
                KẾT NỐI TRI THỨC | CHINH PHỤC TƯƠNG LAI
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Founder & Lead Developer
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
              Về <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Elite12</span>.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              Elite12 là nền tảng học tập AI tiên phong, được sáng lập bởi <span className="text-white font-bold">Tuấn Tú</span>. 
              Chúng mình không chỉ tạo ra một ứng dụng, mà là một người bạn đồng hành thông minh giúp các sĩ tử chinh phục kỳ thi THPT Quốc gia 2026 một cách nhẹ nhàng và hiệu quả nhất.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#" className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all shadow-lg">
                Kết nối với mình
              </a>
              <div className="flex items-center space-x-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Follow me:</span>
                <div className="flex space-x-3">
                  {['FB', 'IG', 'GH'].map(social => (
                    <button key={social} className="text-white hover:text-indigo-400 transition-colors font-black text-sm">{social}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats/Values */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Tầm nhìn 2026</h3>
            <p className="text-slate-500 leading-relaxed">Xây dựng hệ sinh thái học tập AI cá nhân hóa lớn nhất Việt Nam, giúp mọi học sinh tiếp cận kiến thức tinh hoa một cách dễ dàng nhất.</p>
          </div>
        </div>

        <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-xl text-white flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-all">
          <div className="text-5xl font-black mb-2">100%</div>
          <div className="text-indigo-100 font-bold uppercase tracking-widest text-[10px]">Tâm huyết</div>
          <p className="mt-4 text-sm text-indigo-100/80">Mỗi dòng code đều được viết với mong muốn mang lại giá trị thực cho người học.</p>
        </div>

        <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-between group">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold">+5k</div>
          </div>
          <div className="mt-6">
            <h4 className="font-black text-lg">Cộng đồng Elite</h4>
            <p className="text-slate-400 text-xs mt-1">Đang cùng nhau nỗ lực mỗi ngày.</p>
          </div>
        </div>

        <div className="md:col-span-3 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl transition-all">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-black text-slate-800">Triết lý Elite12</h3>
            <blockquote className="text-xl italic text-slate-600 border-l-4 border-indigo-500 pl-6">
              "Công nghệ chỉ là công cụ. Người sử dụng nó với mục đích đúng đắn mới là người tạo ra phép màu."
            </blockquote>
          </div>
          <div className="w-full md:w-48 h-32 bg-slate-100 rounded-3xl overflow-hidden">
             <img src="https://picsum.photos/seed/tech/300/200" alt="tech" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all" />
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center items-center text-center">
           <div className="text-3xl mb-2">☕️</div>
           <div className="font-black">Code & Coffee</div>
           <p className="text-white/70 text-xs mt-2">Nhiên liệu chính tạo nên Elite12</p>
        </div>

        <div className="md:col-span-4 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm mr-3">🛠️</span>
            Tech Stack của Elite12
          </h3>
          <div className="flex flex-wrap gap-3">
            {['React 19', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Vite', 'Framer Motion', 'Node.js', 'Express'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact/Footer */}
      <div className="text-center py-12">
        <p className="text-slate-400 font-medium">Bạn có ý tưởng hay muốn hợp tác?</p>
        <button className="mt-4 text-indigo-600 font-black text-xl hover:underline underline-offset-8">
          p.atunood6@gmail.com
        </button>
      </div>
    </motion.div>
  );
};

export default AboutSection;
