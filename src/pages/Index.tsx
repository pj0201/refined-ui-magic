
import { HeroSection } from "@/components/sections/HeroSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { BusinessPlansSection } from "@/components/sections/BusinessPlansSection";
import { TopicSection } from "@/components/sections/TopicSection";
import { SubsidyChatbot } from "@/components/SubsidyChat/SubsidyChatbot";
import { Helmet } from 'react-helmet';
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PLANNINGJOY株式会社 | 神戸・兵庫の経営コンサルティング</title>
        <meta name="description" content="神戸・兵庫を拠点に、AI活用した経営コンサルティング、補助金申請サポート、創業支援から事業承継まで、あらゆる経営課題に対応します。" />
      </Helmet>
      
      <HeroSection />
      <TopicSection />
      <ConsultingSection />
      <SupportAreasSection />
      <BusinessPlansSection />
      <CompanyProfileSection />
      
      {/* Contact Form Section - More compact version */}
      <section id="contact" className="py-8 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">お問い合わせ</h2>
          <div className="bg-white rounded-xl shadow-md p-4">
            <ContactForm 
              subject="ホームページからのお問い合わせ"
              buttonColor="text-blue-600"
              borderColor="border-blue-600"
              hoverColor="hover:bg-blue-50"
            />
          </div>
        </div>
      </section>

      <footer className="py-4 px-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
      </footer>

      <SubsidyChatbot />
    </div>
  );
};

export default Index;
