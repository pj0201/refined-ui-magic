
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

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
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Google Form URLs - replace these with your actual Google Form URLs
  const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfYB1RLSvB-jPvBgCj_c1hxYzJYB-H5V_7_uy0DrU1TqTPjVw/viewform?usp=pp_url";
  
  // Build the URL with prefilled subject
  const formUrlWithSubject = `${formBaseUrl}&entry.1234567890=${encodeURIComponent(subject)}`;

  const handleShowForm = () => {
    setIsLoading(true);
    // Simulate loading the form
    setTimeout(() => {
      setShowForm(true);
      setIsLoading(false);
    }, 500);
  };

  if (showForm) {
    return (
      <div className="w-full h-full">
        <iframe 
          src={formUrlWithSubject}
          width="100%" 
          height="650" 
          frameBorder="0" 
          marginHeight={0} 
          marginWidth={0}
          className="mt-2"
        >
          読み込んでいます...
        </iframe>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="mb-4">お問い合わせには、セキュアなGoogleフォームを使用しております。</p>
      <Button 
        variant="outline"
        className={`bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
        disabled={isLoading}
        onClick={handleShowForm}
      >
        <Mail className="mr-2 h-4 w-4" />
        {isLoading ? "読み込み中..." : "お問い合わせフォームを表示"}
      </Button>
    </div>
  );
};
