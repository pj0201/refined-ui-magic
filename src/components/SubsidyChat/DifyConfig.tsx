
import { useEffect } from "react";
import { setupDifyChat, monitorChatbotState, setupChatButton, ensureChatWindowVisibility } from "./services/difySetup";

declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
      containerID?: string;
    };
  }
}

export const DifyConfig = () => {
  useEffect(() => {
    console.log("DifyConfig component mounted, initializing chat...");
    
    // 現在のDifyの状態をクリア
    const cleanupExistingElements = () => {
      // 既存のDify関連要素を削除
      ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-chat-styles', 'dify-chatbot-container'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          console.log(`Removing existing element: ${id}`);
          element.remove();
        }
      });
    };
    
    // 初期化前にクリーンアップ
    cleanupExistingElements();
    
    // 即時実行 - セットアップの実行を早くする
    setupDifyChat();
    
    // チャットボタンの表示と機能を確保する強化された関数
    const ensureChatButtonFunctionality = () => {
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton) {
        console.log("Configuring Dify button visibility and click behavior");
        
        // ボタンの表示スタイルを強制適用
        difyButton.style.cssText = `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 9995 !important;
          position: fixed !important;
          bottom: 11rem !important;
          right: 1rem !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          background-color: #1C64F2 !important;
          cursor: pointer !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        `;
        
        // 強制的にHTMLコンテンツを設定
        if (!difyButton.innerHTML.includes('svg')) {
          difyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          `;
        }
        
        // 既存のイベントハンドラを削除して新しく設定
        difyButton.onclick = null;
        difyButton.replaceWith(difyButton.cloneNode(true));
        
        // 新しいボタン参照を取得
        const newButton = document.getElementById('dify-chatbot-bubble-button');
        if (newButton) {
          // クリックイベントを直接設定
          newButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Dify button clicked, toggling chat window");
            
            const chatWindow = document.getElementById('dify-chatbot-bubble-window');
            if (chatWindow) {
              // 表示/非表示を切り替え
              const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
              chatWindow.style.display = isHidden ? 'flex' : 'none';
              
              if (isHidden) {
                // 画面内に収まるように位置調整
                ensureChatWindowVisibility(chatWindow);
              }
            } else {
              console.log("Chat window not found, initializing chat...");
              setupDifyChat();
              
              // 遅延してウィンドウを強制的に表示
              setTimeout(() => {
                const newChatWindow = document.getElementById('dify-chatbot-bubble-window');
                if (newChatWindow) {
                  newChatWindow.style.display = 'flex';
                  ensureChatWindowVisibility(newChatWindow);
                }
              }, 500);
            }
          }, true);
        }
      } else {
        console.warn("Dify button not found, recreating...");
        setupDifyChat();
      }
    };
    
    // チャットウィンドウが画面内に収まるように調整する関数
    const ensureChatWindowVisibility = (chatWindow: HTMLElement) => {
      // 基本スタイルを適用
      chatWindow.style.width = '350px';
      chatWindow.style.height = '500px';
      chatWindow.style.maxHeight = '80vh';
      chatWindow.style.position = 'fixed';
      chatWindow.style.zIndex = '9995';
      chatWindow.style.display = 'flex';
      chatWindow.style.flexDirection = 'column';
      chatWindow.style.backgroundColor = 'white';
      chatWindow.style.borderRadius = '0.5rem';
      chatWindow.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      chatWindow.style.overflow = 'hidden';
      
      // 画面サイズを取得
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // ウィンドウのサイズを取得
      const windowWidth = parseInt(chatWindow.style.width) || 350;
      const windowHeight = parseInt(chatWindow.style.height) || 500;
      
      // 右端の位置を計算（画面からはみ出ないように）
      const rightPosition = Math.min(viewportWidth - windowWidth - 16, viewportWidth * 0.9);
      const bottomPosition = Math.min(viewportHeight - windowHeight - 16, viewportHeight * 0.8);
      
      // モバイル対応
      if (viewportWidth <= 640) {
        chatWindow.style.width = 'calc(100vw - 2rem)';
        chatWindow.style.height = '70vh';
        chatWindow.style.right = '1rem';
        chatWindow.style.bottom = '5rem';
      } else {
        // 位置を調整
        chatWindow.style.right = '1rem';
        chatWindow.style.bottom = '5rem';
      }
      
      console.log(`Chat window positioned at right: ${chatWindow.style.right}, bottom: ${chatWindow.style.bottom}`);
    };
    
    // ボタン機能確保の即時実行とタイマー設定
    ensureChatButtonFunctionality();
    setTimeout(ensureChatButtonFunctionality, 1000);
    setTimeout(ensureChatButtonFunctionality, 2000);
    
    // 継続的な監視
    const buttonCheckInterval = setInterval(ensureChatButtonFunctionality, 5000);
    
    // チャットボットの状態を監視
    const { interval, timeout } = monitorChatbotState();

    // クリーンアップ
    return () => {
      clearInterval(buttonCheckInterval);
      clearInterval(interval);
      clearTimeout(timeout);
      
      // DOM要素を削除
      cleanupExistingElements();
      
      console.log('Dify chat cleaned up');
    };
  }, []);

  return null;
};
