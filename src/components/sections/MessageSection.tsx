import { Card } from "@/components/ui/card";

export const MessageSection = () => {
  return (
    <section id="message" className="relative py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-[#8E9196] relative inline-block">
            メッセージ
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></span>
          </h2>
        </div>
        <Card className="p-12 bg-white/90 backdrop-blur-sm shadow-xl border-[#aaadb0]/20" style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-[#8E9196] leading-relaxed text-lg">
              <p className="first-letter:text-3xl first-letter:font-bold first-letter:mr-1">
                思いもよらなかったビジネスや経営モデル・働き方が生まれ、そのサイクルも早まっているのが特徴です。
              </p>
              <p>
                これらは、業種・業態だけに限らず、世界中で起こっている事実です。それらの中軸にあるのは、AIの進化。今後の未来はAIの活用からAIとの共存へ向かっていくものと考えられます。
              </p>
              <p>
                外部専門家として知見と経験のみならず、新たな知識やトレンドにアンテナを張り巡らせ、経営資源の効率化・最大化をサポートいたします。クライアント様の目指す方向や目的地、かけがえのない思いを大切に、ミッション達成に向けて弊社は全力を尽くします。
              </p>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                alt="Modern office interior" 
                className="rounded-xl shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
