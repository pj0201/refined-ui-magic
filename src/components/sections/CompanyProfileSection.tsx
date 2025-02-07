import { Mail } from "lucide-react";
import { useWordPressData } from "@/hooks/useWordPressData";

export const CompanyProfileSection = () => {
  const { companyData } = useWordPressData();

  return (
    <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">会社概要</h2>
        <div 
          className="space-y-6 text-[#403E43] bg-white/80 p-8 rounded-lg backdrop-blur-sm border border-gray-200/20"
          dangerouslySetInnerHTML={{ __html: companyData?.content?.rendered || "" }}
        />
      </div>
    </section>
  );
};