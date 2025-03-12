
import { HeroSection } from "@/components/sections/HeroSection";
import { ConsultingSection } from "@/components/sections/ConsultingSection";
import { CompanyProfileSection } from "@/components/sections/CompanyProfileSection";
import { SupportAreasSection } from "@/components/sections/SupportAreasSection";
import { BusinessPlansSection } from "@/components/sections/BusinessPlansSection";
import { SubsidyChatbot } from "@/components/SubsidyChat/SubsidyChatbot";
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PLANNINGJOY株式会社 | 神戸・兵庫の経営コンサルティング</title>
        <meta name="description" content="神戸・兵庫を拠点に、AI活用した経営コンサルティング、補助金申請サポート、創業支援から事業承継まで、あらゆる経営課題に対応します。" />
      </Helmet>
      
      <HeroSection />
      <ConsultingSection />
      <SupportAreasSection />
      <BusinessPlansSection />
      <CompanyProfileSection />

      <footer className="py-6 px-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
      </footer>

      {/* 軽量化したチャットボット */}
      <SubsidyChatbot />
    </div>
  );
};

export default Index;
