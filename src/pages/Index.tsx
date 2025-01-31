import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80")',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center text-white space-y-6 fade-in">
          <h1 className="text-5xl font-bold mb-4">
            創業から承継まで<br />
            経営の羅針盤
          </h1>
          <p className="text-2xl mb-2">
            PLANNINGJOY株式会社<br />
            経済産業省認定 経営革新等支援機関
          </p>
          <p className="text-xl">
            「生産性と資産に寄与する経営コンサルティング」
          </p>
          <Button 
            variant="outline" 
            className="mt-8 text-white border-white hover:bg-white hover:text-gray-900"
            onClick={() => document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })}
          >
            メッセージを見る
          </Button>
        </div>
      </section>

      {/* Message Section with new gradient background */}
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

      {/* Company Profile Section with new design */}
      <section id="about-us" className="py-20 px-4" style={{ background: 'linear-gradient(to right, #243949 0%, #517fa4 100%)' }}>
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">会社概要</h2>
          <div className="space-y-4 text-white">
            <p><strong>代表者：</strong>堀上 亮（経産省認定経営コンサルタント）</p>
            <p><strong>所在地：</strong>〒651-0084 兵庫県神戸市中央区磯辺通1-1-18 カサベラ国際プラザビル707号室</p>
            <p><strong>連絡先：</strong>TEL 090-3943-8853 / MAIL hori@planjoy.net</p>
          </div>
        </div>
      </section>

      {/* Support Areas Section */}
      <section id="services" className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">支援領域</h2>
          <p className="text-center text-xl mb-8"><strong>「経営のライフサイクルに寄り添う支援」</strong></p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">創業期支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>事業計画策定</li>
                  <li>資金調達サポート</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">成長期支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>経営改善計画サポート</li>
                  <li>補助金申請サポート</li>
                  <li>業務効率化</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">成熟期支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>事業承継準備</li>
                  <li>M&A相談</li>
                  <li>事業再生</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section with new design */}
      <section id="features" className="py-20 px-4" style={{ background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)' }}>
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">特徴</h2>
          <p className="text-center text-xl mb-8">「公的支援の専門家として」</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <ul className="space-y-4 list-disc list-inside">
                <li>経産省認定機関のネットワーク活用</li>
                <li>行政要件を熟知した計画策定</li>
                <li>継続的な改善サイクルの構築</li>
                <li>多様な経営課題への横断的対応</li>
              </ul>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Professional workspace" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section id="service-details" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">サービス詳細</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">経営計画策定支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>経営改善計画（405事業）</li>
                  <li>早期経営改善計画（ポストコロナ対応）</li>
                  <li>事業再生計画 他</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">資金調達支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>補助金/助成金申請代行</li>
                  <li>金融機関向け事業計画書作成</li>
                  <li>財務状況分析</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">事業継承支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>3年・5年・10年単位の段階的プラン作成</li>
                  <li>税務・法務専門家との連携体制</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardHeader>
                <CardTitle className="text-white">業務改善支援</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>AI活用業務フロー改善（効率化や自動化）</li>
                  <li>営業管理システム構築</li>
                  <li>WEB活用戦略立案</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation Flow Section */}
      <section id="flow" className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">相談の流れ</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {["お問い合わせ（フォーム/電話）", "無料面談（60分・Zoom可）", "課題整理と支援プラン提示", "契約後サポート開始"].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-white text-blue-900 flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">よくあるご質問</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>どういう支援サービスですか？</CardTitle>
              </CardHeader>
              <CardContent>
                定期訪問やオブザーバー参加など以外にスポットでの対応も可能。再生など一刻を争う場合には、柔軟に対応いたします。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>創業前でも相談可能ですか？</CardTitle>
              </CardHeader>
              <CardContent>
                事業構想段階からのご相談を推奨しています。
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>地方企業でも対応可能？</CardTitle>
              </CardHeader>
              <CardContent>
                オンライン相談で全国対応いたします（北海道・関東一円・関西・中国・九州地域に在住し支援した実績あり）。
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section with updated design */}
      <section id="contact" className="py-20 px-4" style={{ background: 'linear-gradient(to right, #243949 0%, #517fa4 100%)' }}>
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold mb-8 text-white">お問い合わせ</h2>
          <p className="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。</p>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-gray-900"
            onClick={() => window.location.href = 'mailto:hori@planjoy.net'}
          >
            メールでのお問い合わせ
          </Button>
        </div>
      </section>

      {/* Footer with matching design */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
      </footer>
    </div>
  );
};

export default Index;
