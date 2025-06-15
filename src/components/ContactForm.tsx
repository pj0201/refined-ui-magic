
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  buttonText?: string;
  className?: string;
}

export const ContactForm = ({
  buttonText = "お問い合わせ・無料相談",
  className,
}: ContactFormProps) => {
  // GoogleフォームURL（以前と同じく修正）
  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform";

  const openFormInNewTab = () => {
    window.open(googleFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <Button
        size="lg"
        className="w-full font-bold py-4 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white"
        onClick={openFormInNewTab}
      >
        <MessageSquarePlus className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
      {/* 必要なら案内文など追加可能 */}
      <div className="text-center text-sm text-gray-500 mt-4">
        ※クリックするとGoogleフォーム（外部サイト）が新しいタブで開きます。<br />
        ご相談内容にチェック・ご記入後、送信してください。
      </div>
    </div>
  );
};
