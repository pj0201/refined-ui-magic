import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SupportAreasSection = () => {
  return (
    <section id="services" className="relative py-20 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-700"
        style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1473177104440-ffee2f376098")`,
          filter: 'blur(16px) brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#243949]/95 to-[#517fa4]/95 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-4xl mx-auto fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">支援領域</h2>
        <p className="text-center text-xl mb-12 text-white"><strong>「経営のライフサイクルに寄り添う支援」</strong></p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "創業期支援",
              items: ["事業計画策定", "資金調達サポート"]
            },
            {
              title: "成長期支援",
              items: ["経営改善計画サポート", "補助金申請サポート", "業務効率化"]
            },
            {
              title: "成熟期支援",
              items: ["事業承継準備", "M&A相談", "事業再生"]
            }
          ].map((card, index) => (
            <Card key={index} className="bg-white/10 border-none backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="text-white text-center relative">
                  {card.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-white space-y-2">
                  {card.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="opacity-80 hover:opacity-100 transition-opacity duration-200">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};