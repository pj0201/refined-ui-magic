
import { ExternalLink } from "lucide-react";

export const TopicSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">トピック</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-600 text-sm font-semibold">
                NEW
              </span>
              <span className="text-gray-500 text-sm">
                2025/03
              </span>
            </div>
            <div>
              <p className="text-gray-800">2025年3月より申請開始　新たに一般形が追加され利用しやすくなった「中小企業省力化投資補助金一般形」が始まります。（詳細は本ページのチャットボットへどうぞ)</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-800">AI用語について</p>
              <a href="/ai-glossary" className="inline-block px-3 py-2 text-sm border border-gray-200 hover:bg-gray-100 transition-colors rounded ml-4">
                <span className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  詳細を見る
                </span>
              </a>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-800">おすすめのAIツール一覧</p>
              <a href="/ai-tools" className="inline-block px-3 py-2 text-sm border border-gray-200 hover:bg-gray-100 transition-colors rounded ml-4">
                <span className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  詳細を見る
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
