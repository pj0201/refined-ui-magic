import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const imageUrl = "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=2000&q=80&brightness=150";

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{ 
          backgroundImage: `url("${imageUrl}")`,
          filter: 'brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-[1]"></div>
      <div className="relative z-10 text-center text-white space-y-12 px-4 -mt-20">
        <h1 className="text-6xl font-bold tracking-tight">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <div className="space-y-6">
          <p className="text-4xl font-medium tracking-wide fade-in backdrop-blur-sm bg-white/10 py-3 px-6 rounded-lg inline-block">
            PLANNINGJOY株式会社
          </p>
          <p className="text-xl font-medium tracking-wide fade-in delay-100 backdrop-blur-sm bg-white/10 py-2 px-4 rounded-lg inline-block">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
        </div>
      </div>
    </section>
  );
};