import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.7)'
        }}
      />
      {/* Added a semi-transparent overlay to improve text visibility */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      <div className="relative z-10 text-center text-white space-y-6 fade-in px-4">
        <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <p className="text-xl text-shadow-md">
          「生産性と資産に寄与する経営コンサルティング」
        </p>
        <p className="text-2xl mb-2 text-shadow-md">
          PLANNINGJOY株式会社
        </p>
      </div>
    </section>
  );
};