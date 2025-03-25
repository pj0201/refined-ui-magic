
import { Bot, Sparkles, Brain, Zap, BarChart } from "lucide-react";
import { ToolCard } from "./ToolCard";
import { Card, CardContent } from "@/components/ui/card";

interface Tool {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

const automationTools: Tool[] = [
  { 
    name: "Dify",
    description: "LLMアプリケーション開発プラットフォーム。カスタムAIエージェントを簡単に構築・デプロイ可能",
    icon: <Brain className="w-5 h-5 text-purple-600" />
  },
  { 
    name: "Zapier AI",
    description: "自然言語指示でワークフローを自動化できるAIプラットフォーム。5,000以上のアプリを連携",
    icon: <Zap className="w-5 h-5 text-amber-500" />
  },
  { 
    name: "Make",
    description: "ノーコードで複雑な業務自動化シナリオを構築できるプラットフォーム。AIとの連携機能も充実",
    icon: <Sparkles className="w-5 h-5 text-blue-500" />
  },
  { 
    name: "n8n",
    description: "オープンソースのワークフロー自動化ツール。AIとの統合が容易でカスタマイズ性が高い",
    icon: <BarChart className="w-5 h-5 text-green-500" />
  }
];

export function BusinessAutomationSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        <span>業務自動化</span>
      </h2>

      {/* AI adoption statistics card - First new AI component */}
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

      {/* AI Business Impact card - Second new AI component */}
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

      <div className="grid gap-4">
        {automationTools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
}

