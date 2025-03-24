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
      <CompanyProfileSection />
      
      {/* Contact Form Section - More compact version */}
      <section id="contact" className="py-4 xs:py-6 px-3 xs:px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl xs:text-3xl font-bold text-center mb-2 xs:mb-3">お問い合わせ</h2>
          <div className="bg-white rounded-xl shadow-md p-2 xs:p-3">
            <ContactForm 
              subject="ホームページからのお問い合わせ"
              buttonColor="text-blue-600"
              borderColor="border-blue-600"
              hoverColor="hover:bg-blue-50"
            />
          </div>
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
