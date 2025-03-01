
import { Mail, Building } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">会社概要</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6 text-[#403E43] bg-white/80 p-8 rounded-lg backdrop-blur-sm border border-gray-200/20">
            <p className="flex items-center gap-4">
              <strong className="min-w-24">法人名：</strong>
              <span>PLANNINGJOY株式会社</span>
            </p>
            <p className="flex items-center gap-4">
              <strong className="min-w-24">代表者：</strong>
              <span>堀上 亮（経済産業省認定 経営革新等支援機関）</span>
            </p>
            <p className="flex items-center gap-4">
              <strong className="min-w-24">所在地：</strong>
              <span>〒651-0084 兵庫県神戸市中央区磯辺通1-1-18 カサベラ国際プラザビル707号室</span>
            </p>
            <div className="flex items-start gap-4">
              <strong className="min-w-24">連絡先：</strong>
              <div className="space-y-2">
                <p>TEL/FAX　078-600-0611</p>
                <p className="flex items-center gap-2">
                  <Mail size={18} className="inline-block" />
                  <span>MAIL hori@planjoy.net</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <strong className="min-w-24">業務内容：</strong>
              <div className="w-full">
                <ul className="list-none space-y-2">
                  <li>経営コンサルティング</li>
                  <li>業務改善全般（AIを活用した効率化や省力化）</li>
                  <li>資金調達サポート</li>
                  <li>キャッシュフロー改善</li>
                  <li>補助金申請サポート</li>
                  <li>各種計画策定サポート</li>
                  <li>事業承継サポート</li>
                  <li>業務ツール開発（AIを使った駆動開発）</li>
                  <li>M&Aサポート</li>
                  <li>広告代理業</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <div className="aspect-video rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="オフィスビル" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="オフィス内部" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
