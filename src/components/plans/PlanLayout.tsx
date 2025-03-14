
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PlanLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  imageUrl?: string;
}

export const PlanLayout = ({ title, subtitle, children, imageUrl }: PlanLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 fade-in">
        <Link to="/#business-plans">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
        </Link>

        <div className="bg-white rounded-xl shadow-md">
          {imageUrl && (
            <div className="w-full h-64 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-xl text-gray-600 mb-6">{subtitle}</p>}
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
