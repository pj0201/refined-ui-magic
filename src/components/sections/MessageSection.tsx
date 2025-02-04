import { Card } from "@/components/ui/card";

export const MessageSection = () => {
  return (
    <section id="message" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)' }}>
      <div className="max-w-4xl mx-auto space-y-6 fade-in">
        <h2 className="text-3xl font-bold text-center mb-8">メッセージ</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-gray-700">時代の変化により人・金・物を経営資源とした時代から、情報や時消費・事消費と消費者がお金を使う領域は変化して来ました。</p>
            <p className="text-gray-700">昨今のAIの驚異的な進化一方で、思いもよらなかったビジネスや経営スタイル・働き方が生まれる時代となっています。</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="Technology" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <p className="text-gray-700">その一方で中央集権型に代表される、多くの企業の凋落が始まっています。</p>
        <p className="text-gray-700">弊社は、おもに中小企業専門中心、商店や自営業など街に根付いたビジネスを専門にご支援させていただいていますが、どのような業種・業態でもAIの活用（AIとの共生）が生き残りの鍵だと考えています。</p>
        <p className="text-gray-700">外部専門家として、知見と経験のみならず新たな知識やトレンドにアンテナを張り巡らせ。経営資源の効率化・最大化をサポート。進める方向や目的地・思いを大切にミッション達成に尽力させていただきます。</p>
      </div>
    </section>
  );
};