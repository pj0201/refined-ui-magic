
import { FileText } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const ResourcesSection = () => {
  return (
    <>
      <div className="bg-cyan-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">お役立ちリンク</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.chusho.meti.go.jp/kinyu/keieihosho/index.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              中小企業庁：経営者保証に関するガイドライン
            </a>
          </li>
          <li>
            <a 
              href="https://www.zenshinhoren.or.jp/guarantee-guideline/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              全国信用保証協会連合会：経営者保証ガイドライン
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">ご相談・お問い合わせ</h3>
        <p className="mb-4">
          経営者保証に関するガイドラインの活用方法や、保証に依存しない融資を受けるための体制づくりについて
          専門的なサポートが必要な場合は、お気軽にご相談ください。
          弊社の経営コンサルタントが貴社の状況に合わせたアドバイスを提供いたします。
        </p>
        <ContactForm 
          subject="経営者保証に関するガイドラインについて相談したい"
          buttonColor="text-cyan-600"
          borderColor="border-cyan-600"
          hoverColor="hover:bg-cyan-50"
        />
      </div>
    </>
  );
};
