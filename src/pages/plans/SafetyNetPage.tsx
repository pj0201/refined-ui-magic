
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, AlertTriangle, BarChart } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const SafetyNetPage = () => {
  return (
    <PlanLayout 
      title="危機対応後経営安定資金（セーフティネット貸付）" 
      imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    >
      <div className="bg-yellow-50 p-6 rounded-lg mb-8 border-l-4 border-yellow-500">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
          重要なお知らせ
        </h3>
        <p>
          慢性的な赤字、融資の返済や経常的な資金繰りなどにお悩みの経営者様にも該当する場合がございます。
          一読の上、ぜひご相談ください。
        </p>
      </div>

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

      <h2 className="text-2xl font-bold mb-4">融資の概要</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/3">資金のお使いみち</th>
              <td className="border border-gray-300 px-4 py-2">既往債務の返済負担軽減のために必要とする運転資金</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">融資限度額</th>
              <td className="border border-gray-300 px-4 py-2">7,200万円（別枠）</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">利率（年）</th>
              <td className="border border-gray-300 px-4 py-2">基準利率</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">ご返済期間</th>
              <td className="border border-gray-300 px-4 py-2">20年以内（うち据置期間2年以内）</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">担保・保証人</th>
              <td className="border border-gray-300 px-4 py-2">お客さまのご希望を伺いながらご相談</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">併用できる特例制度</th>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc pl-6">
                  <li>経営者保証免除特例制度</li>
                  <li>賃上げ貸付利率特例制度</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">注意事項</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>お使いみち、ご返済期間、担保の有無などによって異なる利率が適用されます。</li>
          <li>利率は金融情勢によって変動いたしますので、お借入金利（固定）は、記載されている利率とは異なる場合がございます。</li>
          <li>審査の結果、お客さまのご希望に沿えないことがございます。</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4">2025年1月以降の中小企業向け資金繰り支援</h2>
      <p className="mb-4">
        2025年1月以降の中小企業向け資金繰り支援策について、経済産業省から発表がありました。
        以下はその概要です。
      </p>

      <div className="space-y-6 mb-8">
        <img 
          src="/lovable-uploads/4790433b-16d1-4945-b930-d6b3a88523a1.png" 
          alt="2025年1月以降の中小企業向け資金繰り支援について" 
          className="w-full border border-gray-200 rounded-lg shadow-sm"
        />
        
        <img 
          src="/lovable-uploads/2e698192-d53d-49d3-a47f-31ad48a038f6.png" 
          alt="2025年1月以降の中小企業向け資金繰り支援の全体像" 
          className="w-full border border-gray-200 rounded-lg shadow-sm"
        />
        
        <div className="text-sm text-gray-600 mt-2">
          出典：経済産業省参考資料「2025年1月以降の中小企業向け資金繰り支援について」
          <a 
            href="https://www.meti.go.jp/press/2024/11/20241128001/20241128001.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.meti.go.jp/press/2024/11/20241128001/20241128001.html
          </a>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">
          <BarChart className="inline-block mr-2 h-5 w-5" />
          支援策の変更点
        </h3>
        <p className="mb-4">
          コロナからの社会経済活動の正常化が進む中、経営上の課題は、売上減少から、人手不足・賃上げ・原材料費高騰等への対応へシフトしています。
          これに伴い、資金繰り支援策も成長促進を含めた多岐にわたる経営課題に対応できるよう見直されています。
        </p>
        <p>
          主な変更点として、「コロナ対策」から「経営改善・再生」「成長」を軸とした支援へと移行しています。
          詳細については、最新の情報を経済産業省や日本政策金融公庫のウェブサイトでご確認ください。
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.jfc.go.jp/n/finance/search/covid_19_after.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              日本政策金融公庫：危機対応後経営安定資金（セーフティネット貸付）
            </a>
          </li>
          <li>
            <a 
              href="https://www.meti.go.jp/covid-19/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              経済産業省：中小企業向け支援策
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          危機対応後経営安定資金（セーフティネット貸付）の申請や既存の債務見直しについて
          ご相談がありましたら、お気軽にお問い合わせください。
          弊社の経営コンサルタントが貴社の状況に合わせたアドバイスを提供いたします。
        </p>
        <ContactForm 
          subject="危機対応後経営安定資金について相談したい"
          buttonColor="text-blue-600"
          borderColor="border-blue-600"
          hoverColor="hover:bg-blue-50"
        />
      </div>
    </PlanLayout>
  );
};

export default SafetyNetPage;
