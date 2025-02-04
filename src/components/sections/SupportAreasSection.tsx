import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SupportAreasSection = () => {
  return (
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
  );
};