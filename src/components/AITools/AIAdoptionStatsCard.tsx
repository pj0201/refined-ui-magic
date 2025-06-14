
import { BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AIAdoptionStatsCard() {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <BarChart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI導入状況 2025年予測</h3>
            <div className="space-y-2">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-gray-700">大企業 (78%)</div>
                </div>
                <div className="flex h-2 overflow-hidden rounded bg-blue-100">
                  <div className="bg-blue-500" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-gray-700">中堅企業 (47%)</div>
                </div>
                <div className="flex h-2 overflow-hidden rounded bg-blue-100">
                  <div className="bg-blue-500" style={{ width: "47%" }}></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-gray-700">中小企業 (32%)</div>
                </div>
                <div className="flex h-2 overflow-hidden rounded bg-blue-100">
                  <div className="bg-blue-500" style={{ width: "32%" }}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">出典: 総務省「令和5年版 情報通信白書」および経済産業省調査</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
