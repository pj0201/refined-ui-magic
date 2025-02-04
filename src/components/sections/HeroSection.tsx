import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const imageUrl = "https://images.unsplash.com/photo-1439337153520-7082a56a81f4";

  const scrollToMessage = () => {
    document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{ 
          backgroundImage: `url("${imageUrl}")`,
          filter: 'brightness(0.7) contrast(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent z-[1] backdrop-blur-[2px]"></div>
      <div className="relative z-10 text-center text-white space-y-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg tracking-tight leading-tight">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <div className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-xl">
          <p className="text-2xl md:text-3xl text-shadow-md font-medium">
            PLANNINGJOY株式会社
          </p>
          <p className="text-xl md:text-2xl text-shadow-md text-gray-200 max-w-2xl mx-auto">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
        </div>
        <button 
          onClick={scrollToMessage}
          className="animate-bounce mt-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
      </div>
    </section>
  );
};