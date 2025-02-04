import { Card } from "@/components/ui/card";

export const MessageSection = () => {
  return (
    <section id="message" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8E9196]">メッセージ</h2>
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-[#aaadb0]/20" style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-[#8E9196] leading-relaxed">
              <p>
                思いもよらなかったビジネスや経営モデル・働き方が生まれ、そのサイクルも早まっているのが特徴です。
              </p>
              <p>
                これらは、業種・業態だけに限らず、世界中で起こっている事実です。それらの中軸にあるのは、AIの進化。今後の未来はAIの活用からAIとの共存へ向かっていくものと考えられます。
              </p>
              <p>
                外部専門家として知見と経験のみならず、新たな知識やトレンドにアンテナを張り巡らせ、経営資源の効率化・最大化をサポートいたします。クライアント様の目指す方向や目的地、かけがえのない思いを大切に、ミッション達成に向けて弊社は全力を尽くします。
              </p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                alt="Professional workspace" 
                className="rounded-xl shadow-2xl object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};