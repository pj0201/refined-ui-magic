
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">AI導入の第一歩を踏み出しませんか？</h2>
      <p className="text-xl mb-8">
        まずは無料相談から。御社の課題に合わせたAI活用方法をご提案します。
      </p>
      <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
        お問い合わせはこちら
      </Button>
    </section>
  );
};
