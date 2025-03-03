
import { PlanLayout } from "@/components/plans/PlanLayout";
import { FileCheck, Award, CreditCard, Building2, Bookmark } from "lucide-react";

const KeieiKakushinPage = () => {
  return (
    <PlanLayout 
      title="経営革新計画" 
      subtitle="中小企業等経営強化法に基づく計画策定支援"
      imageUrl="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">概要</h2>
          <p>「経営革新計画」は中小企業等経営強化法に基づく計画で、「新商品の開発」や「新サービスの提供」など新たな取り組みによって経営の向上を図る中小企業を支援するための制度です。都道府県知事または国（地方経済産業局長）の承認を受けることで、様々な支援策を活用できます。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Building2 className="text-yellow-600 mr-2" />
                <h3 className="font-bold">政府系金融機関による低利融資</h3>
              </div>
              <p>日本政策金融公庫の「新事業活動促進資金」などが利用可能になります。</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CreditCard className="text-yellow-600 mr-2" />
                <h3 className="font-bold">信用保証の特例</h3>
              </div>
              <p>信用保証協会の保証限度額の別枠化などの特例が受けられます。</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Award className="text-yellow-600 mr-2" />
                <h3 className="font-bold">補助金申請時の加点</h3>
              </div>
              <p>各種補助金申請において審査時に加点されるケースがあります。</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Bookmark className="text-yellow-600 mr-2" />
                <h3 className="font-bold">販路開拓支援</h3>
              </div>
              <p>認定企業として販路開拓やビジネスマッチングの機会が増えます。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">申請に必要な書類</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>経営革新計画に係る承認申請書</li>
            <li>経営革新計画の内容を記載した書類（別表1）</li>
            <li>経営革新計画の実施計画（別表2）</li>
            <li>直近2期分の決算書（貸借対照表、損益計算書等）</li>
            <li>会社案内やパンフレットなど（ある場合）</li>
            <li>定款</li>
            <li>商業登記簿謄本</li>
            <li>その他必要書類（都道府県や地方経済産業局により異なる場合があります）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">申請から承認までの流れ</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-bold">事前相談</span>：計画の内容について各都道府県の担当課や商工会議所等に相談</li>
              <li><span className="font-bold">申請書作成</span>：「経営革新計画」の内容を整理して申請書を作成</li>
              <li><span className="font-bold">申請書提出</span>：都道府県または国の窓口に申請書を提出</li>
              <li><span className="font-bold">審査</span>：提出書類に基づく審査が行われる</li>
              <li><span className="font-bold">プレゼンテーション</span>：場合によっては審査会でのプレゼンが必要</li>
              <li><span className="font-bold">承認</span>：審査を通過すると「経営革新計画」として承認</li>
              <li><span className="font-bold">計画の実行と報告</span>：計画に基づいた事業を実施し、定期的に報告</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">経営革新計画策定のポイント</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <FileCheck className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">明確な目標設定</span>：「付加価値額」と「経常利益」の伸び率について、数値目標を具体的に設定することが必要です。</p>
            </div>
            <div className="flex items-start">
              <FileCheck className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">独自性の明確化</span>：「新しさ」をアピールすることが重要で、自社にとっての新規性と市場における差別化ポイントを明確にします。</p>
            </div>
            <div className="flex items-start">
              <FileCheck className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">実現可能性の証明</span>：計画の実現性を裏付けるための市場分析や経営資源の評価が必要です。</p>
            </div>
            <div className="flex items-start">
              <FileCheck className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">具体的な資金計画</span>：計画実行に必要な資金調達方法や収支見通しを具体的に示すことが大切です。</p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">当社のサポート</h2>
          <p className="mb-4">当社では、経営革新計画策定から申請、事後フォローまでトータルにサポートいたします。具体的には：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>経営革新性の明確化と数値目標の適切な設定</li>
            <li>市場分析と競合調査に基づく差別化戦略の構築</li>
            <li>説得力のある事業計画書・申請書の作成</li>
            <li>行政機関・商工会議所との調整や対応</li>
            <li>申請後のフォローアップと実行支援</li>
          </ul>
          <p className="mt-4">豊富な申請実績と専門知識を活かし、お客様の経営革新を成功に導きます。</p>
        </section>
      </div>
    </PlanLayout>
  );
};

export default KeieiKakushinPage;
