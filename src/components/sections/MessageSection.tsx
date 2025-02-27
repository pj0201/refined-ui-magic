
import { FC } from 'react';
import { Card } from "@/components/ui/card";

export const MessageSection: FC = () => {
  return (
    <section id="message" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">AIに強い経営コンサルティング</h2>
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-[#aaadb0]/20" style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-[#403E43] leading-relaxed">
              <p>
                AI技術の急速な進化により、ビジネス環境は劇的に変化しています。ChatGPTやその他の生成AIの登場により、業務効率化や新規ビジネスの可能性が大きく広がっています。
              </p>
              <p>
                しかし、AIツールを効果的に活用するためには、業務プロセスの見直しや、適切な活用戦略の策定が不可欠です。
              </p>
              <p>
                弊社は、経営コンサルティングの知見とAI技術への深い理解を組み合わせ、クライアント企業のデジタルトランスフォーメーションを支援します。AI導入による業務効率化から、AIを活用した新規事業開発まで、包括的なサポートを提供いたします。
              </p>
              <p>
                企業の持続的な成長のために、最新のAI技術と従来の経営ノウハウを融合させた、実践的なソリューションを提供してまいります。
              </p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                alt="Modern office interior" 
                className="rounded-xl shadow-2xl object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MessageSection;
