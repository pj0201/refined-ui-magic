import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    industry: '',
    employees: '',
    consultationType: '',
    contactMethod: '',
    urgency: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
      const serviceId = 'service_vf5jkap';
      const templateId = 'template_w93kdji';
      const publicKey = '5sOygxcn87FCfc_uL';

      console.log('EmailJS送信開始');

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        position: formData.position,
        phone: formData.phone,
        industry: formData.industry,
        employees: formData.employees,
        consultation_type: formData.consultationType,
        contact_method: formData.contactMethod,
        urgency: formData.urgency,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        subject: subject,
        to_email: 'mtdgjtwpmt23468@gmail.com',
      };

      console.log('送信データ:', templateParams);

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log('送信成功:', result);

      toast.success("お問い合わせを送信しました。ありがとうございます！");
      
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        phone: '',
        industry: '',
        employees: '',
        consultationType: '',
        contactMethod: '',
        urgency: '',
        budget: '',
        timeline: '',
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
                    <Label htmlFor="industry" className="text-sm">業種・事業内容</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="業種を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">製造業</SelectItem>
                        <SelectItem value="retail">小売業</SelectItem>
                        <SelectItem value="service">サービス業</SelectItem>
                        <SelectItem value="construction">建設業</SelectItem>
                        <SelectItem value="it">IT・情報通信業</SelectItem>
                        <SelectItem value="healthcare">医療・福祉</SelectItem>
                        <SelectItem value="finance">金融業</SelectItem>
                        <SelectItem value="education">教育・学習支援業</SelectItem>
                        <SelectItem value="transportation">運輸・物流業</SelectItem>
                        <SelectItem value="restaurant">飲食業</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employees" className="text-sm">従業員数</Label>
                    <Select value={formData.employees} onValueChange={(value) => handleSelectChange('employees', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="従業員数を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5名</SelectItem>
                        <SelectItem value="6-20">6-20名</SelectItem>
                        <SelectItem value="21-50">21-50名</SelectItem>
                        <SelectItem value="51-100">51-100名</SelectItem>
                        <SelectItem value="101-300">101-300名</SelectItem>
                        <SelectItem value="301+">301名以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consultationType" className="text-sm">相談内容</Label>
                    <Select value={formData.consultationType} onValueChange={(value) => handleSelectChange('consultationType', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="相談内容を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">経営戦略・事業計画</SelectItem>
                        <SelectItem value="subsidy">補助金申請サポート</SelectItem>
                        <SelectItem value="ai">AI導入支援</SelectItem>
                        <SelectItem value="startup">創業支援</SelectItem>
                        <SelectItem value="succession">事業承継</SelectItem>
                        <SelectItem value="finance">資金調達</SelectItem>
                        <SelectItem value="marketing">マーケティング</SelectItem>
                        <SelectItem value="operations">業務改善</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactMethod" className="text-sm">希望連絡方法</Label>
                    <Select value={formData.contactMethod} onValueChange={(value) => handleSelectChange('contactMethod', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="希望連絡方法を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">メール</SelectItem>
                        <SelectItem value="phone">電話</SelectItem>
                        <SelectItem value="meeting">対面面談</SelectItem>
                        <SelectItem value="online">オンライン面談</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-sm">緊急度</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleSelectChange('urgency', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="緊急度を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">至急（1週間以内）</SelectItem>
                        <SelectItem value="high">高（1ヶ月以内）</SelectItem>
                        <SelectItem value="medium">中（3ヶ月以内）</SelectItem>
                        <SelectItem value="low">低（時期未定）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm">予算規模</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="予算規模を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under50">50万円未満</SelectItem>
                        <SelectItem value="50-100">50-100万円</SelectItem>
                        <SelectItem value="100-300">100-300万円</SelectItem>
                        <SelectItem value="300-500">300-500万円</SelectItem>
                        <SelectItem value="500-1000">500-1000万円</SelectItem>
                        <SelectItem value="over1000">1000万円以上</SelectItem>
                        <SelectItem value="undecided">未定</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-sm">相談希望時期</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="相談希望時期を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">すぐに</SelectItem>
                        <SelectItem value="thisweek">今週中</SelectItem>
                        <SelectItem value="thismonth">今月中</SelectItem>
                        <SelectItem value="nextmonth">来月</SelectItem>
                        <SelectItem value="within3months">3ヶ月以内</SelectItem>
                        <SelectItem value="undecided">未定</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">具体的なお問い合わせ内容 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="具体的なお問い合わせ内容、現在の課題、ご要望などを詳しくご記入ください..."
                    rows={6}
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
