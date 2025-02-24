
import { Bot } from "lucide-react";
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
