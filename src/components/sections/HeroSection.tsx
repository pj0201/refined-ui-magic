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
      <div className="relative z-10 text-center text-white space-y-6 fade-in px-4 -mt-20">
        <h1 className="text-6xl font-bold tracking-tight">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <div className="space-y-4 bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-blue-900/80 py-6 px-8 rounded-lg backdrop-blur-sm border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <p className="text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
            PLANNINGJOY株式会社
          </p>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent my-4"></div>
          <p className="text-xl text-blue-50 font-medium">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
        </div>
      </div>
    </section>
  );
};