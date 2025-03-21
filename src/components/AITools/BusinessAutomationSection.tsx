
import { Bot } from "lucide-react";
import { ToolCard } from "./ToolCard";

interface Tool {
  name: string;
  description: string;
}

const automationTools: Tool[] = [
  { 
    name: "Dify",
    description: "LLMアプリケーション開発プラットフォーム。カスタムAIエージェントを簡単に構築・デプロイ可能" 
  },
  { 
    name: "Zapier AI",
    description: "自然言語指示でワークフローを自動化できるAIプラットフォーム。5,000以上のアプリを連携" 
  },
  { 
    name: "Make",
    description: "ノーコードで複雑な業務自動化シナリオを構築できるプラットフォーム。AIとの連携機能も充実" 
  },
  { 
    name: "n8n",
    description: "オープンソースのワークフロー自動化ツール。AIとの統合が容易でカスタマイズ性が高い" 
  }
];

export function BusinessAutomationSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <span>業務自動化</span>
      </h2>

      <div className="grid gap-4">
        {automationTools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
}
