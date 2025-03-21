
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
    
    // ウィンドウがロードされた後に閉じるボタンの追加を試みる
    window.addEventListener('load', () => {
      setTimeout(addButtonsAndCheckStatus, 1000);
    });
    
    // フォールバックチャット表示イベントのリスナー
    const handleShowFallback = (event: any) => {
      const { title, windowId } = event.detail || {};
      if (title && windowId) {
        showMockChatWindow(title, windowId);
      }
    };
    
    document.addEventListener('show-fallback-chat', handleShowFallback);
    
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
      document.removeEventListener('show-fallback-chat', handleShowFallback);
      console.log("チャットボット初期化のクリーンアップを実行");
    };
  }, []);
  
  // モックチャットウィンドウを表示する関数
  const showMockChatWindow = (title: string, windowId: string) => {
    console.log(`フォールバックチャットを表示: ${title} (useChatbotInitializer)`);
    
    // 他のチャットウィンドウを閉じる
    const chatWindows = document.querySelectorAll('[id$="-chatbot-window"], #mock-chat-window');
    chatWindows.forEach(window => {
      if (window instanceof HTMLElement) {
        window.style.display = 'none';
      }
    });
    
    // 既存のモックウィンドウを確認
    let mockWindow = document.getElementById('mock-chat-window');
    
    if (!mockWindow) {
      // 新しいモックウィンドウを作成
      mockWindow = document.createElement('div');
      mockWindow.id = 'mock-chat-window';
      
      // スタイル設定
      mockWindow.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        width: 380px;
        height: 600px;
        max-height: 80vh;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        z-index: 99999;
        overflow: hidden;
      `;
      
      document.body.appendChild(mockWindow);
    }
    
    mockWindow.style.display = 'flex';
    mockWindow.innerHTML = '';
    
    // ヘッダー部分を作成
    const header = document.createElement('div');
    header.style.cssText = `
      background-color: #1C64F2;
      color: white;
      padding: 15px;
      font-weight: bold;
      display: flex;
      align-items: center;
      position: relative;
    `;
    header.textContent = title;
    
    // 閉じるボタン
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.className = 'custom-close-button';
    closeButton.style.cssText = `
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      width: 30px !important;
      height: 30px !important;
      border-radius: 50% !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
      border: none !important;
      color: white !important;
      font-size: 18px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      transition: background-color 0.3s !important;
      z-index: 10000 !important;
    `;
    closeButton.onclick = () => {
      if (mockWindow) {
        mockWindow.style.display = 'none';
      }
    };
    header.appendChild(closeButton);
    
    // コンテンツ部分
    const content = document.createElement('div');
    content.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      background-color: #f9fafb;
    `;
    
    content.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3 style="margin-bottom: 1rem; font-weight: bold; color: #1a202c;">${title}</h3>
      <p style="margin-bottom: 1rem; color: #4a5568;">
        現在、チャットボットサーバーに接続できません。<br>
        ネットワーク接続を確認し、しばらく待ってから再度お試しください。
      </p>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button class="retry-button" style="
          background-color: #1C64F2;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-weight: medium;
          cursor: pointer;
          transition: background-color 0.2s;
        ">もう一度試す</button>
        <button class="close-button" style="
          background-color: transparent;
          color: #4a5568;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-weight: medium;
          cursor: pointer;
          transition: background-color 0.2s;
        ">閉じる</button>
      </div>
    `;
    
    // ウィンドウを組み立てる
    mockWindow.appendChild(header);
    mockWindow.appendChild(content);
    
    // イベントリスナーを追加
    const retryButton = content.querySelector('.retry-button');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        // ウィンドウをいったん閉じる
        if (mockWindow) mockWindow.style.display = 'none';
        
        // 対応するチャットボットを再起動
        if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
          window.startShoukiboJizokaChat();
        } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
          window.startShorikikaChat();
        }
      });
    }
    
    const closeBtn = content.querySelector('.close-button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (mockWindow) mockWindow.style.display = 'none';
      });
    }
  };
  
  // 単純化されたフックを返す
  return {
    isShoukiboLoaded: !!window.shoukiboJizokaChatbot,
    isShorikikaLoaded: !!window.shorikika_chatbot,
    startShoukiboJizokaChat: () => window.startShoukiboJizokaChat?.(),
    startShorikikaChat: () => window.startShorikikaChat?.(),
    showMockChatWindow
  };
};
