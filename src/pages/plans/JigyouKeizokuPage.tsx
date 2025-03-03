
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const JigyouKeizokuPage = () => {
  return (
    <PlanLayout 
      title="事業継続力強化計画" 
      imageUrl="https://images.unsplash.com/photo-1501854140801-50d01698950b"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        中小企業庁が認定する制度で、自然災害などに対する事前対策を中心とした計画です。防災・減災のための取組みを明確にし、企業のレジリエンス強化を図ります。
      </p>
      <p className="mb-8">
        計画の策定・申請は比較的簡易な手続きで行え、中小企業でも取り組みやすいように設計されています。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <Award className="text-orange-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">認定を受けるとロゴマーク使用可能</h3>
              <p>「事業継続力強化計画」の認定を受けた企業は、専用のロゴマークを使用することができ、社外へ安心感を示す材料となります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-orange-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助金等の加点措置</h3>
              <p>防災・減災の取組みを行う企業として評価され、各種補助金申請で加点対象になることがあります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-orange-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">防災設備投資に対する支援</h3>
              <p>具体的な設備導入や対策実施を行う場合、補助・助成を活用できる可能性が高まります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">作成のポイント</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>自社が直面するリスクの分析と優先順位付け</li>
        <li>災害時の初動対応と事業継続のための具体策</li>
        <li>従業員の安全確保と連絡体制の整備</li>
        <li>サプライチェーン維持のための対策</li>
        <li>データバックアップや非常用電源の確保</li>
        <li>防災訓練や従業員教育の計画</li>
      </ul>

      <div className="bg-orange-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/antei/bousai/keizokuryoku.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              中小企業庁：事業継続力強化計画認定制度について
            </a>
          </li>
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/antei/bousai/download/jigyoukeizokuryoku_shinseisyo.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              事業継続力強化計画申請書フォーマット
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          事業継続力強化計画の策定についてサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが計画策定から申請までトータルでサポートいたします。
        </p>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => window.location.href = 'mailto:hori@planjoy.net?subject=事業継続力強化計画について相談したい'}
        >
          メールでのお問い合わせ
        </Button>
      </div>
    </PlanLayout>
  );
};

export default JigyouKeizokuPage;
