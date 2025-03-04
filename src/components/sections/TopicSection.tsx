
import { Check } from "lucide-react";

export const TopicSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Check className="text-green-500 mr-2" />
              支援実績
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                神戸・兵庫エリアでの創業支援実績多数
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                年間100社以上の経営相談に対応
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                補助金申請サポート成功率80%以上
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Check className="text-green-500 mr-2" />
              AI活用
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                AIを活用した業務改善事例多数
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                生成AIによる業務効率化サポート
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                データ分析・予測モデル構築支援
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Check className="text-green-500 mr-2" />
              事業承継
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                兵庫県内での事業承継支援実績豊富
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                円滑な事業承継のための計画策定
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                M&A・親族内承継のアドバイス提供
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
