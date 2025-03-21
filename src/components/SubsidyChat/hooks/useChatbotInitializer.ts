
import { useEffect, useCallback, useState } from "react";
import { hideDifyBranding } from "../styles/chatButtonStyles";
import { useChatWindowAdjuster } from "./useChatWindowAdjuster";
import { useChatWindows } from "./useChatWindows";
import { 
  setupChatbotStyles, 
  hideBlueButton, 
  addCustomCloseButtons, 
  safelyCloseWindow 
} from "../utils/chatbotDomUtils";

/**
 * チャットボット初期化のためのカスタムフック
 */
export const useChatbotInitializer = () => {
  // 各チャットボットの読み込み状態
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);
  
  // チャットウィンドウアジャスター
  useChatWindowAdjuster(isDifyLoaded || isShoukiboLoaded || isShorikikaLoaded);

  // ウィンドウ操作関数を取得
  const { openChatbot, startShoukiboJizokaChat, startShorikikaChat } = useChatWindows();

  // カスタム閉じるボタンを追加するラッパー関数
  const addCloseButtons = useCallback(() => {
    addCustomCloseButtons(safelyCloseWindow);
  }, []);

  // チャットボットスクリプトを読み込む
  useEffect(() => {
    console.log("チャットボットスクリプトを読み込みます");
    
    // グローバル関数を設定
    window.openChatbot = openChatbot;
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.startShorikikaChat = startShorikikaChat;
    
    // 後方互換性のための関数もセット
    window.openSmallBusinessChatbot = startShoukiboJizokaChat;
    window.openSubsidyChatbot = startShorikikaChat;
    
    // スタイルを設定
    setupChatbotStyles();
    
    // 青いボタンを非表示にする
    hideBlueButton();
    
    // Difyのブランディングを非表示にする
    hideDifyBranding();
    
    // 読み込み完了を通知
    setIsDifyLoaded(true);
    setIsShoukiboLoaded(true);
    setIsShorikikaLoaded(true);
    
    // 定期的に閉じるボタンを追加（初期化直後とそれ以降）
    const initialTimer = setTimeout(addCloseButtons, 1000);
    
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      const timer = setTimeout(addCloseButtons, i * 2000);
      timers.push(timer);
    }
    
    return () => {
      // クリーンアップ
      clearTimeout(initialTimer);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat, addCloseButtons]);

  return {
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded,
    openChatbot,
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};
