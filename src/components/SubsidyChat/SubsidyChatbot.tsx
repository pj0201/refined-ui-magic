
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Dify専用のチャットボットコンポーネント
 * ロード状態の監視と通知を行う
 */
export const SubsidyChatbot = () => {
  const [difyLoaded, setDifyLoaded] = useState(false);
  const [shoukiboLoaded, setShoukiboLoaded] = useState(false);
  const [shorikikaLoaded, setShorikikaLoaded] = useState(false);
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);

  useEffect(() => {
    const checkInterval = 500; // 500ms間隔でチェック
    const maxWaitTime = 60000; // 60秒を最大待機時間とする
    let totalElapsedTime = 0;
    
    console.log("SubsidyChatbot: チャットボットスクリプトのロード状態チェックを開始します");
    
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      const isDifyAvailable = Boolean(window.difyChatbot || window.DifyAI);
      if (isDifyAvailable && !difyLoaded) {
        console.log("SubsidyChatbot: 一般的なDifyスクリプトが正常にロードされました");
        setDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      }
      
      totalElapsedTime += checkInterval;
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        setInitialLoadAttempted(true);
        if (!isDifyAvailable) {
          console.warn("SubsidyChatbot: 一般的なDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      const isShoukiboAvailable = Boolean(window.shoukiboJizokaChatbot);
      if (isShoukiboAvailable && !shoukiboLoaded) {
        console.log("SubsidyChatbot: 小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        if (!isShoukiboAvailable) {
          console.warn("SubsidyChatbot: 小規模持続化補助金のDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      const isShorikikaAvailable = Boolean(window.shorikika_chatbot);
      if (isShorikikaAvailable && !shorikikaLoaded) {
        console.log("SubsidyChatbot: 省力化投資補助金のDifyスクリプトが正常にロードされました");
        setShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        if (!isShorikikaAvailable) {
          console.warn("SubsidyChatbot: 省力化投資補助金のDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);
    
    // クリーンアップ
    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
    };
  }, [difyLoaded, shoukiboLoaded, shorikikaLoaded, initialLoadAttempted]);
  
  return null;
};

/**
 * 一般的なDifyチャットボットを開く関数
 * ※互換性のため残していますが、新しいChatbotInitializerを使用することを推奨
 */
export const openChatbot = () => {
  try {
    console.log("SubsidyChatbot.openChatbot: Difyチャットボットを開きます");
    
    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("SubsidyChatbot.openChatbot: チャットウィンドウは既に表示されています");
      return;
    }
    
    // Difyチャットボットを開く
    if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openChatbot: difyChatbot APIを使用");
      window.difyChatbot.toggle();
    } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
      console.log("SubsidyChatbot.openChatbot: DifyAI APIを使用");
      window.DifyAI.toggleUI(true);
    } else {
      // 非常時にはデフォルトのボタンをクリック
      console.log("SubsidyChatbot.openChatbot: デフォルトの方法を使用");
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton && difyButton instanceof HTMLElement) {
        difyButton.click();
      } else {
        throw new Error("SubsidyChatbot.openChatbot: Difyのチャットボタンが見つかりませんでした");
      }
    }
  } catch (error) {
    console.error("SubsidyChatbot.openChatbot: チャットボットを開く際にエラーが発生しました:", error);
    toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};
