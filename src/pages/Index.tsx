
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
      
      {/* FAQ Section - 簡略化 */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">よくあるご質問</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 text-blue-600" size={24} />
                  支援サービスの内容を教えてほしい
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>経営改善や営業支援のケースですと、ご相談をいただいた内容を元に、方向性やご要望を確認させていただきます。その後弊社は支援内容をご提案させていただき、合意（契約締結）を経て支援に入らせていただきます。</p>
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
                  <DollarSign className="mr-2 text-blue-600" size={24} />
                  費用の目安を教えてください
                </CardTitle>
              </CardHeader>
              <CardContent>
                弊社への依頼内容によりますが、顧問契約の場合、月々25万円（税別）が目安となります。セミナーやスポットはご相談ください。
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
