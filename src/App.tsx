import { Suspense, useEffect, lazy } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

// ページコンポーネント
import Index from "./pages/Index";
import AIGlossary from "./pages/AIGlossary";
import AITools from "./pages/AITools";
import NotFound from "./pages/NotFound";

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

// チャットボット初期化コンポーネント
import { ChatbotInitializer } from "./components/chatbot/ChatbotInitializer";
// テスト用チャットウィンドウ
import BasicChatWindow from "./components/chat/BasicChatWindow";

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
  }, []);

  // テストチャットを開く関数
  const openTestChat = () => {
    console.log("テストチャットを開きます");
    if (typeof window.openBasicWindow === 'function') {
      window.openBasicWindow();
    } else {
      console.error("openBasicWindow関数が見つかりません");
      alert("テストチャットを開けません。ページを再読み込みしてください。");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          {/* チャットボット初期化コンポーネント - Suspenseの外に配置 */}
          <ChatbotInitializer />
          
          {/* テスト用のBasicChatWindow */}
          <BasicChatWindow title="テストチャット" />
          
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
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
          </Suspense>
          
          {/* テストチャットを開くボタン */}
          <button
            onClick={openTestChat}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#1C64F2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 1000,
            }}
          >
            テストチャットを開く
          </button>
          
          <Toaster position="top-right" />
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
