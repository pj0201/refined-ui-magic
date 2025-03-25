
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { HeroSection } from '@/components/AISupportPage/HeroSection';
import { FeaturesSection } from '@/components/AISupportPage/FeaturesSection';
import { ServicesSection } from '@/components/AISupportPage/ServicesSection';
import { SeminarCasesSection } from '@/components/AISupportPage/SeminarCasesSection';
import { CTASection } from '@/components/AISupportPage/CTASection';
import { BackgroundElements } from '@/components/AISupportPage/BackgroundElements';
import { PageFooter } from '@/components/AISupportPage/PageFooter';

const AISupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 relative">
      {/* AI背景要素 */}
      <BackgroundElements />
      
      <Helmet>
        <title>AI導入支援サポート | PLANNINGJOY株式会社</title>
        <meta name="description" content="企業のAI活用をサポートします。研修や勉強会なども行います。業種業態に応じた非属人化、省力化、自動化を支援します。" />
      </Helmet>

      {/* ヘッダー */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-800 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto py-10 px-4 relative z-10">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <SeminarCasesSection />
        <CTASection />
      </main>

      <PageFooter />
    </div>
  );
};

export default AISupportPage;
