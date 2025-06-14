
import { LucideIcon } from "lucide-react";

export interface Tool {
  name: string;
  description: string;
}

export interface ToolCategory {
  category: string;
  icon: LucideIcon;
  tools: Tool[];
}
