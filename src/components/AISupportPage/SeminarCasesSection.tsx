
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const SeminarCasesSection = () => {
  return (
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

        {/* 事例3 */}
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

        {/* 事例4 */}
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
  );
};
