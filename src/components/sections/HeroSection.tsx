import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.7)'
        }}
      />
      <div className="relative z-10 text-center text-white space-y-6 fade-in">
        <h1 className="text-5xl font-bold mb-4">
          創業から承継まで<br />
          経営の羅針盤
        </h1>
        <p className="text-2xl mb-2">
          PLANNINGJOY株式会社<br />
          経済産業省認定 経営革新等支援機関
        </p>
        <p className="text-xl">
          「生産性と資産に寄与する経営コンサルティング」
        </p>
        <Button 
          variant="outline" 
          className="mt-8 text-white border-white hover:bg-white hover:text-gray-900"
          onClick={() => document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })}
        >
          メッセージを見る
        </Button>
      </div>
    </section>
  );
};