
import { useEffect } from "react";
import { toast } from "sonner";

/**
 * シンプルな補助金チャットボットコンポーネント
 * デフォルトのDifyボタンを非表示にするためのスタイルを追加
 */
export const SubsidyChatbot = () => {
  useEffect(() => {
    // デフォルトのDifyボタンを非表示にするスタイルを追加
    // 重要: カスタムボタン（-1, -2など）は非表示にしないよう、セレクタを具体的に
    const style = document.createElement('style');
    style.id = 'hide-default-dify-button';
    style.textContent = `
      #dify-chatbot-bubble-button:not([id$="-1"]):not([id$="-2"]) {
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
 * より堅牢にチャットボットを開くために改善
 */
export const openChatbot = () => {
  console.log("チャットボットを開く関数が呼び出されました");
  
  // チャットウィンドウをチェック - 既に表示されていれば操作しない
  const chatWindow = document.getElementById('dify-chatbot-bubble-window');
  if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
    console.log("チャットウィンドウは既に表示されています");
    return;
  }
  
  // まず省力化投資補助金のチャットボタンを探す
  const shorikikaButton = document.getElementById('dify-chatbot-bubble-button-1');
  if (shorikikaButton && shorikikaButton instanceof HTMLElement) {
    console.log("省力化投資補助金ボタンを発見、クリックします");
    shorikikaButton.click();
    return;
  }
  
  // 次に小規模持続化補助金のチャットボタンを探す
  const shoukiboButton = document.getElementById('dify-chatbot-bubble-button-2');
  if (shoukiboButton && shoukiboButton instanceof HTMLElement) {
    console.log("小規模持続化補助金ボタンを発見、クリックします");
    shoukiboButton.click();
    return;
  }
  
  // Dify APIを直接使用して開く（バックアップメソッド）
  if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
    console.log("Dify APIを使用してチャットを開きます");
    window.difyChatbot.toggle();
    return;
  }
  
  if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
    console.log("DifyAI APIを使用してチャットを開きます");
    window.DifyAI.toggleUI(true);
    return;
  }
  
  // UIエレメントが見つからない場合は、ユーザーに伝える
  console.log("チャットボタンが見つかりませんでした。チャットUIを復元します");
  
  // 既存のチャットUIを復元する試み
  const event = new CustomEvent('chatbot-recovery-requested');
  document.dispatchEvent(event);
  
  // 復元イベント後、わずかに遅らせてから再度試行
  setTimeout(() => {
    // 再試行: 省力化投資補助金のチャットボタン
    const retriedShorikikaButton = document.getElementById('dify-chatbot-bubble-button-1');
    if (retriedShorikikaButton && retriedShorikikaButton instanceof HTMLElement) {
      console.log("復元後、省力化投資補助金ボタンを発見、クリックします");
      retriedShorikikaButton.click();
      return;
    }
    
    // 再試行: 小規模持続化補助金のチャットボタン
    const retriedShoukiboButton = document.getElementById('dify-chatbot-bubble-button-2');
    if (retriedShoukiboButton && retriedShoukiboButton instanceof HTMLElement) {
      console.log("復元後、小規模持続化補助金ボタンを発見、クリックします");
      retriedShoukiboButton.click();
      return;
    }
    
    // バックアップ: 直接チャットウィンドウを表示
    const directChatWindow = document.getElementById('direct-chat-window');
    if (directChatWindow) {
      console.log("直接チャットウィンドウを表示します");
      directChatWindow.style.display = 'flex';
      return;
    }
    
    // それでも失敗した場合はfallbackモードを有効化
    try {
      const { createDirectChatWindow, showChatWindow } = require('./utils/directChatImplementation');
      console.log("フォールバックモードでチャットウィンドウを作成します");
      createDirectChatWindow();
      showChatWindow();
      return;
    } catch (e) {
      console.error("フォールバックモード初期化エラー:", e);
    }
    
    // すべて失敗した場合、エラーメッセージを表示
    toast.error("チャットボットを開けませんでした。ページを再読み込みしてもう一度お試しください。");
  }, 300);
};

