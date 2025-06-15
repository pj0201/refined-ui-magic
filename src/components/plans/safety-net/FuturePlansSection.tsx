
import { BarChart } from "lucide-react";
// import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

export const FuturePlansSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">2025年1月以降の中小企業向け資金繰り支援</h2>
      <p className="mb-4">
        2025年1月以降の中小企業向け資金繰り支援策について、経済産業省から発表がありました。
        以下はその概要です。
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">
          <BarChart className="inline-block mr-2 h-5 w-5" />
          支援策の変更点
        </h3>
        <p className="mb-4">
          コロナからの社会経済活動の正常化が進む中、経営上の課題は、売上減少から、人手不足・賃上げ・原材料費高騰等への対応へシフトしています。
          これに伴い、資金繰り支援策も成長促進を含めた多岐にわたる経営課題に対応できるよう見直されています。
        </p>
        <p>
          主な変更点として、「コロナ対策」から「経営改善・再生」「成長」を軸とした支援へと移行しています。
          詳細については、最新の情報を経済産業省や日本政策金融公庫のウェブサイトでご確認、または弊社までご連絡ください。
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <img 
          src="/lovable-uploads/4790433b-16d1-4945-b930-d6b3a88523a1.png" 
          alt="2025年1月以降の中小企業向け資金繰り支援について" 
          className="w-full border border-gray-200 rounded-lg shadow-sm"
        />
        
        <img 
          src="/lovable-uploads/2e698192-d53d-49d3-a47f-31ad48a038f6.png" 
          alt="2025年1月以降の中小企業向け資金繰り支援の全体像" 
          className="w-full border border-gray-200 rounded-lg shadow-sm"
        />
        
        <div className="text-sm text-gray-600 mt-2">
          出典：経済産業省参考資料「2025年1月以降の中小企業向け資金繰り支援について」
          <a 
            href="https://www.meti.go.jp/press/2024/11/20241128001/20241128001.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.meti.go.jp/press/2024/11/20241128001/20241128001.html
          </a>
        </div>
      </div>

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
          <li>
            <a 
              href="https://www.fsa.go.jp/news/r6/ginkou/20241128/yousei.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              金融庁：「国民の安心・安全と持続的な成長に向けた総合経済対策」を踏まえた事業者支援の徹底等について
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
        <Button 
          onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform', '_blank', 'noopener,noreferrer')}
          variant="outline"
          size="lg"
          className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-600"
        >
          ご相談・お問い合わせ
        </Button>
      </div>
    </>
  );
};
