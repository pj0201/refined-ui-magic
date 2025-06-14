
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AIBusinessImpactCard() {
  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI活用による業務効果</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white bg-opacity-60 p-2 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">23%</div>
                <div className="text-xs text-gray-600">業務時間削減</div>
              </div>
              <div className="bg-white bg-opacity-60 p-2 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">31%</div>
                <div className="text-xs text-gray-600">生産性向上</div>
              </div>
              <div className="bg-white bg-opacity-60 p-2 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">45%</div>
                <div className="text-xs text-gray-600">非属人化促進</div>
              </div>
              <div className="bg-white bg-opacity-60 p-2 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">19%</div>
                <div className="text-xs text-gray-600">新規事業創出</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">出典: 令和5年度AI導入実態調査</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
