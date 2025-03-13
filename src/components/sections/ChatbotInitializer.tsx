
import { toast } from "sonner";

export const ChatbotInitializer = () => {
  /**
   * チャットボットを開くシンプルな関数
   */
  const openChatbot = () => {
    // チャットボタンを探して、存在すれば直接クリック
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton && chatButton instanceof HTMLElement) {
      chatButton.click();
      return;
    }
    
    // チャットボタンがない場合はエラーメッセージを表示
    toast.error("チャットボットを開けませんでした。しばらくしてからもう一度お試しください。");
  };

  return { openChatbot };
};
