
import { useEffect } from "react";
import { toast } from "sonner";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // 初期化状態
  useEffect(() => {
    console.log("チャットボット初期化を開始します");

    // DifyスクリプトとAPIの状態を確認
    const checkDifyAPI = async () => {
      try {
        const response = await fetch('https://api.dify.ai/health', {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          console.log("Dify API接続確認: 成功");
        } else {
          console.error(`Dify API接続確認: 失敗 (${response.status})`);
          toast.error("チャットボットサーバーに接続できません。しばらく待ってからお試しください。", {
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Dify API接続確認中にエラー発生:", error);
      }
    };
    
    // APIの状態確認を実行
    checkDifyAPI();
    
    // グローバル関数の設定（カスタムフックから提供される関数を使用）
    window.openChatbot = () => {
      console.log("一般チャットボットを開きます");
      if (window.difyChatbot) {
        if (typeof window.difyChatbot.open === 'function') {
          window.difyChatbot.open();
        } else if (typeof window.difyChatbot.toggle === 'function') {
          window.difyChatbot.toggle();
        }
      } else {
        toast.error("チャットボットが読み込まれていません。ページを再読み込みしてください。");
      }
    };
    
    window.startShoukiboJizokaChat = () => {
      console.log("小規模持続化補助金チャットボットを開きます");
      // 実装はchatWindowsに移動
    };
    
    window.startShorikikaChat = () => {
      console.log("省力化投資補助金チャットボットを開きます");
      // 実装はchatWindowsに移動
    };
    
    // スタイル設定 - シンプルな方法で実装
    const setupStyles = () => {
      // 既存のスタイル要素がある場合は削除
      const existingStyle = document.getElementById('dify-chat-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // 新しいスタイル要素を作成
      const style = document.createElement('style');
      style.id = 'dify-chat-styles';
      style.textContent = `
        /* チャットウィンドウのスタイル */
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window,
        [class*="dify-chatbot-bubble-window"] {
          width: 380px !important;
          height: 600px !important;
          max-height: 80vh !important;
          max-width: calc(100vw - 40px) !important;
          bottom: 20px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
          transform: none !important;
          margin-bottom: 0 !important;
          z-index: 99995 !important;
          position: fixed !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          border-radius: 10px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
          background-color: #fff !important;
        }
        
        /* Difyのブランディングを非表示 */
        .dify-chatbot-bubble-window-footer,
        [class*="dify"] [class*="footer"],
        [class*="powered-by"],
        a[href*="dify.ai"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      console.log("チャットボットスタイルを設定しました");
    };
    
    // スタイルを設定
    setupStyles();
    
    // クリーンアップ関数
    return () => {
      // グローバル関数のクリーンアップ
      window.openChatbot = undefined;
      window.startShoukiboJizokaChat = undefined;
      window.startShorikikaChat = undefined;
    };
  }, []);
  
  // このコンポーネントは何も表示しない
  return null;
};

// useChatbotInitializer関数のエクスポート（後方互換性のため）
export const useChatbotInitializer = () => {
  // 単純化されたフックを返す
  return {
    isDifyLoaded: true,
    isShoukiboLoaded: true,
    isShorikikaLoaded: true,
    openChatbot: () => window.openChatbot?.(),
    startShoukiboJizokaChat: () => window.startShoukiboJizokaChat?.(),
    startShorikikaChat: () => window.startShorikikaChat?.()
  };
};
