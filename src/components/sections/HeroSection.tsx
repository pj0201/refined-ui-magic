import { Button } from "@/components/ui/button";
import { useState } from "react";

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1527576539890-dfa815648363", // グレースケールのビルを下から見上げた写真
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625", // モダンな白いビル
    "https://images.unsplash.com/photo-1496307653780-42ee777d4833"  // ガラス張りのビルを下から見上げた写真
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{ 
          backgroundImage: `url("${images[currentImageIndex]}")`,
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
      <Button 
        variant="ghost" 
        className="absolute bottom-4 right-4 z-20 text-white hover:bg-white/20"
        onClick={handleNextImage}
      >
        次の画像を表示
      </Button>
    </section>
  );
};