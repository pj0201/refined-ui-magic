
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  name: string;
  description: string;
}

export function ToolCard({ name, description }: ToolCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/80 hover:bg-white/90 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
