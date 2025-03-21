
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlossaryTerm } from "@/data/glossaryData";

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/80 hover:bg-white/90 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{term.term}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-gray-600">{term.definition}</p>
        </div>
        {term.links && term.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {term.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                {link.text}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
