import { Card } from "@/components/ui/card";

export const MessageSection = () => {
  return (
    <section id="message" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)' }}>
      <div className="max-w-4xl mx-auto space-y-8 fade-in">
        <h2 className="text-3xl font-bold text-center mb-12">メッセージ</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <p className="text-gray-700 leading-relaxed">時代の変化により人・金・物を経営資源とした時代から、情報や時消費・事消費と消費者がお金を使う領域は変化して来ました。</p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <p className="text-gray-700 leading-relaxed">思いもよらなかったビジネスや経営モデル・働き方が生まれ、そのサイクルも早まっているのが特徴です。</p>
            </Card>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
              alt="Professional workspace" 
              className="rounded-xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed">これらは、業種・業態だけに限らず、世界中で起こっている事実です。それらの中軸にあるのは、AIの進化。今後の未来はAIの活用からAIとの共存へ向かっていくものと考えられます。</p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed">外部専門家として知見と経験のみならず、新たな知識やトレンドにアンテナを張り巡らせ、経営資源の効率化・最大化をサポートいたします。クライアント様の目指す方向や目的地、かけがえのない思いを大切に、ミッション達成に向けて弊社は全力を尽くします。</p>
          </Card>
        </div>
      </div>
    </section>
  );
};