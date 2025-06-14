
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

interface ContactFormEmailJSProps {
  subject?: string;
}

export const ContactFormEmailJS = ({ 
  subject = "ホームページからのお問い合わせ" 
}: ContactFormEmailJSProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("必須項目を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJSでメール送信
      // TODO: EmailJSの設定値を入力する必要があります
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        subject: subject,
        to_email: 'your-email@example.com', // 管理者のメールアドレスに変更してください
      };

      // 管理者への通知メール送信
      await emailjs.send(
        'YOUR_SERVICE_ID', // EmailJSサービスID
        'YOUR_TEMPLATE_ID', // EmailJSテンプレートID  
        templateParams,
        'YOUR_PUBLIC_KEY' // EmailJS公開キー
      );

      // 自動返信メール送信
      const autoReplyParams = {
        to_name: formData.name,
        to_email: formData.email,
        subject: 'お問い合わせありがとうございます - PLANNINGJOY株式会社',
        message: `${formData.name}様

この度は、PLANNINGJOY株式会社にお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを承りました：

【お名前】${formData.name}
【メールアドレス】${formData.email}
【会社名】${formData.company || '未入力'}
【お問い合わせ内容】
${formData.message}

2営業日以内にご返信いたします。
お急ぎの場合は、直接お電話にてお問い合わせください。

PLANNINGJOY株式会社
神戸・兵庫の経営コンサルティング`
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // EmailJSサービスID
        'YOUR_AUTO_REPLY_TEMPLATE_ID', // 自動返信用テンプレートID
        autoReplyParams,
        'YOUR_PUBLIC_KEY' // EmailJS公開キー
      );

      toast.success("お問い合わせを送信しました。ありがとうございます！");
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });

    } catch (error) {
      console.error('メール送信エラー:', error);
      toast.error("送信に失敗しました。しばらく後に再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">お問い合わせ</CardTitle>
        <CardDescription className="text-center">
          お気軽にお問い合わせください。2営業日以内にご返信いたします。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">お名前 *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="田中太郎"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">会社名</Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="株式会社サンプル"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">お問い合わせ内容 *</Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="お問い合わせ内容をご記入ください..."
              rows={6}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
