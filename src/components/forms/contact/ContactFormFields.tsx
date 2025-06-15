
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactFormData } from "@/hooks/useContactForm";

interface ContactFormFieldsProps {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: keyof ContactFormData, value: string) => void;
}

export const ContactFormFields = ({ formData, handleChange, handleSelectChange }: ContactFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};
