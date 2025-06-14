
import { LucideIcon } from "lucide-react";
import { ToolCard } from "./ToolCard";
import { Tool } from "@/data/ai-tools/types";

interface CategorySectionProps {
  category: string;
  icon: LucideIcon;
  tools: Tool[];
}

export function CategorySection({ category, icon: Icon, tools }: CategorySectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Icon className="w-6 h-6" />
        <span>{category}</span>
      </h2>
      <div className="grid gap-4">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
}
