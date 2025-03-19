
import { useEffect, useCallback } from "react";

/**
 * Difyチャットウィンドウのサイズと位置を調整するためのカスタムフック
 */
export const useChatWindowAdjuster = (isLoaded: boolean) => {
  // チャットウィンドウをセーフに閉じる関数
  const safelyCloseWindow = useCallback((windowId: string) => {
    try {
      const chatWindow = document.getElementById(windowId);
      if (chatWindow) {
        // 安全な閉じ方のために複数のプロパティを設定
        chatWindow.style.cssText = `
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          z-index: -1 !important;
        `;
        chatWindow.classList.add('dify-hidden');
        
        console.log(`チャットウィンドウ ${windowId} を安全に閉じました`);
      }
    } catch (error) {
      console.error(`チャットウィンドウ ${windowId} を閉じる際にエラーが発生しました:`, error);
    }
  }, []);

  // チャットウィンドウのサイズと位置を調整する関数
  const adjustChatWindow = useCallback((windowId: string) => {
    try {
      const chatWindow = document.getElementById(windowId);
      if (chatWindow) {
        console.log(`チャットウィンドウ ${windowId} の位置とサイズを調整しています`);
        const viewportHeight = window.innerHeight;
        const chatWindowHeight = chatWindow.clientHeight;
        
        if (chatWindowHeight > viewportHeight - 100) {
          chatWindow.style.height = (viewportHeight - 100) + 'px';
          chatWindow.style.top = '50px';
        }
        
        // 閉じるボタンを追加/更新する
        const header = chatWindow.querySelector('.dify-chatbot-bubble-window-header') ||
                      chatWindow.querySelector('.dify-chatbot-window-header');
                      
        if (header && !header.querySelector('.custom-close-button')) {
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '×';
          closeButton.className = 'custom-close-button';
          closeButton.setAttribute('aria-label', 'チャットを閉じる');
          closeButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow(windowId);
          };
          header.appendChild(closeButton);
          console.log(`チャットウィンドウ ${windowId} に閉じるボタンを追加しました`);
        }
      }
    } catch (error) {
      console.error(`チャットウィンドウ ${windowId} の調整中にエラーが発生しました:`, error);
    }
  }, [safelyCloseWindow]);

  useEffect(() => {
    if (!isLoaded) return;

    // 全チャットウィンドウの調整
    const adjustAllChatWindows = () => {
      const windowIds = [
        'dify-chatbot-bubble-window',
        'shoukibo-jizoka-chatbot-window',
        'shorikika-chatbot-window'
      ];
      
      windowIds.forEach(id => adjustChatWindow(id));
    };
    
    // ウィンドウリサイズ時にチャットウィンドウを調整
    window.addEventListener('resize', adjustAllChatWindows);
    
    // 初期調整 (遅延して実行)
    const initialTimer = setTimeout(() => {
      adjustAllChatWindows();
    }, 1000);
    
    // 定期的に調整 (2秒ごと、計10秒間)
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      const timer = setTimeout(adjustAllChatWindows, i * 2000);
      timers.push(timer);
    }

    // チャットウィンドウの変更を監視して自動調整する
    const chatWindowObserver = new MutationObserver((mutations) => {
      let shouldAdjust = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || 
            (mutation.type === 'attributes' && 
             (mutation.attributeName === 'style' || mutation.attributeName === 'class'))) {
          shouldAdjust = true;
        }
      });
      
      if (shouldAdjust) {
        adjustAllChatWindows();
      }
    });
    
    // body要素を監視して、チャットウィンドウの追加を検出
    chatWindowObserver.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', adjustAllChatWindows);
      clearTimeout(initialTimer);
      timers.forEach(timer => clearTimeout(timer));
      chatWindowObserver.disconnect();
    };
  }, [isLoaded, adjustChatWindow]);
};
