
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>よくあるご質問 | PLANNINGJOY株式会社</title>
        <meta name="description" content="神戸・兵庫の経営コンサルティング会社、PLANNINGJOY株式会社によくある質問と回答をまとめました。" />
      </Helmet>

      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">よくあるご質問</h1>
        
        {/* 質問カテゴリー：補助金について */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">補助金について</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                小規模事業者持続化補助金とは何ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                小規模事業者持続化補助金は、小規模事業者が行う販路開拓や新たなビジネスモデルの構築など、持続的な経営に向けた取り組みを支援する制度です。
                上限額や補助率は公募回により異なりますが、一般的に50万円～200万円の範囲で、補助率は2/3となっています。
                詳細については、お気軽にチャットボットでお問い合わせください。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                省力化投資補助金の対象となる設備は何ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                省力化投資補助金（生産性向上投資促進税制）の対象となる設備には、機械装置、器具備品、建物附属設備、ソフトウェアなどがあります。
                具体的な要件や対象設備については、補助金の種類や公募要領によって異なるため、チャットボットで詳細をお問い合わせいただくか、専門家にご相談ください。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                補助金の申請から採択までどのくらいの期間がかかりますか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                補助金の種類や公募回によって異なりますが、一般的に申請から採択結果発表まで2～3ヶ月程度かかることが多いです。
                また、採択後の交付申請から補助金の支払いまでにも数ヶ月かかるため、資金計画には余裕を持っておくことをおすすめします。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* 質問カテゴリー：AI導入について */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">AI導入について</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                AI導入にはどのくらいのコストがかかりますか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                AI導入のコストは、導入する目的や規模、使用するツールによって大きく異なります。
                汎用的なAIツールを活用する場合は月額数千円から利用可能なものもありますが、
                カスタマイズされたAIソリューションの開発には数十万円から数百万円のコストがかかることもあります。
                まずは無料相談で、御社に最適なAI導入プランをご提案いたします。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                AIセミナーはどのような内容ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                当社のAIセミナーは、AI技術の基礎知識から実践的な業務活用方法まで、様々なレベルに対応しています。
                ChatGPTなどの生成AIの活用法、業務効率化のためのAIツール紹介、
                具体的な業務課題に対するAI活用事例の紹介など、参加者のニーズに合わせた内容をご用意しています。
                オンラインセミナーと対面セミナーの両方に対応しており、企業向けのカスタマイズも可能です。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                AI導入に必要なITスキルはどの程度必要ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                最近のAIツールは非常に使いやすく設計されており、基本的なPCスキルがあれば十分に活用できるものが増えています。
                当社では、ITスキルの高くない方でも安心して活用できるAIツールの選定や、
                社内でのAI活用を促進するための研修プログラムも提供しています。
                段階的な導入と教育により、スムーズなAI活用を実現します。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* 質問カテゴリー：経営相談について */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-700">経営相談について</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            <AccordionItem value="item-7">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                初回相談は無料ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                はい、初回の経営相談は無料で承っております。
                お客様の課題やニーズをしっかりと把握させていただき、
                最適なサポート方法をご提案いたします。
                お気軽にお問い合わせください。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                神戸・兵庫以外の地域でもサポート可能ですか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                はい、オンラインでのコンサルティングやサポートを行っておりますので、
                神戸・兵庫以外の地域のお客様にもご利用いただけます。
                また、必要に応じて出張訪問も可能ですので、お気軽にご相談ください。
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                どのような業種に対応していますか？
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-gray-700">
                製造業、小売業、サービス業、IT業界など、幅広い業種のお客様にサポートを提供しております。
                業種特有の課題や市場動向を把握し、それぞれの業界に最適な解決策をご提案いたします。
                これまでの実績や事例については、お問い合わせいただければ詳しくご案内いたします。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
          <p className="mt-2">神戸・兵庫を拠点に、AI活用した経営コンサルティングを提供</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;
