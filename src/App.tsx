
import { Suspense, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

// ページコンポーネント
import Index from "./pages/Index";
import AIGlossary from "./pages/AIGlossary";
import AITools from "./pages/AITools";
import AISupportPage from "./pages/AISupportPage";
import NotFound from "./pages/NotFound";
import FAQPage from "./pages/FAQPage";

// プランページ
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

// 管理者ページ
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// チャットボット初期化コンポーネント
import { ChatbotInitializer } from "./components/chatbot/ChatbotInitializer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分
    },
  },
});

function App() {
  // チャットボットの初期化
  useEffect(() => {
    console.log("App: チャットボットの初期化を開始します");
    
    // DOMContentLoadedイベントが既に発生している場合は直接初期化
    if (document.readyState === 'complete' && typeof window.initChatbots === 'function') {
      console.log("App: DOMContentLoadedイベントが既に発生しているため、直接初期化します");
      window.initChatbots();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          {/* チャットボット初期化コンポーネント - Suspenseの外に配置 */}
          <ChatbotInitializer />
          
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/ai-glossary" element={<AIGlossary />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/ai-support" element={<AISupportPage />} />
              <Route path="/faq" element={<FAQPage />} />
              
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
              
              {/* 管理者ルート */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          
          <Toaster position="top-right" />
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
