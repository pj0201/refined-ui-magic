import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="relative py-20 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-700"
        style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1527576539890-dfa815648363")`,
          filter: 'blur(12px) brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#243949]/95 to-[#517fa4]/95 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">会社概要</h2>
        <div className="space-y-6 text-white bg-white/10 p-8 rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
          <p className="flex items-center gap-4 group">
            <strong className="min-w-24 transition-colors duration-300 group-hover:text-blue-300">代表者：</strong>
            <span className="transition-opacity duration-300 group-hover:opacity-90">堀上 亮（経済産業省認定 経営革新等支援機関）</span>
          </p>
          <p className="flex items-center gap-4 group">
            <strong className="min-w-24 transition-colors duration-300 group-hover:text-blue-300">所在地：</strong>
            <span className="transition-opacity duration-300 group-hover:opacity-90">〒651-0084 兵庫県神戸市中央区磯辺通1-1-18 カサベラ国際プラザビル707号室</span>
          </p>
          <div className="flex items-start gap-4 group">
            <strong className="min-w-24 transition-colors duration-300 group-hover:text-blue-300">連絡先：</strong>
            <div className="space-y-2">
              <p className="transition-opacity duration-300 group-hover:opacity-90">TEL/FAX　078-600-0611</p>
              <p className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                <Mail size={18} className="inline-block text-blue-300" />
                <span>MAIL hori@planjoy.net（代表者直通）</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};