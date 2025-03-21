
import { toast } from "sonner";

/**
 * チャットウィンドウを安全に閉じる関数
 */
export const safelyCloseWindow = (windowId: string) => {
  try {
    const chatWindow = document.getElementById(windowId);
    if (chatWindow) {
      // ウィンドウを完全に削除
      chatWindow.remove();
      console.log(`チャットウィンドウ ${windowId} を安全に閉じました`);
      
      // スタイルクリーンアップ
      document.body.classList.remove('chatbot-window-active');
      
      // 関連する追加要素も削除
      const relatedElements = document.querySelectorAll(`[data-related-to="${windowId}"]`);
      relatedElements.forEach(el => el.remove());
      
      // イベントを発行して閉じられたことを通知
      window.dispatchEvent(new CustomEvent('chatbot-window-closed', { detail: { windowId } }));
    }
  } catch (error) {
    console.error(`チャットウィンドウ ${windowId} を閉じる際にエラーが発生しました:`, error);
  }
};

/**
 * 青いボタンを非表示にする関数
 */
export const hideBlueButton = () => {
  try {
    const style = document.createElement('style');
    style.textContent = `
    /* 青いボタンを完全に非表示 */
    #dify-chatbot-bubble-button,
    .dify-chatbot-bubble-button,
    [id^="dify-chatbot-bubble-button"],
    [class^="dify-chatbot-bubble-button"],
    [id*="dify-chatbot-bubble-button"],
    [class*="chatbot-bubble-button"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      z-index: -1 !important;
    }
    
    /* プレーンコードテキストを非表示 */
    #shoukibo-jizoka-chatbot-window > pre,
    #shorikika-chatbot-window > pre,
    #dify-chatbot-bubble-window > pre {
      display: none !important;
    }
    `;
    document.head.appendChild(style);
    console.log("青いボタンを非表示にしました");
  } catch (error) {
    console.error("青いボタンの非表示化中にエラーが発生しました:", error);
  }
};

/**
 * チャットボットのスタイルをセットアップする関数
 */
export const setupChatbotStyles = () => {
  try {
    const style = document.createElement('style');
    style.textContent = `
      /* チャットウィンドウのスタイル */
      #dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window,
      #shorikika-chatbot-window {
        width: 24rem !important;
        height: 50rem !important;
        max-height: 90vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: auto !important;
        top: 50px !important;
        right: 20px !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 99995 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        background-color: #fff !important;
      }
      
      /* ヘッダーのスタイリング */
      .dify-chatbot-bubble-window-header,
      .dify-chatbot-window-header {
        background-color: #1C64F2 !important;
        padding: 0.75rem !important;
        color: white !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        position: relative !important;
      }
      
      /* チャットウィンドウのコンテンツ */
      .dify-chatbot-bubble-window-content {
        flex: 1 !important;
        overflow: hidden !important;
        position: relative !important;
        height: calc(100% - 50px) !important;
      }
      
      /* iframe スタイル修正 */
      .dify-chatbot-bubble-window-content iframe {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        display: block !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
      }
      
      /* 閉じるボタン */
      .chat-window-close-button,
      .custom-close-button {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        border: none !important;
        border-radius: 50% !important;
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 18px !important;
        z-index: 10000 !important;
      }
      
      /* 閉じるボタンホバー */
      .chat-window-close-button:hover,
      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      
      /* モバイル対応 */
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          width: calc(100vw - 32px) !important;
          height: 80vh !important;
          bottom: 1rem !important;
          right: 1rem !important;
          left: 1rem !important;
          top: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    console.log("チャットボットスタイルをセットアップしました");
  } catch (error) {
    console.error("チャットボットスタイルのセットアップ中にエラーが発生しました:", error);
  }
};

/**
 * カスタム閉じるボタンを追加する関数
 */
export const addCustomCloseButtons = (safelyCloseWindowFn: (windowId: string) => void) => {
  try {
    // チャットボットウィンドウのヘッダーを取得
    const chatWindows = [
      { id: 'dify-chatbot-bubble-window', selector: '#dify-chatbot-bubble-window .dify-chatbot-bubble-window-header' },
      { id: 'shoukibo-jizoka-chatbot-window', selector: '#shoukibo-jizoka-chatbot-window .dify-chatbot-bubble-window-header' },
      { id: 'shorikika-chatbot-window', selector: '#shorikika-chatbot-window .dify-chatbot-bubble-window-header' }
    ];
    
    // 各チャットウィンドウに閉じるボタンを追加
    chatWindows.forEach(({ id, selector }) => {
      const header = document.querySelector(selector);
      if (header && !header.querySelector('.custom-close-button')) {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'custom-close-button';
        closeButton.setAttribute('aria-label', 'チャットを閉じる');
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          safelyCloseWindowFn(id);
          
          // 閉じた後に少し待機してから次の操作を許可
          setTimeout(() => {
            // イベントを発行して閉じられたことを通知
            window.dispatchEvent(new CustomEvent('chatbot-closed-completely', { detail: { windowId: id } }));
          }, 500);
        };
        header.appendChild(closeButton);
        console.log(`${id} に閉じるボタンを追加しました`);
      }
    });
  } catch (error) {
    console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
  }
};

/**
 * 他のチャットウィンドウを閉じる関数
 */
export const closeOtherChatWindows = (keepWindowId: string, safelyCloseWindowFn: (windowId: string) => void) => {
  try {
    const windowIds = [
      'dify-chatbot-bubble-window',
      'shoukibo-jizoka-chatbot-window',
      'shorikika-chatbot-window'
    ];
    
    windowIds.forEach(id => {
      if (id !== keepWindowId) {
        const window = document.getElementById(id);
        if (window) {
          safelyCloseWindowFn(id);
        }
      }
    });
  } catch (error) {
    console.error("他のチャットウィンドウを閉じる際にエラーが発生しました:", error);
  }
};

