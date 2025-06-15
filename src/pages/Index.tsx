
import { HeroSection } from "@/components/sections/HeroSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { BusinessPlansSection } from "@/components/sections/BusinessPlansSection";
import { TopicSection } from "@/components/sections/TopicSection";
import { Helmet } from 'react-helmet';
import { ContactForm } from "@/components/ContactForm";
import { useState } from "react";
import { PrivacyPolicyModal } from "@/components/modals/PrivacyPolicyModal";
import { TermsOfServiceModal } from "@/components/modals/TermsOfServiceModal";
import { BackToTopButton } from "@/components/BackToTopButton";

const Index = () => {
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PLANNINGJOY株式会社 | 神戸・兵庫の経営コンサルティング</title>
        <meta name="description" content="神戸・兵庫を拠点に、AI活用した経営コンサルティング、補助金申請サポート、創業支援から事業承継まで、あらゆる経営課題に対応します。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <HeroSection />
      <TopicSection />
      <ConsultingSection />
      <SupportAreasSection />
      <BusinessPlansSection />
      
      {/* よくあるご質問セクション - テーブル形式のUIに更新 */}
      <section id="faq" className="py-16 px-4 relative overflow-hidden">
        {/* 背景画像 */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80")`,
            filter: 'brightness(0.85)'
          }}
        />
        
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-white/75 z-[1]"></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">よくあるご質問</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">初回相談は無料ですか？</h3>
              <p className="text-gray-700">はい、初回の経営相談は無料で承っております。お客様の課題やニーズをしっかりと把握させていただき、最適なサポート方法をご提案いたします。</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">補助金申請のサポート内容は？</h3>
              <p className="text-gray-700">事業計画書の作成から申請書類の提出まで、一貫してサポートいたします。また、採択率を高めるためのアドバイスも提供しています。</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">対応エリアはどこですか？</h3>
              <p className="text-gray-700">神戸・兵庫を中心に、関西全域でサービスを提供しています。オンラインでのコンサルティングも可能ですので、遠方の方もご相談ください。</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">AI導入にはどのくらいのコストがかかりますか？</h3>
              <p className="text-gray-700">AI導入のコストは目的や規模によって異なります。汎用AIツールは有料版は月額数千円（月に20USドルが多い）から利用可能ですが、pro版など最上位モデルは月に200ドルや数百ドルのものも有ります。</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">創業前の相談はいつまでにするべきですか？</h3>
              <p className="text-gray-700">創業前の相談はなるべく早めにお勧めします。計画段階から適切なアドバイスを受けることで、スムーズな創業が可能になり、また利用できる補助金や支援制度も増えます。</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">急ぎの案件にも対応していますか？</h3>
              <p className="text-gray-700">はい、お急ぎの案件にも可能な限り迅速に対応いたします。経営危機に関わるご相談は迅速に対応させていただきますので、お早めにご連絡ください。</p>
            </div>
          </div>
        </div>
      </section>
      
      <CompanyProfileSection />
      
      {/* Contact Form Section - コンパクトなボタン形式 */}
      <section id="contact" className="py-8 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ・無料相談</h2>
          <p className="text-gray-600 mb-8">
            経営課題についてお気軽にご相談ください。初回相談は無料です。
          </p>
          <ContactForm buttonText="お問い合わせ・無料相談" />
        </div>
      </section>

      <footer className="py-6 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pb-4">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
            <div className="flex gap-8">
              <button 
                onClick={() => setPrivacyPolicyOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                プライバシーポリシー
              </button>
              <button 
                onClick={() => setTermsOfServiceOpen(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                利用規約
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicyModal 
        open={privacyPolicyOpen} 
        onOpenChange={setPrivacyPolicyOpen} 
      />
      <TermsOfServiceModal 
        open={termsOfServiceOpen} 
        onOpenChange={setTermsOfServiceOpen} 
      />

      {/* Back to top button */}
      <BackToTopButton />
    </div>
  );
};

export default Index;
