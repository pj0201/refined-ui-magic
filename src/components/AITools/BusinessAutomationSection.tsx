
import { Bot, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ToolCard } from "./ToolCard";

interface Tool {
  name: string;
  description: string;
}

const automationTools: Tool[] = [
  { 
    name: "Dify",
    description: "ビジネスプロセスの自動化を実現するRPAプラットフォーム。カスタマイズ性が高い" 
  }
];

const searchableTools: Tool[] = [
  { 
    name: "GENSPARK",
    description: "AIを活用した高度な検索エンジン。業界特化型の情報収集と分析が可能" 
  },
  { 
    name: "Felo",
    description: "マルチソース検索と情報統合のAIプラットフォーム。複数のデータソースを横断的に分析" 
  }
];

export function BusinessAutomationSection() {
  const [searchText, setSearchText] = useState("");

  const filteredTools = searchableTools.filter(tool => 
    tool.name.toLowerCase().includes(searchText.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <span>業務自動化</span>
      </h2>

      {/* 通常のツール */}
      <div className="grid gap-4 mb-6">
        {automationTools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>

      {/* 検索可能なツールセクション */}
      <div className="mb-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="GENSPARKとFeloを検索..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="grid gap-4">
          {filteredTools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
