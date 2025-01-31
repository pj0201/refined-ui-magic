import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80")',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center text-white fade-in">
          <h1 className="text-5xl font-bold mb-4">認定経営革新等支援機関</h1>
          <p className="text-xl max-w-2xl mx-auto">専門的知識と実務経験を活かし、中小企業の経営課題を解決します</p>
        </div>
      </section>

      {/* Support Process Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">支援の流れ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="fade-in hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="経営課題の把握"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>経営課題の把握</CardTitle>
              <CardDescription>財務分析、経営課題の抽出を行います</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">専門家による詳細な分析と、具体的な課題の特定を行います。</p>
            </CardContent>
          </Card>

          <Card className="fade-in hover:shadow-lg transition-shadow delay-100">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="事業計画策定"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>事業計画策定</CardTitle>
              <CardDescription>具体的な改善計画を立案します</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">経営状況に応じた実行可能な計画を策定し、実現までサポートします。</p>
            </CardContent>
          </Card>

          <Card className="fade-in hover:shadow-lg transition-shadow delay-200">
            <CardHeader>
              <div className="h-48 mb-4 overflow-hidden rounded-t-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                  alt="モニタリング"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>モニタリング</CardTitle>
              <CardDescription>継続的な支援とフォローアップ</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">定期的な進捗確認と必要に応じた計画の見直しを行います。</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Programs Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">支援プログラム</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="fade-in">
              <CardHeader>
                <CardTitle>経営改善計画策定支援事業</CardTitle>
                <CardDescription>金融支援を伴う経営改善が必要な中小企業・小規模事業者向け</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>経営改善計画策定支援</li>
                  <li>モニタリング支援</li>
                  <li>金融支援アドバイス</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="fade-in delay-100">
              <CardHeader>
                <CardTitle>先端設備導入計画</CardTitle>
                <CardDescription>生産性向上のための設備投資を検討している事業者向け</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>設備投資計画の策定支援</li>
                  <li>補助金申請サポート</li>
                  <li>導入後のフォローアップ</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold mb-6">経営課題の解決に向けて</h2>
          <p className="mb-8 text-gray-300">まずはお気軽にご相談ください。経験豊富な専門家が対応いたします。</p>
          <button 
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => window.location.href = 'mailto:contact@example.com'}
          >
            無料相談を予約する
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;