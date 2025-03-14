
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ContactFormProps {
  subject?: string;
  buttonColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

export const ContactForm = ({ 
  subject = "お問い合わせ", 
  buttonColor = "text-blue-600", 
  borderColor = "border-blue-600",
  hoverColor = "hover:bg-blue-50"
}: ContactFormProps) => {
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

  return (
    <div className="text-center py-1 xs:py-2">
      <p className="mb-2 xs:mb-3 text-sm xs:text-base">お問い合わせには、Googleフォームを使用しております。</p>
      <Button 
        variant="outline"
        className={`text-sm xs:text-base bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
        disabled={isLoading}
        onClick={openFormInNewTab}
      >
        <ExternalLink className="mr-2 h-3 w-3 xs:h-4 xs:w-4" />
        {isLoading ? "読み込み中..." : "お問い合わせフォームを開く"}
      </Button>
    </div>
  );
};
