
import { toast } from "sonner";

export const ChatbotInitializer = () => {
  /**
   * チャットボットを開くシンプルな関数
   */
  const openChatbot = () => {
    // まず省力化投資補助金のチャットボタンを探す
    const shorikikaButton = document.getElementById('dify-chatbot-bubble-button-1');
    if (shorikikaButton && shorikikaButton instanceof HTMLElement) {
      shorikikaButton.click();
      return;
    }
    
    // 次に小規模持続化補助金のチャットボタンを探す
    const shoukiboButton = document.getElementById('dify-chatbot-bubble-button-2');
    if (shoukiboButton && shoukiboButton instanceof HTMLElement) {
      shoukiboButton.click();
      return;
    }
    
    // デフォルトのDifyチャットボタンを探す（フォールバック）
    const defaultChatButton = document.getElementById('dify-chatbot-bubble-button');
    if (defaultChatButton && defaultChatButton instanceof HTMLElement) {
      defaultChatButton.click();
      return;
    }
    
    // チャットボタンがない場合はエラーメッセージを表示
    toast.error("チャットボットを開けませんでした。しばらくしてからもう一度お試しください。");
  };

  return { openChatbot };
};
