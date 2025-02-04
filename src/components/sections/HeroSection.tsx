import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.5)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-[1]"></div>
      <div className="relative z-10 text-center text-white space-y-8 fade-in px-4">
        <h1 className="text-6xl font-bold mb-4 text-shadow-lg tracking-tight">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <div className="space-y-4">
          <p className="text-2xl text-shadow-md font-medium">
            PLANNINGJOY株式会社
          </p>
          <p className="text-xl text-shadow-md text-gray-200">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
        </div>
      </div>
    </section>
  );
};