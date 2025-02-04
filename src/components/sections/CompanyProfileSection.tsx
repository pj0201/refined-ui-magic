import { Mail } from "lucide-react";

export const CompanyProfileSection = () => {
  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(to right, #243949 0%, #517fa4 100%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">会社概要</h2>
        <div className="space-y-4 text-white">
          <p><strong>代表者：</strong>堀上 亮（経済産業省認定 経営革新等支援機関）</p>
          <p><strong>所在地：</strong>〒651-0084 兵庫県神戸市中央区磯辺通1-1-18 カサベラ国際プラザビル707号室</p>
          <p className="space-y-2">
            <span className="block"><strong>連絡先：</strong>TEL/FAX　078-600-0611</span>
            <span className="flex items-center gap-2">
              <Mail size={18} className="inline-block" />
              <span>MAIL hori@planjoy.net（代表者直通）</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};