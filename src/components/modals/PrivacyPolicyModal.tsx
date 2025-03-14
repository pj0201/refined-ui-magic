
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">プライバシーポリシー</DialogTitle>
          <DialogDescription>
            最終更新日: 2024年7月1日
          </DialogDescription>
        </DialogHeader>

        <div className="text-left space-y-4 mt-4">
          <h3 className="text-lg font-semibold">1. 個人情報の取り扱いについて</h3>
          <p>
            PLANNINGJOY株式会社（以下「当社」）は、お客様の個人情報保護の重要性を認識し、適切に管理・保護することをお約束します。
            本プライバシーポリシーでは、当社のサービス利用に関して収集する個人情報の取り扱いについて説明します。
          </p>

          <h3 className="text-lg font-semibold">2. 収集する情報</h3>
          <p>
            当社は、お問い合わせやサービスのご利用にあたり、以下の情報を収集することがあります。
          </p>
          <ul className="list-disc pl-6">
            <li>氏名</li>
            <li>会社名・組織名</li>
            <li>メールアドレス</li>
            <li>電話番号</li>
            <li>住所</li>
            <li>ウェブサイトの利用状況に関する情報</li>
          </ul>

          <h3 className="text-lg font-semibold">3. 個人情報の利用目的</h3>
          <p>当社は、収集した個人情報を以下の目的で利用します。</p>
          <ul className="list-disc pl-6">
            <li>お問い合わせへの回答</li>
            <li>サービスの提供・改善</li>
            <li>新サービスや更新情報のご案内</li>
            <li>統計データの作成</li>
            <li>法令に基づく場合や権利・財産の保護</li>
          </ul>

          <h3 className="text-lg font-semibold">4. 個人情報の第三者提供</h3>
          <p>
            当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
          </p>
          <ul className="list-disc pl-6">
            <li>法律に基づく場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
            <li>公衆衛生の向上または児童の健全育成のために必要な場合</li>
            <li>国や地方公共団体等が公的な事務を遂行する場合</li>
          </ul>

          <h3 className="text-lg font-semibold">5. 個人情報の安全管理</h3>
          <p>
            当社は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じ、
            個人情報を安全に管理します。また、個人情報を取り扱う従業員に対して、情報セキュリティに関する教育を実施しています。
          </p>

          <h3 className="text-lg font-semibold">6. Cookieの使用</h3>
          <p>
            当社ウェブサイトでは、サービス向上を目的としてCookieを使用しています。
            Cookieにより特定の個人を識別することはできませんが、ブラウザの設定によりCookieの受け入れを拒否することも可能です。
          </p>

          <h3 className="text-lg font-semibold">7. 個人情報の開示・訂正・削除</h3>
          <p>
            お客様は自身の個人情報の開示・訂正・削除を請求することができます。
            請求を希望される場合は、お問い合わせフォームよりご連絡ください。
          </p>

          <h3 className="text-lg font-semibold">8. プライバシーポリシーの変更</h3>
          <p>
            当社は、法令の変更や事業内容の変更等に応じて、本プライバシーポリシーを変更することがあります。
            変更があった場合は、当ウェブサイト上でお知らせします。
          </p>

          <h3 className="text-lg font-semibold">9. お問い合わせ</h3>
          <p>
            本プライバシーポリシーに関するお問い合わせは、以下の窓口までお願いいたします。
          </p>
          <div className="mt-2">
            <div>PLANNINGJOY株式会社</div>
            <div>住所: 〒650-0011 兵庫県神戸市中央区下山手通4-6-3</div>
            <div>メール: info@planningjoy.com</div>
            <div>電話: 078-335-3570</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
