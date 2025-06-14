
import { GlossaryCategory } from "@/data/glossary/types";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

interface CategoryNavigationProps {
  categories: GlossaryCategory[];
}

export function CategoryNavigation({ categories }: CategoryNavigationProps) {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Book className="h-5 w-5" />
        <span>カテゴリー</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            onClick={() => scrollToCategory(category.id)}
            className="text-sm"
          >
            {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
