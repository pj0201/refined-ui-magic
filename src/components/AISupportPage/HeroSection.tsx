
import { Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="text-center mb-16">
      <div className="inline-block p-2 bg-purple-100 rounded-full text-purple-700 mb-4">
        <Sparkles className="h-6 w-6" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        AI導入支援サポート
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
        AI活用で業務を変革。<br />
        貴社の課題に合わせた最適なAIソリューションを提案します。
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-8">
        <p className="text-gray-700 text-lg">経済産業省DX調査によると<span className="font-bold text-purple-700">2026年までに70%以上の企業</span>がAIを業務に導入予定</p>
      </div>
    </section>
  );
};
