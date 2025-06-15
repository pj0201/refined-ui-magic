
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquarePlus } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { ContactFormFields } from "./contact/ContactFormFields";

interface ContactFormEmailJSProps {
  subject?: string;
}

export const ContactFormEmailJS = ({ 
  subject = "ホームページからのお問い合わせ" 
}: ContactFormEmailJSProps) => {
  const [open, setOpen] = useState(false);
  const { 
    formData, 
    isSubmitting, 
    handleChange, 
    handleSelectChange, 
    handleSubmit 
  } = useContactForm({ subject, setOpen });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="lg" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 text-lg"
          >
            <MessageSquarePlus className="mr-2 h-5 w-5" />
            お問い合わせ・無料相談
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto p-0" align="center" side="top">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">お問い合わせフォーム</CardTitle>
              <CardDescription className="text-center text-sm">
                お気軽にお問い合わせください。2営業日以内にご返信いたします。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <ContactFormFields 
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
