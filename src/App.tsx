import { Toaster } from "@/components/ui/toaster";
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
import KeieishaHoshoPage from "./pages/plans/KeieishaHoshoPage";
import SafetyNetPage from "./pages/plans/SafetyNetPage";
import { ChatbotInitializer } from "./components/sections/ChatbotInitializer";
import { Suspense, useEffect } from "react";
import { Sonner } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // ChatbotInitializerをレンダリングして初期化
  useEffect(() => {
    // チャットボット初期化のログ
    console.log("App.tsx: チャットボット初期化を開始します");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          {/* チャットボット初期化コンポーネント */}
          <Suspense fallback={null}>
            <ChatbotInitializer />
          </Suspense>
          
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
            <Route path="/plans/keieisha-hosho" element={<KeieishaHoshoPage />} />
            <Route path="/plans/safety-net" element={<SafetyNetPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
        <Toaster />
        <Sonner position="top-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
