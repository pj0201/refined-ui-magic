
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const KeieiRyokuPage = () => {
  return (
    <PlanLayout 
      title="経営力向上計画" 
      imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-8">
        「中小企業等経営強化法」に基づき、中小企業が自社の強みを見直し、経営力を強化するために策定する計画です。市場分析や人材育成、IT化など、自社の課題を整理して最適な手を打つことを目指します。
        国が計画を認定することで、客観的な「経営力向上」の証明となります。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-purple-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">固定資産税の軽減措置</h3>
              <p>設備投資を伴う経営力向上の取組みを行う場合、固定資産税の一部が軽減されることがあります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-purple-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">補助金・助成金の優遇</h3>
              <p>計画認定を受けると、他の補助金・助成金への申請時に加点措置や優遇を得られる場合が多いです。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-purple-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">金融機関からの評価向上</h3>
              <p>国に認められた計画を持つことで、金融機関への説明がしやすくなり、融資などの面でプラスに働くことがあります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">申請に必要な内容</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>企業の概要と現状分析</li>
        <li>経営力向上の目標（生産性向上など）</li>
        <li>経営力向上のための具体的取組み</li>
        <li>設備投資の内容（該当する場合）</li>
        <li>数値目標（付加価値額や経常利益など）</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">経営力向上に有効な取組み例</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="text-purple-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">IT・デジタル活用</h3>
            <p>業務効率化ソフトウェアの導入、ECサイト構築、クラウドシステム活用</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="text-purple-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">人材育成</h3>
            <p>社員教育プログラム、スキルマップ作成、資格取得支援</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="text-purple-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">新市場開拓</h3>
            <p>新商品開発、販路拡大、海外展開</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="text-purple-500 h-6 w-6 mb-3" />
            <h3 className="font-bold text-lg mb-2">コスト削減</h3>
            <p>エネルギー効率の改善、在庫管理の最適化</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/kyoka/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              中小企業庁：経営力向上計画について
            </a>
          </li>
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/keiei/kyoka/ninteisinseisyo.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              経営力向上計画申請書・認定申請書
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          経営力向上計画の策定について専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが貴社の現状分析から具体的な計画策定、申請までトータルでサポートいたします。
        </p>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => window.location.href = 'mailto:hori@planjoy.net?subject=経営力向上計画について相談したい'}
        >
          メールでのお問い合わせ
        </Button>
      </div>
    </PlanLayout>
  );
};

export default KeieiRyokuPage;
