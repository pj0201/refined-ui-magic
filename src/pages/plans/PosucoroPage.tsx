
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const PosucoroPage = () => {
  return (
    <PlanLayout 
      title="早期経営改善計画策定支援事業" 
      subtitle="通称：ポスコロ" 
      imageUrl="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        中小企業や小規模事業者が、経営の"早期段階"で改善策を検討・策定できるように支援する国の事業です。
      </p>
      <p className="mb-8">
        商工会・商工会議所や認定支援機関が、財務改善から経営戦略まで幅広くアドバイスを行い、具体的な数値目標を設定した計画を策定します。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">支援費用の一部補助</h3>
              <p>計画策定に必要な専門家への相談や指導費用などが一部補助されるため、負担が軽減されます。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">早期の課題発見と対策</h3>
              <p>事業が深刻化する前に問題点を洗い出し、金融機関などとの連携を含めた改善策を迅速に立てることができます。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助金申請時の加点要素</h3>
              <p>適切に策定された計画は、他の補助金・助成金申請時にプラス評価を受ける場合があります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">必要書類</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>直近2期分の決算書</li>
        <li>試算表（最新のもの）</li>
        <li>会社の事業計画や経営方針に関する資料</li>
        <li>資金繰り表（作成済みの場合）</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/kakushin/kaizen/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              中小企業庁：早期経営改善計画策定支援事業について
            </a>
          </li>
          <li>
            <a 
              href="https://www.mirasapo-plus.go.jp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              ミラサポplus（経営支援情報サイト）
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          早期経営改善計画策定について専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが計画策定から申請までトータルでサポートいたします。
        </p>
        <ContactForm 
          subject="早期経営改善計画策定について相談したい"
          buttonColor="text-blue-600"
          borderColor="border-blue-600"
          hoverColor="hover:bg-blue-50"
        />
      </div>
    </PlanLayout>
  );
};

export default PosucoroPage;
