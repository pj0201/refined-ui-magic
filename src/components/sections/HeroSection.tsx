import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const imageUrl = "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=2000&q=80&brightness=150";
  const isMobile = useIsMobile();

  return (
    <section className="relative xs:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{ 
          backgroundImage: `url("${imageUrl}")`,
          filter: 'brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-[1]"></div>
      <div className="relative z-10 text-center text-white space-y-6 md:space-y-8 lg:space-y-12 px-4 -mt-10 md:-mt-16 lg:-mt-20">
        <h1 className="xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="inline-block">創業から承継まで</span>
          <br className="xs:inline sm:hidden" />
          <span className="inline-block">経営の羅針盤</span>
        </h1>
        <div className="space-y-4 md:space-y-6 flex flex-col items-center">
          <p className="xs:text-base sm:text-lg lg:text-xl font-medium tracking-wide fade-in backdrop-blur-sm bg-white/10 py-2 px-3 md:px-4 rounded-lg whitespace-nowrap">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
          <div className="xs:text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide fade-in delay-100 backdrop-blur-sm bg-white/10 py-2 px-4 md:py-3 md:px-6 rounded-lg">
            <span className="inline-block text-white">PLANNING</span>
            <span className="text-red-500 font-extrabold inline-block xs:text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 900 }}>J</span>
            <span className="inline-block text-white">OY</span>
            <span className="block sm:inline-block text-white">株式会社</span>
          </div>
        </div>
      </div>
    </section>
  );
};
