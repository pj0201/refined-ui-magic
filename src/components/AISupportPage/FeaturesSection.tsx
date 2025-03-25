
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Target, Brain } from 'lucide-react';

export const FeaturesSection = () => {
  return (
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
  );
};
