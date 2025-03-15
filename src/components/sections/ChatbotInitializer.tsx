
import { toast } from "sonner";
import { openChatbot as subsidyChatbotOpen } from "@/components/SubsidyChat/SubsidyChatbot";

export const ChatbotInitializer = () => {
  /**
   * チャットボットを開く関数
   * 複数回クリックや不安定な状態に備える
   */
  const openChatbot = () => {
    try {
      // ダブルクリック防止のため、わずかに遅延
      setTimeout(() => {
        // SubsidyChatbot の実装を使用
        subsidyChatbotOpen();
        
        // 万が一チャットボットが開かない場合のフォールバック
        setTimeout(() => {
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (!chatWindow || window.getComputedStyle(chatWindow).display === 'none') {
            console.log("通常の方法でチャットボットが開けませんでした。代替手段を試みます。");
            
            // Difyの直接APIを試す
            if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
              window.difyChatbot.toggle();
            } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
              window.DifyAI.toggleUI(true);
            }
          }
        }, 500);
      }, 100);
    } catch (error) {
      console.error("チャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  return { openChatbot };
};
