
import { useEffect, useRef } from "react";
import { setupChatbotStyles } from "../utils/styleUtils";
import { addCustomCloseButtons } from "../utils/buttonUtils";
import { setupGlobalFunctions } from "../utils/globalFunctions";

/**
 * チャットボット初期化カスタムフック
 */
export const useChatbotInitializer = () => {
  const initialized = useRef(false);
  
  // 初期化処理
  useEffect(() => {
    // 一度だけ実行するための条件
    if (initialized.current) return;
    initialized.current = true;
    
    console.log("チャットボット初期化を開始します");
    
    // グローバル関数の設定
    setupGlobalFunctions();
    
    // スタイルを設定
    setupChatbotStyles();
    
    // 初期化後に閉じるボタンを追加
    setTimeout(() => addCustomCloseButtons(), 2000);
    
    // 定期的に閉じるボタンをチェック
    const buttonInterval = setInterval(() => addCustomCloseButtons(), 5000);
    
    // クリーンアップ関数
    return () => {
      clearInterval(buttonInterval);
      console.log("チャットボット初期化のクリーンアップを実行");
    };
  }, []);
  
  // 単純化されたフックを返す
  return {
    isShoukiboLoaded: !!window.shoukiboJizokaChatbot,
    isShorikikaLoaded: !!window.shorikika_chatbot,
    startShoukiboJizokaChat: () => window.startShoukiboJizokaChat?.(),
    startShorikikaChat: () => window.startShorikikaChat?.()
  };
};
