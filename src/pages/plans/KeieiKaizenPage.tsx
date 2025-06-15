
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
// import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

const KeieiKaizenPage = () => {
  return (
    <PlanLayout 
      title="経営改善計画策定支援" 
      subtitle="通称：405事業" 
      imageUrl="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        事業再生や経営基盤の立て直しを強化するための計画策定支援制度です。特に売上減少や業績悪化が続く事業者を対象として、具体的な経営改善策を専門家と共に作成します。
      </p>
      <p className="mb-8">
        金融機関との調整や資金繰り計画の見直しも含めて、再建プランを明確にします。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">専門家の活用による計画策定</h3>
              <p>事業再生に精通した認定支援機関や中小企業診断士などの専門家から具体的なアドバイスを得られるため、より実行性の高い計画が作りやすくなります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">金融機関との信用力向上</h3>
              <p>第三者が関与した計画の作成は、金融機関に対しても説得力が増し、融資やリスケジュールなどの交渉がしやすくなります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-green-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助事業申請時の優遇</h3>
              <p>経営改善を目指した計画策定実績により、他の補助金や助成金の採択で加点対象となることがあります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">必要書類</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>直近3〜5期分の決算書</li>
        <li>最新の試算表</li>
        <li>事業計画や経営方針に関する資料</li>
        <li>金融機関取引状況（残高証明書など）</li>
        <li>資金繰り表</li>
        <li>債務・借入金の返済予定表</li>
      </ul>

      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/saisei/2013/131226saisei.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              中小企業庁：経営改善計画策定支援事業について
            </a>
          </li>
          <li>
            <a 
              href="https://www.smrj.go.jp/sme/enhancement/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              中小機構：経営改善支援情報
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          経営改善計画策定について専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが金融機関との調整も含めて、計画策定から実行までトータルでサポートいたします。
        </p>
        <Button 
          onClick={() => window.location.href = 'mailto:hori@planjoy.net?subject=経営改善計画策定支援についてのご相談'}
          variant="outline"
          size="lg"
          className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-600"
        >
          ご相談・お問い合わせ
        </Button>
      </div>
    </PlanLayout>
  );
};

export default KeieiKaizenPage;
