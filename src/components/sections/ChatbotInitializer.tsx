
import { toast } from "sonner";

export const ChatbotInitializer = () => {
  /**
   * Difyチャットボットを開く関数
   */
  const openChatbot = () => {
    try {
      console.log("Difyチャットボットを開きます");
      
      // チャットウィンドウをチェック - 既に表示されていれば操作しない
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("チャットウィンドウは既に表示されています");
        return;
      }
      
      // Difyチャットボットを開く - 複数APIバージョンに対応
      if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
        console.log("difyChatbot APIを使用");
        window.difyChatbot.toggle();
      } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
        console.log("DifyAI APIを使用");
        window.DifyAI.toggleUI(true);
      } else {
        // 非常時にはデフォルトのボタンをクリック
        console.log("デフォルトの方法を使用");
        const difyButton = document.getElementById('dify-chatbot-bubble-button');
        if (difyButton && difyButton instanceof HTMLElement) {
          difyButton.click();
        } else {
          throw new Error("Difyのチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("チャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };
  
  /**
   * 特定の補助金についてチャットを開始する関数
   * @param topic 補助金の種類
   */
  const startSubsidyChat = (topic: string) => {
    try {
      // まずチャットボットを開く
      openChatbot();
      
      // チャットボットが開いたことを確認するために少し待機
      setTimeout(() => {
        console.log(`${topic}についてのチャットを開始します`);
        
        // メッセージ送信処理
        if (window.difyChatbot && typeof window.difyChatbot.sendMessage === 'function') {
          window.difyChatbot.sendMessage(`${topic}について教えてください`);
        } else if (window.DifyAI && typeof window.DifyAI.sendMessage === 'function') {
          window.DifyAI.sendMessage(`${topic}について教えてください`);
        } else {
          console.warn(`${topic}についてのメッセージを送信できませんでした`);
          toast.error("メッセージを送信できませんでした。チャットで直接質問してください。");
        }
      }, 800);
    } catch (error) {
      console.error(`${topic}についてのチャットを開始する際にエラーが発生しました:`, error);
    }
  };
  
  // 各補助金チャットを開始する特定関数
  const startShorikikaChat = () => startSubsidyChat("省力化投資補助金");
  const startShoukiboJizokaChat = () => startSubsidyChat("小規模持続化補助金");
  
  return { 
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat
  };
};
