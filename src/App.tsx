
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIGlossary from "./pages/AIGlossary";
import AITools from "./pages/AITools";
import PosucoroPage from "./pages/plans/PosucoroPage";
import KeieiKaizenPage from "./pages/plans/KeieiKaizenPage";
import BCPPage from "./pages/plans/BCPPage";
import JigyouKeizokuPage from "./pages/plans/JigyouKeizokuPage";
import KeieiRyokuPage from "./pages/plans/KeieiRyokuPage";
import SentanSetsubiPage from "./pages/plans/SentanSetsubiPage";
import KeieiKakushinPage from "./pages/plans/KeieiKakushinPage";
import DDSPage from "./pages/plans/DDSPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-glossary" element={<AIGlossary />} />
            <Route path="/ai-tools" element={<AITools />} />
            
            <Route path="/plans/posucoro" element={<PosucoroPage />} />
            <Route path="/plans/keiei-kaizen" element={<KeieiKaizenPage />} />
            <Route path="/plans/bcp" element={<BCPPage />} />
            <Route path="/plans/jigyou-keizoku" element={<JigyouKeizokuPage />} />
            <Route path="/plans/keiei-ryoku" element={<KeieiRyokuPage />} />
            <Route path="/plans/sentan-setsubi" element={<SentanSetsubiPage />} />
            <Route path="/plans/keiei-kakushin" element={<KeieiKakushinPage />} />
            <Route path="/plans/dds" element={<DDSPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
