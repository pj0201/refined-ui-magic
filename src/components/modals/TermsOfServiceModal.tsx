
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfServiceModal = ({ open, onOpenChange }: TermsOfServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">利用規約</DialogTitle>
          <DialogDescription>
            最終更新日: 2024年7月1日
          </DialogDescription>
        </DialogHeader>

        <div className="text-left space-y-4 mt-4">
          <p>
            本利用規約（以下「本規約」）は、PLANNINGJOY株式会社（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
            本サービスをご利用になる方（以下「利用者」）は、本規約に同意したものとみなします。
          </p>

          <h3 className="text-lg font-semibold">1. 適用範囲</h3>
          <p>
            本規約は、利用者と当社との間の本サービス利用に関わる一切の関係に適用されます。
            当社が本サービスに関して別途定める規約、ガイドライン等も本規約の一部を構成します。
          </p>

          <h3 className="text-lg font-semibold">2. 利用登録</h3>
          <p>
            本サービスの一部は、登録が必要となる場合があります。
            当社が登録を相当でないと判断した場合は、登録を拒否することがあります。
          </p>

          <h3 className="text-lg font-semibold">3. 禁止事項</h3>
          <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
          <ul className="list-disc pl-6">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪に関連する行為</li>
            <li>当社や第三者の知的財産権、プライバシー、名誉、その他の権利または利益を侵害する行為</li>
            <li>本サービスのネットワークやシステム等に過度な負荷をかける行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスをし、またはこれを試みる行為</li>
            <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
            <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>

          <h3 className="text-lg font-semibold">4. 本サービスの提供の停止等</h3>
          <p>
            当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができます。
          </p>
          <ul className="list-disc pl-6">
            <li>本サービスにかかるシステムの保守点検または更新を行う場合</li>
            <li>地震、落雷、火災、停電、天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li>コンピュータまたは通信回線等が事故により停止した場合</li>
            <li>その他、当社が本サービスの提供が困難と判断した場合</li>
          </ul>

          <h3 className="text-lg font-semibold">5. 免責事項</h3>
          <p>
            当社は、本サービスに関して、利用者と他の利用者または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            また、当社は、本サービスの内容変更、中断、終了によって生じたいかなる損害についても、一切の責任を負いません。
          </p>

          <h3 className="text-lg font-semibold">6. サービス内容の変更等</h3>
          <p>
            当社は、利用者に通知することなく、本サービスの内容を変更または本サービスの提供を中止することができます。
            変更後の利用規約は、当社ウェブサイト上に表示した時点より効力を生じるものとします。
          </p>

          <h3 className="text-lg font-semibold">7. 利用規約の変更</h3>
          <p>
            当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができます。
            変更後の利用規約は、当社ウェブサイト上に表示した時点より効力を生じるものとします。
          </p>

          <h3 className="text-lg font-semibold">8. 個人情報の取り扱い</h3>
          <p>
            本サービスの利用によって取得する利用者の個人情報については、当社の「プライバシーポリシー」に従い適切に取り扱います。
          </p>

          <h3 className="text-lg font-semibold">9. 準拠法・裁判管轄</h3>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。
            本サービスに関して紛争が生じた場合には、神戸地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>

          <div className="mt-6">
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
