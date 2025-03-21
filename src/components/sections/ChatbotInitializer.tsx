
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { 
  setupChatbotStyles, 
  hideBlueButton, 
  addCustomCloseButtons, 
  handleCORSError, 
  checkApiConnection 
} from "../SubsidyChat/utils/chatbotDomUtils";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // 初期化実行フラグ
  const initialized = useRef(false);
  
  // 初期化状態
  useEffect(() => {
    // 一度だけ実行するための条件
    if (initialized.current) return;
    initialized.current = true;
    
    console.log("チャットボット初期化を開始します");

    // APIの状態確認を実行
    checkDifyAPI();
    
    // グローバル関数の設定
    setupGlobalFunctions();
    
    // スタイルを設定
    setupChatbotStyles();
    
    // 青いボタンを非表示にする
    hideBlueButton();
    
    // 初期化後に閉じるボタンを追加
    // safelyCloseWindow関数をパラメータとして渡す
    setTimeout(() => addCustomCloseButtons(() => {}), 2000);
    
    // 定期的に閉じるボタンをチェック
    // safelyCloseWindow関数をパラメータとして渡す
    const buttonInterval = setInterval(() => addCustomCloseButtons(() => {}), 5000);
    
    // クリーンアップ関数
    return () => {
      clearInterval(buttonInterval);
    };
  }, []);
  
  // DifyスクリプトとAPIの状態を確認
  const checkDifyAPI = async () => {
    try {
      // CORS対応: API接続を確認
      const isConnected = await checkApiConnection();
      
      if (!isConnected) {
        console.error("Dify APIに接続できません");
        
        // CORS問題を検出した場合は対応
        const corsFixed = handleCORSError();
        
        if (corsFixed) {
          toast.info("チャットボット接続を復旧中です...", {
            duration: 3000,
          });
          
          // 少し待ってから再試行
          setTimeout(async () => {
            const retryConnection = await checkApiConnection();
            if (!retryConnection) {
              toast.error("チャットボットサーバーに接続できません。しばらく待ってからお試しください。", {
                duration: 5000,
              });
            }
          }, 3000);
        } else {
          toast.error("チャットボットサーバーに接続できません。しばらく待ってからお試しください。", {
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error("Dify API接続確認中にエラー発生:", error);
      handleCORSError();
    }
  };
  
  // グローバル関数の設定
  const setupGlobalFunctions = () => {
    // 一般チャットボットを開く関数
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
    
    // 小規模持続化補助金チャットボットを開く関数
    window.startShoukiboJizokaChat = () => {
      console.log("小規模持続化補助金チャットボットを開きます");
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = [
          document.getElementById('dify-chatbot-bubble-window'),
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
              // ここで空の関数を渡す
              addCustomCloseButtons(() => {});
            }
          }, 500);
        } else if (typeof window.openSmallBusinessChatbot === 'function') {
          window.openSmallBusinessChatbot();
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
          document.getElementById('dify-chatbot-bubble-window'),
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
              // ここで空の関数を渡す
              addCustomCloseButtons(() => {});
            }
          }, 500);
        } else if (typeof window.openSubsidyChatbot === 'function') {
          window.openSubsidyChatbot();
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
  };
  
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
