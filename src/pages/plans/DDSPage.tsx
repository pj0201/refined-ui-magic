
import { PlanLayout } from "@/components/plans/PlanLayout";
import { DollarSign, TrendingUp, Scale, PiggyBank, FileText } from "lucide-react";

const DDSPage = () => {
  return (
    <PlanLayout 
      title="DDS（資本性劣後ローン）" 
      subtitle="実質的な自己資本増強のための資金調達手法"
      imageUrl="https://images.unsplash.com/photo-1565372195458-9de0b320ef04"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">概要</h2>
          <p>DDS（Debt Debt Swap - 資本性劣後ローン）は、金融機関が供与する資本性の資金調達手法です。既存の借入金を資本的劣後ローンに転換するか、または新規に劣後ローンを調達することで、財務状況を改善します。金融検査上、貸付条件によっては自己資本とみなされる特徴を持っています。</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Scale className="text-emerald-600 mr-2" />
                <h3 className="font-bold">金融機関の債務者区分の改善</h3>
              </div>
              <p>金融機関の債務者区分が上位に改善され、融資を受けやすくなります。</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="text-emerald-600 mr-2" />
                <h3 className="font-bold">実質的な自己資本の増強</h3>
              </div>
              <p>財務上は負債であっても、金融検査上は資本とみなされ、実質的な自己資本比率が向上します。</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <PiggyBank className="text-emerald-600 mr-2" />
                <h3 className="font-bold">他の借入れの返済負担軽減</h3>
              </div>
              <p>長期間（5年以上）にわたり元本返済の必要がなく、キャッシュフローの改善に寄与します。</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="text-emerald-600 mr-2" />
                <h3 className="font-bold">取引金融機関との関係強化</h3>
              </div>
              <p>財務改善によって取引金融機関との関係が強化され、継続的な支援を受けやすくなります。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">DDSの特徴</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ul className="space-y-3">
              <li><span className="font-bold">劣後性</span>：他の債権に比べて返済順位が低く、破綻時には一般債権者への弁済後に返済される</li>
              <li><span className="font-bold">長期間の元本据置</span>：通常5年以上の元本据置期間がある</li>
              <li><span className="font-bold">金利の柔軟性</span>：業績に連動した金利設定が可能な場合がある</li>
              <li><span className="font-bold">無担保・無保証</span>：通常、無担保・無保証で融資される</li>
              <li><span className="font-bold">資本性認識</span>：金融検査上、条件によっては自己資本とみなされる</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">適用要件と対象企業</h2>
          <p className="mb-4">以下のような企業がDDSの対象となることが多いです：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>財務状況に課題があるが事業の継続性や成長性が認められる企業</li>
            <li>経営改善計画や再生計画を策定・実行している企業</li>
            <li>赤字体質から脱却しつつあるが、過去の借入負担が大きい企業</li>
            <li>設備投資などの成長投資が必要だが、財務状況が課題となっている企業</li>
            <li>自己資本比率が低く、金融機関からの評価向上が必要な企業</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">DDSを活用するためのプロセス</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-bold">事業性評価</span>：金融機関による事業の将来性や成長性の評価</li>
              <li><span className="font-bold">経営改善計画の策定</span>：DDSを含めた具体的な改善計画の作成</li>
              <li><span className="font-bold">金融機関との協議</span>：条件や金額について金融機関と詳細な協議</li>
              <li><span className="font-bold">DDSの実行</span>：既存借入金の劣後ローンへの転換または新規劣後ローンの調達</li>
              <li><span className="font-bold">計画の実行と定期的な報告</span>：計画の実行状況を定期的に金融機関へ報告</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">DDS活用のポイント</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <FileText className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">事業の継続性・成長性の証明</span>：単なる財務改善だけでなく、事業の継続性と成長性を示すことが重要です。</p>
            </div>
            <div className="flex items-start">
              <FileText className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">具体的な経営改善計画</span>：DDSを活用して実行可能な経営改善計画を提示することが必要です。</p>
            </div>
            <div className="flex items-start">
              <FileText className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">金融機関との関係性</span>：メイン銀行との良好な関係が重要で、情報開示と透明性の確保が必要です。</p>
            </div>
            <div className="flex items-start">
              <FileText className="text-emerald-600 mt-1 mr-2 flex-shrink-0" />
              <p><span className="font-bold">専門家の関与</span>：中小企業診断士や税理士など、専門家の関与によって計画の信頼性が高まります。</p>
            </div>
          </div>
        </section>

        <section className="bg-emerald-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">当社のサポート</h2>
          <p className="mb-4">当社では、DDSを活用した財務改善・経営強化のための包括的なサービスを提供しています：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>事業性評価のための資料作成と事業計画策定</li>
            <li>金融機関向けの経営改善計画書の作成</li>
            <li>DDSに関する金融機関との交渉サポート</li>
            <li>DDSと併用できる他の支援策の提案</li>
            <li>実行後のモニタリングと継続的な改善支援</li>
          </ul>
          <p className="mt-4">豊富な経験と専門知識を活かし、お客様の財務体質強化と事業成長を包括的にサポートいたします。</p>
        </section>
      </div>
    </PlanLayout>
  );
};

export default DDSPage;
