import { HeroSection } from "@/components/sections/HeroSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { BusinessPlansSection } from "@/components/sections/BusinessPlansSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubsidyChatbot } from "@/components/SubsidyChat/SubsidyChatbot";
import { TopicSection } from "@/components/sections/TopicSection";
import { HelpCircle, Box, Sprout, MapPin, DollarSign } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PLANNINGJOY株式会社 | 神戸・兵庫の経営コンサルティング</title>
        <meta name="description" content="神戸・兵庫を拠点に、AI活用した経営コンサルティング、補助金申請サポート、創業支援から事業承継まで、あらゆる経営課題に対応します。" />
        <meta name="keywords" content="経営コンサルティング,AI,神戸,兵庫,補助金,融資,創業,事業承継" />
      </Helmet>
      
      <HeroSection />
      <TopicSection />
      <ConsultingSection />
      <SupportAreasSection />
      <BusinessPlansSection />
      
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
                alt="神戸・兵庫での経営コンサルティング相談プロセス" 
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
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 text-blue-600" size={24} />
                  どういう支援サービスですか？
                </CardTitle>
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
                <CardTitle className="flex items-center">
                  <Box className="mr-2 text-blue-600" size={24} />
                  業務ツール開発はどんなものが作れますか？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>業務の自動化や省力化に関するものや、分析ツールや管理システム、マニュアルなどのボット化など、ヒヤリングを経て、案件定義・要件定義をさせていただきます。</p>
                <p>工数や納期短縮のために、AIを活用した駆動開発がメインとなります。</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sprout className="mr-2 text-blue-600" size={24} />
                  創業前でも相談可能ですか？
                </CardTitle>
              </CardHeader>
              <CardContent>
                事業構想段階からのご相談を推奨しています。創業後に活用できる制度や融資のポイントなどを知って、「早く相談すれば良かった」という声も多く伺います。ぜひ無料相談をご活用ください。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 text-blue-600" size={24} />
                  地方企業でも対応可能？
                </CardTitle>
              </CardHeader>
              <CardContent>
                ご訪問以外にオンライン相談を取り入れて全国対応いたします。（北海道・関東一円・関西・中国・九州地域にて支援した実績あり）神戸・兵庫を拠点としていますが、地方企業の支援も積極的に行っています。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 text-blue-600" size={24} />
                  費用の目安を教えてください
                </CardTitle>
              </CardHeader>
              <CardContent>
                弊社への依頼内容によりますが、顧問契約の場合、月々25万円（税別）が目安となります。セミナーやスポットはご相談下さい。
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
          <p className="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。経営に関するあらゆるご相談に対応いたします。</p>
          <ContactForm 
            subject="ウェブサイトからのお問い合わせ"
            buttonColor="text-white"
            borderColor="border-white"
            hoverColor="hover:bg-white/10"
          />
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
