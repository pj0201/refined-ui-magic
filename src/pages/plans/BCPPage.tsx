import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const BCPPage = () => {
  return (
    <PlanLayout 
      title="BCP（事業継続計画）" 
      subtitle="Business Continuity Plan" 
      imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        自然災害や感染症、事故などの危機発生時に、事業をどのように継続・復旧するかを事前に定めた計画のことです。
      </p>
      <p className="mb-8">
        生産拠点が被災した場合の代替方法や、従業員が出社できない場合の対応策などを具体的にシミュレーションして策定します。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-red-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">リスク軽減と事業の継続性確保</h3>
              <p>事前対策を講じることで、万が一の際にダメージを最小限に抑え、事業の継続・早期復旧が可能になります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-red-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">取引先や金融機関からの信頼獲得</h3>
              <p>BCPを策定している企業はリスク管理がしっかりしていると判断され、取引拡大や融資面で有利になる場合があります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-red-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助金や保険料の優遇</h3>
              <p>業種によっては、事業継続力を高める取り組みが評価され、保険料の割引や補助金申請時の加点など、優遇が受けられる場合があります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">BCP策定のポイント</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>自社に関わるリスクの特定と分析</li>
        <li>重要業務と目標復旧時間の設定</li>
        <li>緊急時の指揮命令系統の明確化</li>
        <li>従業員の安否確認方法</li>
        <li>代替拠点やバックアップシステムの準備</li>
        <li>重要なデータや書類の保護対策</li>
        <li>サプライチェーンの脆弱性分析</li>
      </ul>

      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/bcp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              中小企業庁：中小企業BCP策定運用指針
            </a>
          </li>
          <li>
            <a 
              href="https://www.bousai.go.jp/kyoiku/kigyou/keizoku/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              内閣府防災情報：事業継続ガイドライン
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          BCP策定について専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが貴社の事業特性やリスク分析から具体的な計画策定までサポートいたします。
        </p>
        <ContactForm 
          buttonText="ご相談・お問い合わせ"
          className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-600"
        />
      </div>
    </PlanLayout>
  );
};

export default BCPPage;
