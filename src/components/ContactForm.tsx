
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "入力エラー",
        description: "すべての項目を入力してください",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // ここではフォームデータを単純にコンソールに出力するだけ
      // 実際にはバックエンド連携などが必要
      console.log({
        name,
        email,
        message,
        subject
      });

      // 送信成功のフィードバック
      toast({
        title: "送信完了",
        description: "お問い合わせありがとうございます。折り返しご連絡いたします。",
      });

      // フォームをクリア
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "エラーが発生しました",
        description: "送信に失敗しました。後ほど再度お試しください。",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          placeholder="お問い合わせ内容"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32"
        />
      </div>
      <div className="text-center">
        <Button 
          type="submit"
          variant="outline"
          className={`bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
          disabled={isSubmitting}
        >
          <Mail className="mr-2 h-4 w-4" />
          {isSubmitting ? "送信中..." : "お問い合わせを送信"}
        </Button>
      </div>
    </form>
  );
};
