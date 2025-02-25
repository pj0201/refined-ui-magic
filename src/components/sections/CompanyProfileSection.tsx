
import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">会社概要</h2>
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
            <div className="flex flex-col md:grid md:grid-cols-2 gap-x-8 gap-y-2 w-full">
              <p className="text-left">経営コンサルティング</p>
              <p className="text-left">業務改善全般（AIを活用した効率化や省力化）</p>
              <p className="text-left">資金調達サポート</p>
              <p className="text-left">キャッシュフロー改善</p>
              <p className="text-left">補助金申請サポート</p>
              <p className="text-left">各種計画策定サポート</p>
              <p className="text-left">事業承継サポート</p>
              <p className="text-left">業務ツール開発（AIを使った駆動開発）</p>
              <p className="text-left">M&Aサポート</p>
              <p className="text-left">広告代理業</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
