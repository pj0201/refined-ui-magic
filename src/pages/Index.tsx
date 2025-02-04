import { HeroSection } from "@/components/sections/HeroSection";
import { MessageSection } from "@/components/sections/MessageSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MessageSection />
      <CompanyProfileSection />
      <SupportAreasSection />
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4" style={{ background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)' }}>
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">特徴</h2>
          <p className="text-center text-xl mb-8">「公的支援の専門家として」</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li>経産省認定機関のネットワーク活用</li>
                <li>行政要件を熟知した計画策定</li>
                <li>継続的な改善サイクルの構築</li>
                <li>多様な経営課題への横断的対応</li>
              </ul>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Professional workspace" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section id="service-details" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">サービス詳細</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">経営計画策定支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>経営改善計画（405事業）</li>
                  <li>早期経営改善計画（ポストコロナ対応）</li>
                  <li>事業再生計画 他</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">資金調達支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>補助金/助成金申請代行</li>
                  <li>金融機関向け事業計画書作成</li>
                  <li>財務状況分析</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">事業継承支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>3年・5年・10年単位の段階的プラン作成</li>
                  <li>税務・法務専門家との連携体制</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">業務改善支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>AI活用業務フロー改善（効率化や自動化）</li>
                  <li>営業管理システム構築</li>
                  <li>WEB活用戦略立案</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation Flow Section */}
      <section id="flow" className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">相談の流れ</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {["お問い合わせ（フォーム/電話）", "無料面談（60分・Zoom可）", "課題整理と支援プラン提示", "契約後サポート開始"].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-white text-blue-900 flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">よくあるご質問</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>どういう支援サービスですか？</CardTitle>
              </CardHeader>
              <CardContent>
                定期訪問やオブザーバー参加など以外にスポットでの対応も可能。再生など一刻を争う場合には、柔軟に対応いたします。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>創業前でも相談可能ですか？</CardTitle>
              </CardHeader>
              <CardContent>
                事業構想段階からのご相談を推奨しています。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>地方企業でも対応可能？</CardTitle>
              </CardHeader>
              <CardContent>
                オンライン相談で全国対応いたします（北海道・関東一円・関西・中国・九州地域に在住し支援した実績あり）。
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4" style={{ background: 'linear-gradient(to right, #243949 0%, #517fa4 100%)' }}>
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold mb-8 text-white">お問い合わせ</h2>
          <p className="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。</p>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-gray-900"
            onClick={() => window.location.href = 'mailto:hori@planjoy.net'}
          >
            メールでのお問い合わせ
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
      </footer>
    </div>
  );
};

export default Index;
