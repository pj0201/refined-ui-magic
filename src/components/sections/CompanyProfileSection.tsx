import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(to right, #243949 0%, #517fa4 100%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">会社概要</h2>
        <div className="space-y-6 text-white bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20">
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
        </div>
      </div>
    </section>
  );
};