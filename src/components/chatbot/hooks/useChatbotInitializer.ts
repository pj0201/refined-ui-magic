
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
    const addButtonsAndCheckStatus = () => {
      addCustomCloseButtons();
      
      // チャットボットの初期化状態を確認
      const shoukiboLoaded = !!window.shoukiboJizokaChatbot;
      const shorikikaLoaded = !!window.shorikika_chatbot;
      
      return { shoukiboLoaded, shorikikaLoaded };
    };
    
    // 初回チェック
    setTimeout(addButtonsAndCheckStatus, 2000);
    
    // 定期的に閉じるボタンをチェック（5秒間隔で3回）
    let checkCount = 0;
    const buttonInterval = setInterval(() => {
      const status = addButtonsAndCheckStatus();
      checkCount++;
      
      // 3回チェック後または両方のチャットボットが初期化された場合は終了
      if (checkCount >= 3 || (status.shoukiboLoaded && status.shorikikaLoaded)) {
        clearInterval(buttonInterval);
      }
    }, 5000);
    
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
