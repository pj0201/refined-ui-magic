
import { HeroSection } from "@/components/sections/HeroSection";
import { MessageSection } from "@/components/sections/MessageSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubsidyChatbot } from "@/components/SubsidyChat/SubsidyChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MessageSection />
      <SupportAreasSection />
      
      {/* Consultation Flow Section */}
      <section id="flow" className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">相談の流れ</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="grid grid-cols-2 gap-4">
              {["お問い合わせ（フォーム/電話）", "無料面談（60分・Zoom可）", "課題整理と支援プラン提示", "契約後サポート開始"].map((step, index) => (
                <div key={index} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white text-blue-900 flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Consultation process" 
                className="rounded-xl shadow-2xl object-cover h-full w-full"
              />
            </div>
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
              <CardContent className="space-y-4">
                <p>各帳票を精査させていただき、問題解決や実績向上につながる改善提案を行います。目標設定からKPIなどの予実のチェック。数値に現れない要因も探りながら、分析を重ねたうえで真因をつかみ、確度の高い効果的な戦略に落とし込みます。</p>
                <p>一例を挙げますと、計画策定のサポートでは、目的とリソース、対象に合わせた策定が重要となりますし、セールスやプロモーションにおいては、ポジションやターゲットの特定が重要となります。</p>
                <p>弊社は成功モデルに固執せず、安易な真似事のような提案を良しとしない、根拠や再現性の高いロジックを追求し、創意・工夫を重ねてクライアント様のサポートに貢献させていただきます。</p>
                <p>定期訪問や会議へのオブザーバー参加などの外にスポットでの対応（セミナーの開催など）も対応いたします。また再生など一刻を争う場合には、柔軟に対応いたします。</p>
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

      {/* Company Profile Section */}
      <CompanyProfileSection />

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

      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
      </footer>

      {/* Add Subsidy Chatbot */}
      <SubsidyChatbot />
    </div>
  );
};

export default Index;
