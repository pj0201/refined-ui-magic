
import { BarChart } from "lucide-react";

export const FinancialDataSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">2024年度上期 経営者保証に依存しない融資の状況</h2>
      <p className="mb-4">
        近年、金融機関による経営者保証に依存しない融資の取り組みが進んでいます。
        以下は、2024年度上期における関西地方の主要金融機関の新規融資件数に占める経営者保証に依存しない融資件数の割合です。
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
    </>
  );
};
