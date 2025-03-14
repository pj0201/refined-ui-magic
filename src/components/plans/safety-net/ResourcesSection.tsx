
import { ContactForm } from "@/components/ContactForm";

export const ResourcesSection = () => {
  return (
    <>
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.jfc.go.jp/n/finance/search/covid_19_after.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              日本政策金融公庫：危機対応後経営安定資金（セーフティネット貸付）
            </a>
          </li>
          <li>
            <a 
              href="https://www.meti.go.jp/covid-19/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              経済産業省：中小企業向け支援策
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          危機対応後経営安定資金（セーフティネット貸付）の申請や既存の債務見直しについて
          ご相談がありましたら、お気軽にお問い合わせください。
          弊社の経営コンサルタントが貴社の状況に合わせたアドバイスを提供いたします。
        </p>
        <ContactForm 
          subject="危機対応後経営安定資金について相談したい"
          buttonColor="text-blue-600"
          borderColor="border-blue-600"
          hoverColor="hover:bg-blue-50"
        />
      </div>
    </>
  );
};
