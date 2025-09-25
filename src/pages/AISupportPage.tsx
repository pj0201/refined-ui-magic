import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Cpu, Brain, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const AISupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Helmet>
        <title>AI導入支援サポート | PLANNINGJOY株式会社</title>
        <meta name="description" content="AI活用で業務を変革。貴社の課題に合わせた最適なAIソリューションを提案します。神戸・兵庫のAI導入コンサルティング。" />
        <meta name="keywords" content="AI導入, DX, 研修, 業務効率化, 神戸, 兵庫, AIコンサルティング" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        {/* ナビゲーション */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ホームに戻る
          </Link>
        </div>

        {/* ヘッダーセクション */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI導入支援サポート
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI活用で業務を変革。貴社の課題に合わせた最適なAIソリューションを提案します
          </p>
        </div>

        {/* サービス概要 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI戦略策定</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                貴社のビジネス目標に合わせたAI活用戦略を策定し、具体的な導入計画を立案します。
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">AI導入・実装</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                最適なAIツールの選定から実装まで、技術的な課題をサポートし、スムーズな導入を実現します。
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">研修・定着支援</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                従業員向けのAI活用研修から運用定着まで、継続的にサポートいたします。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 支援内容詳細 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">AI活用コンサルティング</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">現状分析・課題抽出</h4>
                <p className="text-gray-600">業務プロセスを分析し、AI活用で効率化できる領域を特定します。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">ROI試算・効果予測</h4>
                <p className="text-gray-600">AI導入による投資対効果を具体的に試算し、導入効果を予測します。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">リスク評価・対策立案</h4>
                <p className="text-gray-600">AI導入に伴うリスクを評価し、適切な対策を立案します。</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">AI人材育成支援</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">AI基礎研修</h4>
                <p className="text-gray-600">AIの基本概念から実務での活用方法まで、段階的に学習をサポートします。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">実践ワークショップ</h4>
                <p className="text-gray-600">実際の業務でAIツールを使用する実践的なワークショップを開催します。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">継続的サポート</h4>
                <p className="text-gray-600">導入後も継続的にサポートし、AI活用レベルの向上を図ります。</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 導入事例 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">AI導入事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">製造業A社様</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-600">課題：</span>
                    <span className="text-gray-600">品質管理業務の効率化</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">解決：</span>
                    <span className="text-gray-600">AI画像解析による品質検査自動化</span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">効果：</span>
                    <span className="text-gray-600">検査時間50%削減、品質向上</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">サービス業B社様</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-blue-600">課題：</span>
                    <span className="text-gray-600">顧客対応業務の効率化</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">解決：</span>
                    <span className="text-gray-600">AIチャットボット導入</span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">効果：</span>
                    <span className="text-gray-600">問い合わせ対応時間30%削減</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">AI導入をお考えですか？</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            貴社の課題に合わせた最適なAI導入プランをご提案いたします。
            まずは無料相談で、AI活用の可能性を一緒に探りましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              無料相談を申し込む
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ai-tools">AIツール一覧を見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISupportPage;