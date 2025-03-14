
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Cpu } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const SentanSetsubiPage = () => {
  return (
    <PlanLayout 
      title="先端設備等導入計画" 
      imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-8">
        中小企業が生産性向上を目的に先端設備を導入する際、その計画を自治体の認定を受けることで税制優遇をはじめとする支援を得る制度です。
        IoT機器やAIなど、先端技術を活用した設備投資を促進するための仕組みとして広く利用されています。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-indigo-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">固定資産税の減免</h3>
              <p>認定計画に沿った設備投資の場合、一定期間固定資産税がゼロまたは軽減される大きなメリットがあります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-indigo-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助金の加点</h3>
              <p>生産性向上を目指した設備投資は、多くの補助金制度で優遇対象となっており、加点措置や採択率アップが期待できます。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-indigo-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">生産性の向上による競争力強化</h3>
              <p>先端技術を活用した設備導入により、業務効率化や高付加価値化が実現し、企業全体の競争力を高めることができます。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">対象となる先端設備の例</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <Cpu className="text-indigo-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">生産設備</h3>
            <p>工作機械、プレス機、射出成形機、3Dプリンターなど</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Cpu className="text-indigo-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">IoTシステム</h3>
            <p>センサーネットワーク、遠隔監視システム、自動制御装置など</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Cpu className="text-indigo-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">ソフトウェア</h3>
            <p>生産管理システム、AI分析ツール、RPA（業務自動化）など</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Cpu className="text-indigo-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">検査・測定機器</h3>
            <p>非破壊検査装置、3次元測定器、画像処理装置など</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">申請のステップ</h2>
      <ol className="list-decimal pl-6 mb-8 space-y-2">
        <li>先端設備導入計画の策定（生産性向上の数値目標設定）</li>
        <li>導入する設備の選定と工業会証明書の取得</li>
        <li>自治体（工場等の所在地）への申請</li>
        <li>認定後、設備導入・運用開始</li>
        <li>導入効果の測定と報告</li>
      </ol>

      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/seisansei/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              中小企業庁：先端設備等導入計画について
            </a>
          </li>
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/seisansei/2022/220401seisansei.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              先端設備等導入計画の様式・記載例
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          先端設備等導入計画の策定について専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが最適な設備選定から計画策定、申請までトータルでサポートいたします。
        </p>
        <ContactForm 
          subject="先端設備等導入計画について相談したい"
          buttonColor="text-indigo-600"
          borderColor="border-indigo-600"
          hoverColor="hover:bg-indigo-50"
        />
      </div>
    </PlanLayout>
  );
};

export default SentanSetsubiPage;
