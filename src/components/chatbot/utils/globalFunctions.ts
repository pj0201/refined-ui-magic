
import { toast } from "sonner";

/**
 * グローバル関数のセットアップ
 */
export const setupGlobalFunctions = () => {
  console.log("チャットボットグローバル関数を設定します");
  
  try {
    // 小規模持続化補助金チャットボットを開く関数
    window.startShoukiboJizokaChat = () => {
      console.log("小規模持続化補助金チャットボットを開きます");
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = [
          document.getElementById('shorikika-chatbot-window')
        ];

        otherWindows.forEach(window => {
          if (window && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shoukiboJizokaChatbot) {
          if (typeof window.shoukiboJizokaChatbot.open === 'function') {
            window.shoukiboJizokaChatbot.open();
          } else if (typeof window.shoukiboJizokaChatbot.toggle === 'function') {
            window.shoukiboJizokaChatbot.toggle();
          }
          
          // ウィンドウが表示されたか確認
          setTimeout(() => {
            const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
            if (chatWindow) {
              chatWindow.style.display = 'flex';
            }
          }, 500);
        } else {
          toast.error("小規模持続化補助金チャットボットが初期化されていません。ページを再読み込みしてください。");
        }
      } catch (error) {
        console.error("小規模持続化補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    };
    
    // 省力化投資補助金チャットボットを開く関数
    window.startShorikikaChat = () => {
      console.log("省力化投資補助金チャットボットを開きます");
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = [
          document.getElementById('shoukibo-jizoka-chatbot-window')
        ];

        otherWindows.forEach(window => {
          if (window && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shorikika_chatbot) {
          if (typeof window.shorikika_chatbot.open === 'function') {
            window.shorikika_chatbot.open();
          } else if (typeof window.shorikika_chatbot.toggle === 'function') {
            window.shorikika_chatbot.toggle();
          }
          
          // ウィンドウが表示されたか確認
          setTimeout(() => {
            const chatWindow = document.getElementById('shorikika-chatbot-window');
            if (chatWindow) {
              chatWindow.style.display = 'flex';
            }
          }, 500);
        } else {
          toast.error("省力化投資補助金チャットボットが初期化されていません。ページを再読み込みしてください。");
        }
      } catch (error) {
        console.error("省力化投資補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    };
    
    // 後方互換性のための関数もセット
    window.openSmallBusinessChatbot = window.startShoukiboJizokaChat;
    window.openSubsidyChatbot = window.startShorikikaChat;
    
    return true;
  } catch (error) {
    console.error("グローバル関数のセットアップ中にエラーが発生しました:", error);
    toast.error("チャットボット機能の初期化に失敗しました");
    return false;
  }
};
