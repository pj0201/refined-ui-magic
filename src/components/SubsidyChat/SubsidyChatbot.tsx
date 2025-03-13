
import { useEffect } from "react";

/**
 * シンプルな補助金チャットボットコンポーネント
 * デフォルトのDifyボタンを非表示にするためのスタイルを追加
 */
export const SubsidyChatbot = () => {
  useEffect(() => {
    // デフォルトのDifyボタンを非表示にするスタイルを追加
    const style = document.createElement('style');
    style.id = 'hide-default-dify-button';
    style.textContent = `
      #dify-chatbot-bubble-button {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // コンポーネントのアンマウント時にスタイルを削除
      const styleElem = document.getElementById('hide-default-dify-button');
      if (styleElem) {
        styleElem.remove();
      }
    };
  }, []);
  
  return null;
};

/**
 * チャットボットを開く関数
 */
export const openChatbot = () => {
  // まず省力化投資補助金のチャットボタンを探す
  const shorikikaButton = document.getElementById('dify-chatbot-bubble-button-1');
  if (shorikikaButton && shorikikaButton instanceof HTMLElement) {
    shorikikaButton.click();
    return;
  }
  
  // 次に小規模持続化補助金のチャットボタンを探す
  const shoukiboButton = document.getElementById('dify-chatbot-bubble-button-2');
  if (shoukiboButton && shoukiboButton instanceof HTMLElement) {
    shoukiboButton.click();
    return;
  }
  
  // すでにウィンドウが表示されている場合は何もしない
  console.log("チャットボタンが見つかりませんでした");
};
