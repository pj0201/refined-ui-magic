
import { Card, CardContent } from "@/components/ui/card";

export const OverviewSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        危機対応後経営安定資金（セーフティネット貸付）は、過去の大規模な災害、感染症等の影響を受けたみなさまが
        既往債務の返済負担の軽減を図るための融資制度です。
      </p>
      <p className="mb-8">
        中長期的には事業の回復と発展が見込まれる方を対象に、返済負担を軽減するための支援を行います。
      </p>

      <h2 className="text-2xl font-bold mb-4">ご利用いただける方</h2>
      <p className="mb-4">
        過去の大規模な災害、感染症等の影響を受け、既往債務の返済負担が生じているが、
        中長期的にはその業況が回復し発展することが見込まれる方で、次のいずれにも該当する方：
      </p>

      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">1. 次のいずれかの貸付制度等にかかる貸付残高を有する方</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>新型コロナウイルス感染症特別貸付（生活衛生新型コロナウイルス感染症特別貸付を含む）</li>
              <li>新型コロナウイルス感染症対策挑戦支援資本強化特別貸付</li>
              <li>新型コロナウイルス感染症にかかる衛生環境激変特別貸付</li>
              <li>危機対応後経営安定資金（セーフティネット貸付）</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">2. 債務負担が重くなっている方</h3>
            <p>一定の要件を満たす必要があります。要件の詳細は、日本政策金融公庫の支店にお問い合わせください。</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
