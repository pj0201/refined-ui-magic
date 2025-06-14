
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { MessageSquarePlus } from "lucide-react";

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
    position: '',
    phone: '',
    businessType: '',
    employees: '',
    inquiryType: '',
    budget: '',
    timeline: '',
    currentChallenges: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        position: formData.position,
        phone: formData.phone,
        business_type: formData.businessType,
        employees: formData.employees,
        inquiry_type: formData.inquiryType,
        budget: formData.budget,
        timeline: formData.timeline,
        current_challenges: formData.currentChallenges,
        message: formData.message,
        subject: subject,
        to_email: 'your-email@example.com',
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

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
【役職】${formData.position || '未入力'}
【電話番号】${formData.phone || '未入力'}
【業種】${formData.businessType || '未入力'}
【従業員数】${formData.employees || '未入力'}
【お問い合わせ種別】${formData.inquiryType || '未入力'}
【ご予算】${formData.budget || '未入力'}
【希望時期】${formData.timeline || '未入力'}
【現在の経営課題】${formData.currentChallenges || '未入力'}
【お問い合わせ内容】
${formData.message}

2営業日以内にご返信いたします。
お急ぎの場合は、直接お電話にてお問い合わせください。

PLANNINGJOY株式会社
神戸・兵庫の経営コンサルティング`
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_AUTO_REPLY_TEMPLATE_ID',
        autoReplyParams,
        'YOUR_PUBLIC_KEY'
      );

      toast.success("お問い合わせを送信しました。ありがとうございます！");
      
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        phone: '',
        businessType: '',
        employees: '',
        inquiryType: '',
        budget: '',
        timeline: '',
        currentChallenges: '',
        message: ''
      });

      setOpen(false);

    } catch (error) {
      console.error('メール送信エラー:', error);
      toast.error("送信に失敗しました。しばらく後に再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <PopoverContent className="w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto p-0" align="center" side="top">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">お問い合わせフォーム</CardTitle>
              <CardDescription className="text-center text-sm">
                お気軽にお問い合わせください。2営業日以内にご返信いたします。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">お名前 *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="田中太郎"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">メールアドレス *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@company.com"
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm">会社名</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="株式会社サンプル"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm">役職</Label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="代表取締役"
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">電話番号</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="090-1234-5678"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm">業種</Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">選択してください</option>
                      <option value="製造業">製造業</option>
                      <option value="建設業">建設業</option>
                      <option value="卸売・小売業">卸売・小売業</option>
                      <option value="サービス業">サービス業</option>
                      <option value="IT・通信業">IT・通信業</option>
                      <option value="飲食業">飲食業</option>
                      <option value="医療・福祉">医療・福祉</option>
                      <option value="不動産業">不動産業</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employees" className="text-sm">従業員数</Label>
                    <select
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">選択してください</option>
                      <option value="1-5名">1-5名</option>
                      <option value="6-20名">6-20名</option>
                      <option value="21-50名">21-50名</option>
                      <option value="51-100名">51-100名</option>
                      <option value="101名以上">101名以上</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-sm">お問い合わせ種別</Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">選択してください</option>
                      <option value="補助金申請サポート">補助金申請サポート</option>
                      <option value="創業支援">創業支援</option>
                      <option value="事業承継支援">事業承継支援</option>
                      <option value="AI導入支援">AI導入支援</option>
                      <option value="経営改善">経営改善</option>
                      <option value="融資サポート">融資サポート</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm">ご予算</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">選択してください</option>
                      <option value="10万円未満">10万円未満</option>
                      <option value="10-30万円">10-30万円</option>
                      <option value="30-50万円">30-50万円</option>
                      <option value="50-100万円">50-100万円</option>
                      <option value="100万円以上">100万円以上</option>
                      <option value="未定">未定</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-sm">希望時期</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">選択してください</option>
                      <option value="すぐに">すぐに</option>
                      <option value="1ヶ月以内">1ヶ月以内</option>
                      <option value="3ヶ月以内">3ヶ月以内</option>
                      <option value="6ヶ月以内">6ヶ月以内</option>
                      <option value="1年以内">1年以内</option>
                      <option value="未定">未定</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentChallenges" className="text-sm">現在の経営課題</Label>
                  <Textarea
                    id="currentChallenges"
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleChange}
                    placeholder="現在抱えている経営上の課題をお聞かせください..."
                    rows={3}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">お問い合わせ内容 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="具体的なお問い合わせ内容をご記入ください..."
                    rows={4}
                    className="text-sm"
                  />
                </div>

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
