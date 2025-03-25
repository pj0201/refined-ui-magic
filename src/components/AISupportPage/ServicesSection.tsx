
import { LayoutDashboard, BookOpen, Code, LineChart } from 'lucide-react';

export const ServicesSection = () => {
  return (
    <section className="mb-16 bg-white rounded-xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">サービス内容</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* サービス1 */}
        <div className="flex gap-4">
          <div className="bg-purple-100 p-3 h-fit rounded-full">
            <LayoutDashboard className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI導入コンサルティング</h3>
            <p className="text-gray-600">
              現状分析から導入計画の策定、ツール選定、運用サポートまで一貫して支援します。補助金申請サポートも可能です。
            </p>
          </div>
        </div>

        {/* サービス2 */}
        <div className="flex gap-4">
          <div className="bg-purple-100 p-3 h-fit rounded-full">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AIセミナー</h3>
            <p className="text-gray-600">
              あらゆる階層の方を対象としたAIセミナーを開催。AIの基礎から実践的な活用方法まで学べます。
            </p>
          </div>
        </div>

        {/* サービス3 */}
        <div className="flex gap-4">
          <div className="bg-purple-100 p-3 h-fit rounded-full">
            <Code className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI活用ツール開発</h3>
            <p className="text-gray-600">
              御社の業務に特化したAIツールの開発をサポート。既存システムとの連携も可能です。
            </p>
          </div>
        </div>

        {/* サービス4 */}
        <div className="flex gap-4">
          <div className="bg-purple-100 p-3 h-fit rounded-full">
            <LineChart className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">効果測定・改善支援</h3>
            <p className="text-gray-600">
              AI導入後の効果測定と継続的な改善をサポート。KPI設定から運用改善まで伴走します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
