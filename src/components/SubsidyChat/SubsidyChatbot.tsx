
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

  useEffect(() => {
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      const difyLoaded = Boolean(window.difyChatbot || window.DifyAI);
      if (difyLoaded) {
        console.log("一般的なDifyスクリプトが正常にロードされました");
        setDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      }
    }, 1000);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      const shoukiboLoaded = Boolean(window.shoukiboJizokaChatbot);
      if (shoukiboLoaded) {
        console.log("小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      }
    }, 1000);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      const shorikikaLoaded = Boolean(window.shorikika_chatbot);
      if (shorikikaLoaded) {
        console.log("省力化投資補助金のDifyスクリプトが正常にロードされました");
        setShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      }
    }, 1000);
    
    // 60秒後にもロードされていない場合は警告
    const warningTimeout = setTimeout(() => {
      if (!difyLoaded) {
        console.warn("一般的なDifyスクリプトのロードに60秒以上かかっています");
      }
      if (!shoukiboLoaded) {
        console.warn("小規模持続化補助金のDifyスクリプトのロードに60秒以上かかっています");
      }
      if (!shorikikaLoaded) {
        console.warn("省力化投資補助金のDifyスクリプトのロードに60秒以上かかっています");
      }
    }, 60000);
    
    // クリーンアップ
    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
      clearTimeout(warningTimeout);
    };
  }, []);
  
  return null;
};

/**
 * 一般的なDifyチャットボットを開く関数
 * ※互換性のため残していますが、新しいChatbotInitializerを使用することを推奨
 */
export const openChatbot = () => {
  try {
    console.log("Difyチャットボットを開きます");
    
    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("チャットウィンドウは既に表示されています");
      return;
    }
    
    // Difyチャットボットを開く
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
