
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, ChartBar, Shield, Building, Cog, Server, Briefcase, DollarSign, ArrowRight, UserCheck, Banknote
} from "lucide-react";
import { Link } from "react-router-dom";

const planData = [
  {
    id: "posucoro",
    title: "早期経営改善計画策定支援事業",
    subtitle: "（通称：ポスコロ）",
    icon: <ChartBar className="w-10 h-10 text-blue-600" />,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    color: "bg-blue-50 hover:bg-blue-100"
  },
  {
    id: "keiei-kaizen",
    title: "経営改善計画策定支援",
    subtitle: "（通称：405事業）",
    icon: <FileText className="w-10 h-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    color: "bg-green-50 hover:bg-green-100"
  },
  {
    id: "bcp",
    title: "BCP",
    subtitle: "（事業継続計画）",
    icon: <Shield className="w-10 h-10 text-red-600" />,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    color: "bg-red-50 hover:bg-red-100"
  },
  {
    id: "jigyou-keizoku",
    title: "事業継続力強化計画",
    icon: <Building className="w-10 h-10 text-orange-600" />,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    color: "bg-orange-50 hover:bg-orange-100"
  },
  {
    id: "keiei-ryoku",
    title: "経営力向上計画",
    icon: <Cog className="w-10 h-10 text-purple-600" />,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    color: "bg-purple-50 hover:bg-purple-100"
  },
  {
    id: "sentan-setsubi",
    title: "先端設備等導入計画",
    icon: <Server className="w-10 h-10 text-indigo-600" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    color: "bg-indigo-50 hover:bg-indigo-100"
  },
  {
    id: "keiei-kakushin",
    title: "経営革新計画",
    icon: <Briefcase className="w-10 h-10 text-yellow-600" />,
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
    color: "bg-yellow-50 hover:bg-yellow-100"
  },
  {
    id: "dds",
    title: "DDS（資本性劣後ローン）",
    icon: <DollarSign className="w-10 h-10 text-emerald-600" />,
    image: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04",
    color: "bg-emerald-50 hover:bg-emerald-100"
  },
  {
    id: "keieisha-hosho",
    title: "経営者保証に関するガイドライン",
    icon: <UserCheck className="w-10 h-10 text-cyan-600" />,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    color: "bg-cyan-50 hover:bg-cyan-100"
  },
  {
    id: "safety-net",
    title: "危機対応後経営安定資金",
    subtitle: "（セーフティネット貸付）",
    icon: <Banknote className="w-10 h-10 text-blue-600" />,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    color: "bg-blue-50 hover:bg-blue-100"
  }
];

export const BusinessPlansSection = () => {
  return (
    <section id="business-plans" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto fade-in">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <span className="inline-block">計画策定で</span>
          <br className="xs:inline sm:hidden" />
          <span className="inline-block">公的な制度活用へ</span>
        </h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          以下の計画については、「融資」「税制」「保険」「補助金の加点」など、経営における様々なメリットがございます。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {planData.map((plan) => (
            <Link to={`/plans/${plan.id}`} key={plan.id}>
              <Card className={`h-full transition-all duration-300 ${plan.color} border-t-4 hover:shadow-lg`} style={{ borderTopColor: plan.id === "posucoro" ? "#3b82f6" : plan.id === "keiei-kaizen" ? "#22c55e" : plan.id === "bcp" ? "#ef4444" : plan.id === "jigyou-keizoku" ? "#f97316" : plan.id === "keiei-ryoku" ? "#a855f7" : plan.id === "sentan-setsubi" ? "#6366f1" : plan.id === "keiei-kakushin" ? "#eab308" : "#10b981" }}>
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      {plan.subtitle && <p className="text-sm text-gray-600">{plan.subtitle}</p>}
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end items-center">
                    <span className="text-sm font-medium">詳細を見る</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
