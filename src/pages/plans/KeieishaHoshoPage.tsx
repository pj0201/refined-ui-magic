
import { PlanLayout } from "@/components/plans/PlanLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, BarChart } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const KeieishaHoshoPage = () => {
  return (
    <PlanLayout 
      title="経営者保証に関するガイドライン" 
      imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
    >
      <h2 className="text-2xl font-bold mb-4 mt-8">概要</h2>
      <p className="mb-4">
        経営者保証に関するガイドラインは、中小企業・小規模事業者等の経営者の個人保証について、適切な保証契約の在り方等を示すとともに、
        経営者保証の弊害を解消することを目的として策定された自主的なルールです。
      </p>
      <p className="mb-8">
        このガイドラインを活用することで、「法人と経営者の関係の明確な区分・分離」や「財務基盤の強化」等の経営改善を図ることで、
        「経営者保証に依存しない融資」の実現を目指すことができます。
      </p>

      <h2 className="text-2xl font-bold mb-4">主なメリット</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">個人保証なしの融資が可能に</h3>
              <p>経営と所有の分離、財務管理の適正化などが実現できれば、個人保証に依存しない融資を受けることができるようになります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">保証債務の整理が円滑に</h3>
              <p>万が一事業が行き詰まった場合でも、このガイドラインに沿って誠実に対応していれば、保証債務の整理を進めやすくなり、経営者の再チャレンジが可能になります。</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-start">
            <CheckCircle className="text-cyan-500 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">事業承継・M&Aが促進される</h3>
              <p>個人保証の問題が解消されれば、事業承継やM&Aの際の障壁が低くなり、円滑な事業の引継ぎが可能になります。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">ガイドラインに則った対応のポイント</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>法人と経営者個人の資産・経理の明確な分離</li>
        <li>法人のみの資産・収益力で借入返済が可能な財務基盤の構築</li>
        <li>適時適切な情報開示等による経営の透明性確保</li>
        <li>資金調達手段の多様化（ABL等の活用）</li>
        <li>計画的な借入金の返済や財務内容の改善努力</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">2024年度上期 経営者保証に依存しない融資の状況</h2>
      <p className="mb-4">
        近年、金融機関による経営者保証に依存しない融資の取り組みが進んでいます。
        以下は、2024年度上期における関西・中部地方の主要金融機関の新規融資件数に占める経営者保証に依存しない融資件数の割合です。
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">順位</th>
              <th className="border border-gray-300 px-4 py-2 text-left">金融機関名</th>
              <th className="border border-gray-300 px-4 py-2 text-left">経営者保証に依存しない融資の割合</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">南都銀行</td>
              <td className="border border-gray-300 px-4 py-2">79.3%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">池田泉州銀行</td>
              <td className="border border-gray-300 px-4 py-2">76.2%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">京都銀行</td>
              <td className="border border-gray-300 px-4 py-2">76.1%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">但馬銀行</td>
              <td className="border border-gray-300 px-4 py-2">73.2%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">百五銀行</td>
              <td className="border border-gray-300 px-4 py-2">66.5%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">6</td>
              <td className="border border-gray-300 px-4 py-2">紀陽銀行</td>
              <td className="border border-gray-300 px-4 py-2">63.8%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">7</td>
              <td className="border border-gray-300 px-4 py-2">みなと銀行</td>
              <td className="border border-gray-300 px-4 py-2">62.5%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">8</td>
              <td className="border border-gray-300 px-4 py-2">関西みらい銀行</td>
              <td className="border border-gray-300 px-4 py-2">59.9%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">9</td>
              <td className="border border-gray-300 px-4 py-2">滋賀銀行</td>
              <td className="border border-gray-300 px-4 py-2">51.5%</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">10</td>
              <td className="border border-gray-300 px-4 py-2">三十三銀行</td>
              <td className="border border-gray-300 px-4 py-2">34.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-cyan-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">
          <BarChart className="inline-block mr-2 h-5 w-5" />
          2024年度の傾向
        </h3>
        <p className="mb-4">
          関西の地方銀行における「経営者保証に依存しない融資」の割合は年々増加傾向にあります。
          特に上位の銀行では7割を超える新規融資が経営者保証なしで実行されており、
          中小企業の資金調達環境は大きく改善しています。
        </p>
        <p className="mb-4">
          当社では、お客様の財務状況や経営体制を分析し、経営者保証に依存しない融資を受けるための
          アドバイスや計画策定のサポートを行っています。
        </p>
        <p>
          経営者保証以外の金融機関情報や、関西以外の地域の情報については弊社までご連絡ください。
        </p>
      </div>

      <div className="bg-cyan-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/kinyu/keieihosho/index.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              中小企業庁：経営者保証に関するガイドライン
            </a>
          </li>
          <li>
            <a 
              href="https://www.zenshinhoren.or.jp/guarantee-guideline/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              全国信用保証協会連合会：経営者保証ガイドライン
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          経営者保証に関するガイドラインの活用方法や、保証に依存しない融資を受けるための体制づくりについて
          専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが貴社の状況に合わせたアドバイスを提供いたします。
        </p>
        <ContactForm 
          subject="経営者保証に関するガイドラインについて相談したい"
          buttonColor="text-cyan-600"
          borderColor="border-cyan-600"
          hoverColor="hover:bg-cyan-50"
        />
      </div>
    </PlanLayout>
  );
};

export default KeieishaHoshoPage;
