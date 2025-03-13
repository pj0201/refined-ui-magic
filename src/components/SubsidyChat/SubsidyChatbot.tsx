
import { useEffect } from "react";

/**
 * シンプルな補助金チャットボットコンポーネント
 * Difyは既にHTMLで初期化されるため、このコンポーネントは初期化処理を行いません
 */
export const SubsidyChatbot = () => {
  // 何も初期化しない - HTMLに直接埋め込みコードを配置済み
  
  return null;
};

/**
 * チャットボットを開く関数
 */
export const openChatbot = () => {
  // まずチャットボタンを探して、存在すれば直接クリック
  const chatButton = document.getElementById('dify-chatbot-bubble-button');
  if (chatButton && chatButton instanceof HTMLElement) {
    chatButton.click();
    return;
  }
  
  // すでにウィンドウが表示されている場合は何もしない
  console.log("チャットボタンが見つかりませんでした");
};
