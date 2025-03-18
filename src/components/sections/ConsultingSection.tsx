import React from 'react';

export const ConsultingSection = () => {
  return (
    <section id="consulting" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto fade-in">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="inline-block">AIに強い</span>
          <br className="xs:inline sm:hidden" />
          <span className="inline-block">経営コンサルティング</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <div className="consulting-text text-lg leading-relaxed space-y-4">
              <p>
                時代の変化により人・金・物を経営資源とした時代から、情報や時消費・事消費と消費者がお金を使う領域は変化して来ました。
              </p>
              <p>
                思いもよらなかったビジネスや経営モデル・働き方が生まれ、そのサイクルも早まっているのが特徴です。
              </p>
              <p>
                これらは、業種・業態だけに限らず、世界中で起こっている事実です。それらの中軸にあるのは、<strong>AIの進化</strong>。今後の未来はAIの活用からAIとの共存へ向かっていくものと考えられます。
              </p>
              <p>
                極端に減少している１０代以下の人口から、日本の少子高齢化、人手不足に対応するためには、省力化や自動化は避けられない現実なのです。
              </p>
              <p>
                外部専門家として知見と経験のみならず、新たな知識やトレンドにアンテナを張り巡らせ、経営資源の効率化・最大化をサポートいたします。神戸・兵庫を拠点に、クライアント様の目指す方向や目的地、かけがえのない思いを大切に、ミッション達成に向けて弊社は全力を尽くします。
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="神戸・兵庫でのAI駆動型経営コンサルティング" 
              className="rounded-xl shadow-lg w-full object-cover h-60"
            />
            <img 
              src="https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
              alt="データ分析とAI実装による業務効率化" 
              className="rounded-xl shadow-lg w-full object-cover h-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
