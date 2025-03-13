
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const SupportAreasSection = () => {
  return (
    <section 
      id="services" 
      className="py-20 px-4 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/lovable-uploads/71495eec-e710-4eb5-be8f-effbfdca6c45.png')",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay to make the background image subtle */}
      <div className="absolute inset-0 bg-[#F1F0FB]/90"></div>
      
      <div className="max-w-4xl mx-auto fade-in relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#403E43]">支援領域</h2>
        <p className="text-center text-xl mb-12 text-[#403E43]"><strong>「経営のライフサイクルに寄り添う支援」</strong></p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/90 border-gray-200/20 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#403E43] text-center">創業期支援</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-[#403E43] space-y-2">
                <li>事業計画策定サポート</li>
                <li>資金調達サポート</li>
                <li>機器・ツール・物件の調査</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white/90 border-gray-200/20 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#403E43] text-center">成長期支援</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-[#403E43] space-y-2">
                <li>経営改善計画サポート</li>
                <li>補助金申請サポート</li>
                <li>業務効率化</li>
              </ul>
            </CardContent>
          </Card>
          <Card className={cn(
            "bg-white/90 border-gray-200/20 backdrop-blur-sm hover:bg-white/95",
            "transition-all duration-300 shadow-lg hover:shadow-xl"
          )}>
            <CardHeader>
              <CardTitle className="text-[#403E43] text-center">成熟期支援</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-[#403E43] space-y-2">
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
