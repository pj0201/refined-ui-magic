import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8E9196]">会社概要</h2>
        <div className="space-y-6 text-[#8E9196] bg-white/80 p-8 rounded-lg backdrop-blur-sm border border-gray-200/20">
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
                <span>MAIL hori@planjoy.net（代表者直通）</span>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <strong className="min-w-24">業務内容：</strong>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2" style={{ gridAutoFlow: 'column' }}>
              <span>経営コンサルティング</span>
              <span>資金調達サポート</span>
              <span>業務改善全般</span>
              <span>補助金申請サポート</span>
              <span>キャッシュフロー改善</span>
              <span>事業承継サポート</span>
              <span>各種計画策定サポート</span>
              <span>業務ツール開発（AIを使った駆動開発）</span>
              <span>定期訪問・オブザーバー</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};