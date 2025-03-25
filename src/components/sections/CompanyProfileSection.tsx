
import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  // Changed to a brighter cityscape image
  const backgroundImageUrl = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2000&q=80";
  
  return (
    <section id="about-us" className="py-20 px-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url("${backgroundImageUrl}")`,
          // Increased brightness to make it lighter
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Changed from dark gradient to a lighter gray gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400/40 via-gray-300/30 to-gray-400/40 z-[1]"></div>
      
      <div className="max-w-4xl mx-auto fade-in relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">会社概要</h2>
        
        <div className="relative">
          <div className="absolute -top-3 left-0 right-0 h-3 w-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"></div>
          </div>
          
          <div className="absolute top-0 -left-3 bottom-0 w-3 overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-blue-100 via-blue-200 to-blue-100"></div>
          </div>
          
          <div className="bg-white/90 rounded-lg shadow-lg border-2 border-gray-200 p-6 relative">
            <div className="text-[#403E43] space-y-6">
              <p className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4">
                <strong className="min-w-24">法人名：</strong>
                <span className="font-bold">
                  <span className="inline-block">PLANNING</span>
                  <span className="font-bold inline-block"><span className="text-red-500">J</span>OY</span>
                  <span className="inline-block">株式会社</span>
                </span>
              </p>
              <p className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4">
                <strong className="min-w-24">代表者：</strong>
                <span className="font-bold">堀上 亮（経済産業省認定 経営革新等支援機関）</span>
              </p>
              <p className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4">
                <strong className="min-w-24">所在地：</strong>
                <span className="inline-block font-bold">〒651-0084 兵庫県神戸市中央区磯辺通1-1-18</span>
                <br className="xs:inline sm:hidden" />
                <span className="inline-block ml-0 xs:ml-24 sm:ml-0 font-bold">カサベラ国際プラザビル707号室</span>
              </p>
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4">
                <strong className="min-w-24">連絡先：</strong>
                <div className="space-y-2">
                  <p>
                    <span className="inline-block">TEL/FAX</span>
                    <br className="xs:inline sm:hidden" />
                    <span className="inline-block font-bold">078-600-0611</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={18} className="inline-block" />
                    <span className="font-bold">MAIL hori@planjoy.net</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row items-start gap-2 xs:gap-4">
                <strong className="min-w-24 pt-1">業務内容：</strong>
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="col-span-1">
                      <ul className="list-none space-y-2 font-semibold">
                        <li>経営コンサルティング</li>
                        <li>業務改善全般（AIを活用した効率化や省力化）</li>
                        <li>資金調達サポート</li>
                        <li>キャッシュフロー改善</li>
                        <li>補助金申請サポート</li>
                      </ul>
                    </div>
                    <div className="col-span-1">
                      <ul className="list-none space-y-2 font-semibold">
                        <li>各種計画策定サポート</li>
                        <li>事業承継サポート</li>
                        <li>業務ツール開発（AIを使った駆動開発）</li>
                        <li>M&Aサポート</li>
                        <li>広告代理業</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 -right-3 bottom-0 w-3 overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-blue-100 via-blue-200 to-blue-100"></div>
          </div>
          
          <div className="absolute -bottom-3 left-0 right-0 h-3 w-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
