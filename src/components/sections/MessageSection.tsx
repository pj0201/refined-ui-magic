import { Card } from "@/components/ui/card";
import { useWordPressData } from "@/hooks/useWordPressData";

export const MessageSection = () => {
  const { messageData } = useWordPressData();

  return (
    <section id="message" className="py-20 px-4" style={{ background: 'linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#403E43]">メッセージ</h2>
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-[#aaadb0]/20" style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div 
              className="space-y-6 text-[#403E43] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: messageData?.content?.rendered || "" }}
            />
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                alt="Modern office interior" 
                className="rounded-xl shadow-2xl object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};