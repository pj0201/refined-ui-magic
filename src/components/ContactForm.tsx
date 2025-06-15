
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  subject?: string;
  buttonText?: string;
  variant?: "default" | "outline";
  className?: string;
}

export const ContactForm = ({ 
  subject = "ホームページからのお問い合わせ",
  buttonText = "お問い合わせ・無料相談",
  variant = "default",
  className,
}: ContactFormProps) => {
  const [useState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform";
  
  const openFormInNewTab = () => {
    setIsLoading(true);
    // Encode the subject parameter if needed
    const url = `${googleFormUrl}?usp=pp_url&entry.1234567890=${encodeURIComponent(subject)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const baseClasses = "w-full font-bold py-4 px-8 text-lg";
  const defaultClasses = "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Button 
        size="lg" 
        variant={variant}
        className={cn(
          baseClasses,
          variant === 'default' && defaultClasses,
          className
        )}
        disabled={isLoading}
        onClick={openFormInNewTab}
      >
        <MessageSquarePlus className="mr-2 h-5 w-5" />
        {isLoading ? "読み込み中..." : buttonText}
      </Button>
    </div>
  );
};
