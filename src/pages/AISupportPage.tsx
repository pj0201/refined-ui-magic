
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  BookOpen, 
  Users, 
  Sparkles, 
  ArrowLeft,
  Bot,
  Target,
  LineChart,
  Code,
  LayoutDashboard
} from 'lucide-react';

const AISupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 relative">
      {/* AI背景要素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <img 
          src="/lovable-uploads/48c4d18a-f636-4c33-8562-63034fb88968.png" 
          alt="" 
          className="absolute top-20 right-10 w-64 h-64 object-contain"
        />
        <img 
          src="/lovable-uploads/215b3cb0-0a3f-4bb3-bdca-bedabb486622.png" 
          alt="" 
          className="absolute bottom-40 left-10 w-48 h-48 object-contain"
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-10"></div>
      </div>
      
      <Helmet>
        <title>AI導入支援サポート | PLANNINGJOY株式会社</title>
        <meta name="description" content="企業のAI活用をサポートします。研修や勉強会なども行います。業種業態に応じた非属人化、省力化、自動化を支援します。" />
      </Helmet>

      {/* ヘッダー */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-800 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto py-10 px-4 relative z-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <div className="inline-block p-2 bg-purple-100 rounded-full text-purple-700 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            AI導入支援サポート
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            AI活用で業務を変革。<br />
            貴社の課題に合わせた最適なAIソリューションを提案します。
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-8">
            <p className="text-gray-700 text-lg">経済産業省DX調査によると<span className="font-bold text-purple-700">2026年までに70%以上の企業</span>がAIを業務に導入予定</p>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">AI導入支援サービスの特徴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* カード1 */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Bot className="h-8 w-8 text-purple-500" />
                <div>
                  <CardTitle>業務課題に特化</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  御社の業種・業態に応じた課題解決に特化したAI活用方法をご提案します。汎用的なツール紹介ではなく、貴社固有の課題に寄り添います。
                </CardDescription>
              </CardContent>
            </Card>

            {/* カード2 */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Target className="h-8 w-8 text-purple-500" />
                <div>
                  <CardTitle>段階的な導入支援</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  トライアル導入から本格活用まで、段階的にサポート。初期投資を抑えながら効果を検証し、最適なAI活用方法を見つけます。
                </CardDescription>
              </CardContent>
            </Card>

            {/* カード3 */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Brain className="h-8 w-8 text-purple-500" />
                <div>
                  <CardTitle>AIセミナー</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  全階層の方を対象としたAIセミナーを開催。AIリテラシーを高め、自社内でのAI活用スキルを育成します。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* サービス内容セクション */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">サービス内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* サービス1 */}
            <div className="flex gap-4">
              <div className="bg-purple-100 p-3 h-fit rounded-full">
                <LayoutDashboard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI導入コンサルティング</h3>
                <p className="text-gray-600">
                  現状分析から導入計画の策定、ツール選定、運用サポートまで一貫して支援します。補助金申請サポートも可能です。
                </p>
              </div>
            </div>

            {/* サービス2 */}
            <div className="flex gap-4">
              <div className="bg-purple-100 p-3 h-fit rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AIセミナー</h3>
                <p className="text-gray-600">
                  あらゆる階層の方を対象としたAIセミナーを開催。AIの基礎から実践的な活用方法まで学べます。
                </p>
              </div>
            </div>

            {/* サービス3 */}
            <div className="flex gap-4">
              <div className="bg-purple-100 p-3 h-fit rounded-full">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI活用ツール開発</h3>
                <p className="text-gray-600">
                  御社の業務に特化したAIツールの開発をサポート。既存システムとの連携も可能です。
                </p>
              </div>
            </div>

            {/* サービス4 */}
            <div className="flex gap-4">
              <div className="bg-purple-100 p-3 h-fit rounded-full">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">効果測定・改善支援</h3>
                <p className="text-gray-600">
                  AI導入後の効果測定と継続的な改善をサポート。KPI設定から運用改善まで伴走します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* セミナー事例セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">セミナー事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 事例1 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>小売業K社</CardTitle>
                <CardDescription className="text-base font-medium">ターゲット層ごとのAI活用</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  営業系と事務系で活用方法が分かれたため、AIの一般知識からスタート。ある程度認識を進めたあとで、業務に活用できるAI勉強会を開催しました。
                </p>
              </CardContent>
            </Card>

            {/* 事例2 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>介護業S社</CardTitle>
                <CardDescription className="text-base font-medium">非属人化と業務負担軽減</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  事務業務の非属人化と負担軽減をテーマに勉強会を開催。現状と近い将来の課題を抽出し共有のために言語化。経営幹部も交えて、AIを活用したワークフロー作成までサポートしました。
                </p>
              </CardContent>
            </Card>

            {/* 事例3 - 追加 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>サービス業H社</CardTitle>
                <CardDescription className="text-base font-medium">幹部向け販促活用セミナー</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  幹部対象の販促に使うAIセミナーを開催。各生成AIの特徴や活用方法について、ハンズオンで各自が学びながら作成した成果物で、よりAIツールの認識を深めました。
                </p>
              </CardContent>
            </Card>

            {/* 事例4 - 追加 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>サービス業界幹部向け</CardTitle>
                <CardDescription className="text-base font-medium">実践的AI活用講座</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  生成AIとデータ分析・収集について複数回に分けて開催。ケースに応じたAIツールをハンズオン形式で進行。実戦的な内容で参加者の満足度アンケートはすべて「役に立つ内容だった」との評価をいただきました。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTAセクション - 末尾に移動 */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">AI導入の第一歩を踏み出しませんか？</h2>
          <p className="text-xl mb-8">
            まずは無料相談から。御社の課題に合わせたAI活用方法をご提案します。
          </p>
          <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
            お問い合わせはこちら
          </Button>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
          <p className="mt-2">神戸・兵庫を拠点に、AI活用した経営コンサルティングを提供</p>
        </div>
      </footer>
    </div>
  );
};

export default AISupportPage;
