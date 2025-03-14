
import { PlanLayout } from "@/components/plans/PlanLayout";
import { NotificationSection } from "@/components/plans/safety-net/NotificationSection";
import { OverviewSection } from "@/components/plans/safety-net/OverviewSection";
import { LoanDetailsSection } from "@/components/plans/safety-net/LoanDetailsSection";
import { ResourcesSection } from "@/components/plans/safety-net/ResourcesSection";
import { FuturePlansSection } from "@/components/plans/safety-net/FuturePlansSection";

const SafetyNetPage = () => {
  return (
    <PlanLayout 
      title="危機対応後経営安定資金（セーフティネット貸付）" 
      imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    >
      <NotificationSection />
      <OverviewSection />
      <LoanDetailsSection />
      <ResourcesSection />
      <FuturePlansSection />
    </PlanLayout>
  );
};

export default SafetyNetPage;
