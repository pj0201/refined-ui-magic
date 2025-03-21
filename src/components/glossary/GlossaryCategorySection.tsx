
import { GlossaryCategory } from "@/data/glossaryData";
import { GlossaryTermCard } from "./GlossaryTermCard";

interface GlossaryCategorySectionProps {
  category: GlossaryCategory;
}

export function GlossaryCategorySection({ category }: GlossaryCategorySectionProps) {
  return (
    <div className="mb-10">
      <h2 id={category.id} className="text-2xl font-bold mb-4 text-gray-800">
        {category.title}
      </h2>
      <div className="grid gap-6">
        {category.terms.map((term, index) => (
          <GlossaryTermCard key={index} term={term} />
        ))}
      </div>
    </div>
  );
}
