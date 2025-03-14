
import { PlanLayout } from "@/components/plans/PlanLayout";
import { OverviewSection } from "@/components/plans/keieisha-hosho/OverviewSection";
import { FinancialDataSection } from "@/components/plans/keieisha-hosho/FinancialDataSection";
import { ResourcesSection } from "@/components/plans/keieisha-hosho/ResourcesSection";

const KeieishaHoshoPage = () => {
  return (
    <PlanLayout 
      title="経営者保証に関するガイドライン" 
      imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
    >
      <OverviewSection />
      <FinancialDataSection />
      <ResourcesSection />
    </PlanLayout>
  );
};

export default KeieishaHoshoPage;
