
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // スクリプトとスタイルを挿入する関数
    const setupDifyChat = () => {
      // スクリプトが既に存在するか確認
      if (document.getElementById('dify-chat-config') || document.getElementById('yXBz3rzpDBhMgYcB')) {
        console.log('Dify chat scripts already exist, skipping initialization');
        return;
      }

      console.log('Setting up Dify chat...');

      try {
        // 設定スクリプトの追加
        const difyChatbotConfig = document.createElement('script');
        difyChatbotConfig.id = 'dify-chat-config';
        difyChatbotConfig.textContent = `
          window.difyChatbotConfig = { 
            token: 'yXBz3rzpDBhMgYcB',
            containerID: 'dify-chatbot-container'
          };
          console.log('Dify config loaded');
        `;
        document.head.appendChild(difyChatbotConfig);

        // メインスクリプトの追加 - onloadイベントの追加
        const difyChatbotScript = document.createElement('script');
        difyChatbotScript.src = 'https://udify.app/embed.min.js';
        difyChatbotScript.id = 'yXBz3rzpDBhMgYcB';
        difyChatbotScript.onload = () => {
          console.log('Dify script loaded successfully');
          // スクリプト読み込み後にスタイルを適用するためにタイムアウトを設定
          setTimeout(applyDifyChatStyles, 100);
        };
        difyChatbotScript.onerror = (error) => {
          console.error('Error loading Dify script:', error);
        };
        document.body.appendChild(difyChatbotScript);

        // スタイルの追加
        const difyChatbotStyle = document.createElement('style');
        difyChatbotStyle.id = 'dify-chat-styles';
        difyChatbotStyle.textContent = `
          /* Chat button styling */
          #dify-chatbot-bubble-button {
            background-color: #1C64F2 !important;
            bottom: 11rem !important;
            right: 1rem !important;
            z-index: 1000 !important;
            position: fixed !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 50% !important;
          }
          
          /* Chat window styling */
          #dify-chatbot-bubble-window {
            width: 24rem !important;
            height: 40rem !important;
            max-height: 80vh !important;
            max-width: calc(100vw - 32px) !important;
            bottom: 5rem !important;
            right: 1rem !important;
            transform: none !important;
            margin-bottom: 0 !important;
            z-index: 1001 !important;
            position: fixed !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }

          /* Ensure content is visible */
          #dify-chatbot-bubble-window iframe {
            flex: 1 !important;
            height: 100% !important;
            width: 100% !important;
          }
          
          /* Make close button always visible */
          #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 24px !important;
            height: 24px !important;
            color: #666 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          }
          
          /* Add a custom close button if the default is hidden */
          .custom-dify-close-btn {
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 24px !important;
            height: 24px !important;
            color: #666 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            border: none !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          }

          /* Add container to ensure chat is displayed */
          #dify-chatbot-container {
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 1000;
          }
        `;
        document.head.appendChild(difyChatbotStyle);

        // Difyチャットボット用のコンテナ要素を追加
        const container = document.createElement('div');
        container.id = 'dify-chatbot-container';
        document.body.appendChild(container);

        console.log('Dify chat setup complete');
      } catch (error) {
        console.error('Error setting up Dify chat:', error);
      }
    };

    // スタイルを適用する関数
    const applyDifyChatStyles = () => {
      console.log('Applying Dify chat styles');
      
      // MutationObserverでDOM変更を監視してスタイル適用やカスタム閉じるボタンの追加を行う
      const observer = new MutationObserver((mutations) => {
        // ウィンドウ要素を探す
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (chatWindow) {
          // 閉じるボタンを探す
          const closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
          
          if (closeButton) {
            // 既存の閉じるボタンのスタイルを強制適用
            closeButton.setAttribute('style', `
              display: flex !important;
              visibility: visible !important;
              opacity: 1 !important;
              position: absolute !important;
              top: 10px !important;
              right: 10px !important;
              z-index: 9999 !important;
              width: 24px !important;
              height: 24px !important;
              color: #666 !important;
              background: rgba(255, 255, 255, 0.8) !important;
              border-radius: 50% !important;
              align-items: center !important;
              justify-content: center !important;
              cursor: pointer !important;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            `);
          } else if (!chatWindow.querySelector('.custom-dify-close-btn')) {
            // カスタム閉じるボタンをまだ追加していない場合は追加
            const customCloseButton = document.createElement('button');
            customCloseButton.className = 'custom-dify-close-btn';
            customCloseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>';
            
            // ボタンにクリックイベントを追加
            customCloseButton.addEventListener('click', () => {
              chatWindow.style.display = 'none';
              // チャットボタンを探してクリック
              const chatButton = document.getElementById('dify-chatbot-bubble-button');
              if (chatButton) chatButton.click();
            });
            
            chatWindow.appendChild(customCloseButton);
            console.log('Custom close button added to Dify chat window');
          }
        }

        // チャットボタンを探して表示を確保
        const chatButton = document.getElementById('dify-chatbot-bubble-button');
        if (chatButton) {
          chatButton.style.display = 'block';
          chatButton.style.visibility = 'visible';
          chatButton.style.opacity = '1';
        }
      });

      // DOM変更の監視を開始
      observer.observe(document.body, { childList: true, subtree: true });

      // 初期チェックを実行
      setTimeout(() => {
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        const chatButton = document.getElementById('dify-chatbot-bubble-button');
        
        // チャットボタンの表示を確認
        if (chatButton) {
          console.log('Dify chat button found, ensuring visibility');
          chatButton.style.display = 'block';
          chatButton.style.visibility = 'visible';
          chatButton.style.opacity = '1';
        } else {
          console.log('Dify chat button not found yet');
        }

        // チャットウィンドウの閉じるボタンを確認
        if (chatWindow) {
          console.log('Dify chat window found, checking close button');
          const closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
          if (!closeButton || getComputedStyle(closeButton).display === 'none') {
            if (!chatWindow.querySelector('.custom-dify-close-btn')) {
              console.log('Adding custom close button to Dify chat window');
              const customCloseButton = document.createElement('button');
              customCloseButton.className = 'custom-dify-close-btn';
              customCloseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>';
              
              customCloseButton.addEventListener('click', () => {
                chatWindow.style.display = 'none';
                const chatButton = document.getElementById('dify-chatbot-bubble-button');
                if (chatButton) chatButton.click();
              });
              
              chatWindow.appendChild(customCloseButton);
            }
          }
        }
      }, 1000);

      return observer;
    };

    // DOM読み込み完了イベントリスナーを追加
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupDifyChat);
    } else {
      setupDifyChat();
    }

    // スクリプトが読み込まれたかチェックする
    const scriptLoadCheck = setInterval(() => {
      if (window.hasOwnProperty('difyChatbotConfig')) {
        console.log('Dify chat config detected');
        clearInterval(scriptLoadCheck);
      }
    }, 500);

    // 最大15秒後に再試行
    const timeout = setTimeout(() => {
      clearInterval(scriptLoadCheck);
      if (!window.hasOwnProperty('difyChatbotConfig')) {
        console.log('Dify chat not loaded after timeout, retrying...');
        setupDifyChat();
      }
    }, 15000);

    // クリーンアップ
    return () => {
      // イベントリスナーを削除
      document.removeEventListener('DOMContentLoaded', setupDifyChat);
      
      // インターバルとタイムアウトをクリア
      clearInterval(scriptLoadCheck);
      clearTimeout(timeout);
      
      // DOM要素を削除
      const configScript = document.getElementById('dify-chat-config');
      if (configScript) configScript.remove();
      
      const mainScript = document.getElementById('yXBz3rzpDBhMgYcB');
      if (mainScript) mainScript.remove();
      
      const styleElement = document.getElementById('dify-chat-styles');
      if (styleElement) styleElement.remove();
      
      const container = document.getElementById('dify-chatbot-container');
      if (container) container.remove();
      
      console.log('Dify chat cleaned up');
    };
  }, []);

  return null;
};
