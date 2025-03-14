
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const OverviewSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        経営者保証に関するガイドラインは、中小企業・小規模事業者等の経営者の個人保証について、適切な保証契約の在り方等を示すとともに、
        経営者保証の弊害を解消することを目的として策定された自主的なルールです。
      </p>
      <p className="mb-8">
        このガイドラインを活用することで、「法人と経営者の関係の明確な区分・分離」や「財務基盤の強化」等の経営改善を図ることで、
        「経営者保証に依存しない融資」の実現を目指すことができます。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">個人保証なしの融資が可能に</h3>
              <p>経営と所有の分離、財務管理の適正化などが実現できれば、個人保証に依存しない融資を受けることができるようになります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">保証債務の整理が円滑に</h3>
              <p>万が一事業が行き詰まった場合でも、このガイドラインに沿って誠実に対応していれば、保証債務の整理を進めやすくなり、経営者の再チャレンジが可能になります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">事業承継・M&Aが促進される</h3>
              <p>個人保証の問題が解消されれば、事業承継やM&Aの際の障壁が低くなり、円滑な事業の引継ぎが可能になります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">ガイドラインに則った対応のポイント</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>法人と経営者個人の資産・経理の明確な分離</li>
        <li>法人のみの資産・収益力で借入返済が可能な財務基盤の構築</li>
        <li>適時適切な情報開示等による経営の透明性確保</li>
        <li>資金調達手段の多様化（ABL等の活用）</li>
        <li>計画的な借入金の返済や財務内容の改善努力</li>
      </ul>
    </>
  );
};
