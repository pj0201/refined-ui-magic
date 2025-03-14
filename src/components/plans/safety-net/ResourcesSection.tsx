import { ContactForm } from "@/components/ContactForm";

export const ResourcesSection = () => {
  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h3 className="font-bold text-lg mb-3">「国民の安心・安全と持続的な成長に向けた総合経済対策」を踏まえた事業者支援の徹底等について</h3>
        <p className="text-sm text-gray-600 mb-3">
          ソース元：<a 
            href="https://www.fsa.go.jp/news/r6/ginkou/20241128/yousei.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            金融庁
          </a>
        </p>
        
        <div className="text-sm space-y-3 overflow-y-auto max-h-96 pr-2">
          <p>
            官民の金融機関等におかれましては、累次にわたる要請等も踏まえ、事業者支援に着実に取り組んでいただいておりますことに感謝申し上げます。
          </p>
          <p>
            足元では、コロナ禍からの社会経済活動の正常化が進む中、物価高や人手不足等の影響により、依然として厳しい状況に置かれている事業者が数多く存在します。そのため、金融機関においては、資金需要の高まる年末、年度末に向けて、事業者の資金繰りに重大な支障が生じることのないよう、より一層の金融仲介機能の発揮が期待されます。加えて、事業者の経営課題が多様化する中、経営改善支援や事業再生支援、再チャレンジ支援等を先延ばしすることなく、事業者に寄り添いながら一歩先を見据えて取り組むことの必要性も、更に高まっていくと考えられます。
          </p>
          <p>
            こうした中、政府においては、11月22日に「国民の安心・安全と持続的な成長に向けた総合経済対策」を決定し、事業者の資金調達の円滑化等を図りつつ、その経営改善・事業再生・再チャレンジを支援するための各種施策を行っていくこととしたこと等を踏まえ、以下の事項について、改めて要請いたしますので、本日の「事業者支援の促進及び金融の円滑化に関する意見交換会」における要請事項等とあわせ、貴機関、貴協会会員金融機関等の経営層は勿論のこと、現場の第一線の職員等まで周知・徹底をお願いいたします。
          </p>
          
          <div className="font-bold mt-4">記</div>
          
          <div>
            <h4 className="font-bold mt-2">１．資金繰り支援</h4>
            <p>
              事業者への資金繰り支援について、物価高や人手不足等といった足元の経営環境の変化がある中、資金需要の高まる年末、年度末を迎えることを踏まえ、改めて、中小企業や小規模・零細企業、中小企業組合はもとより、中堅・大企業等も含めた事業者の業況を積極的に把握し、資金繰りの相談に丁寧に対応するなど、引き続き、事業者に寄り添ったきめ細かな支援を徹底すること。
            </p>
            <p>
              また、融資判断に当たっては、それぞれの事業者の現下の決算状況・借入状況や条件変更の有無等のみで機械的・硬直的に判断せず、事業の特性、各種支援施策の実施見込み等も踏まえ、経営改善につながるよう、丁寧かつ親身に対応すること。特に、各種補助金等の支給までの間に必要となる資金や、賃上げや生産性向上投資等の成長に要する資金等については、引き続き事業者の立場に立った柔軟な資金繰り支援を行うこと。
            </p>
            <p>
              日本政策金融公庫等においては、令和７年３月末まで申込期限が延長された「セーフティネット貸付（物価高騰対策）」等の活用を促進すること。
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mt-2">２．条件変更、借換え</h4>
            <p>
              既往債務の条件変更や借換え等について、引き続き、申込みを断念させるような対応を取らないことは勿論のこと、事業者に寄り添った迅速かつ柔軟な対応を継続すること。また、金利見直しの協議に際しては、金融機関が顧客企業に十分に説明を行うことはもとより、事業者の実情を踏まえ、必要に応じて適切な返済計画のアドバイスを行うこと。加えて、事業者の実情に応じて以下①．から③．までに掲げる施策も活用しつつ、その返済負担軽減を図ること。
            </p>
            <p>
              ①．日本政策金融公庫等による「新型コロナウイルス感染症特別貸付」等（本年12月末で申込終了）について、その用途の多くが借換えであることを踏まえて新たに措置する予定の「危機対応後経営安定貸付」
              <br />
              ②．経営改善・再生計画の策定を促した上で借換需要にも応える「経営改善サポート保証制度」について、「感染症対応型」の後継として新たに措置する予定の「経営改善・再生支援強化型」
              <br />
              ③．信用保証付融資の借換えに活用可能な、小規模事業者向けの「小口零細企業保証」（100%保証）や、認定経営革新等支援機関の支援がある場合に保証料を低減する「経営力強化保証」（80%保証）
            </p>
          </div>
          
          <p className="italic text-gray-500 mt-2">
            ※ 全文は<a 
              href="https://www.fsa.go.jp/news/r6/ginkou/20241128/yousei.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >金融庁ウェブサイト</a>でご確認ください。
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">2025年1月以降の中小企業向け資金繰り支援</h3>
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
