
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  name: string;
  description: string;
}

export function ToolCard({ name, description }: ToolCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/80 hover:bg-white/90 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
