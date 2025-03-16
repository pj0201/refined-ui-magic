
import { toast } from "sonner";

// Dify用の型定義
declare global {
  interface Window {
    difyChatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
    DifyAI?: {
      toggleUI: (show: boolean) => void;
      isOpen: () => boolean;
      sendMessage: (message: string) => void;
    };
    // 小規模持続化補助金のDify用オブジェクト
    shoukiboJizokaChatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
    // 省力化投資補助金のDify用オブジェクト
    shorikika_chatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
  }
}

export const ChatbotInitializer = () => {
  /**
   * 一般的なDifyチャットボットを開く関数
   */
  const openChatbot = () => {
    try {
      console.log("一般的なDifyチャットボットを開きます");
      
      // チャットウィンドウをチェック
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("チャットウィンドウは既に表示されています");
        return;
      }
      
      // 一般的なDifyチャットボットを開く
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
      console.error("一般的なチャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  /**
   * 小規模持続化補助金チャットボットを開く関数
   */
  const startShoukiboJizokaChat = () => {
    try {
      console.log("小規模持続化補助金のチャットボットを開きます");
      
      // 小規模持続化補助金のチャットウィンドウをチェック
      const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 小規模持続化補助金のチャットボットを開く
      if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
        console.log("shoukiboJizokaChatbot APIを使用");
        window.shoukiboJizokaChatbot.toggle();
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.sendMessage === 'function') {
            window.shoukiboJizokaChatbot.sendMessage("小規模持続化補助金について教えてください");
          }
        }, 1000);
      } else {
        // 特定のボタンを探して手動でクリック
        console.log("小規模持続化補助金のボタンを手動でクリック");
        const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
        if (shoukiboButton && shoukiboButton instanceof HTMLElement) {
          shoukiboButton.click();
          
          // メッセージを送信（少し待機してから）
          setTimeout(() => {
            // チャットインプットを特定して入力
            const chatInput = document.querySelector('#shoukibo-jizoka-chatbot-window .dify-chatbot-input');
            if (chatInput && chatInput instanceof HTMLTextAreaElement) {
              chatInput.value = "小規模持続化補助金について教えてください";
              // 送信ボタンを自動でクリック
              const sendButton = document.querySelector('#shoukibo-jizoka-chatbot-window .dify-chatbot-send-button');
              if (sendButton && sendButton instanceof HTMLButtonElement) {
                sendButton.click();
              }
            }
          }, 1000);
        } else {
          throw new Error("小規模持続化補助金のチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("小規模持続化補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("小規模持続化補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  /**
   * 省力化投資補助金チャットボットを開く関数
   */
  const startShorikikaChat = () => {
    try {
      console.log("省力化投資補助金のチャットボットを開きます");
      
      // 省力化投資補助金のチャットウィンドウをチェック
      const chatWindow = document.getElementById('shorikika-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 省力化投資補助金のチャットボットを開く
      if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
        console.log("shorikika_chatbot APIを使用");
        window.shorikika_chatbot.toggle();
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shorikika_chatbot && typeof window.shorikika_chatbot.sendMessage === 'function') {
            window.shorikika_chatbot.sendMessage("省力化投資補助金について教えてください");
          }
        }, 1000);
      } else {
        // 特定のボタンを探して手動でクリック
        console.log("省力化投資補助金のボタンを手動でクリック");
        const shorikikaButton = document.getElementById('shorikika-chatbot-button');
        if (shorikikaButton && shorikikaButton instanceof HTMLElement) {
          shorikikaButton.click();
          
          // メッセージを送信（少し待機してから）
          setTimeout(() => {
            // チャットインプットを特定して入力
            const chatInput = document.querySelector('#shorikika-chatbot-window .dify-chatbot-input');
            if (chatInput && chatInput instanceof HTMLTextAreaElement) {
              chatInput.value = "省力化投資補助金について教えてください";
              // 送信ボタンを自動でクリック
              const sendButton = document.querySelector('#shorikika-chatbot-window .dify-chatbot-send-button');
              if (sendButton && sendButton instanceof HTMLButtonElement) {
                sendButton.click();
              }
            }
          }, 1000);
        } else {
          throw new Error("省力化投資補助金のチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("省力化投資補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };
  
  return { 
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat
  };
};
