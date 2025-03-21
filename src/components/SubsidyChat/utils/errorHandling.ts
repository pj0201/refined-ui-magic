
import { toast } from "sonner";

/**
 * チャットボットのエラー表示を処理する関数
 * @param windowId エラーが発生したチャットウィンドウのID
 */
export const handleChatbotError = (windowId: string) => {
  try {
    const chatWindow = document.getElementById(windowId);
    if (!chatWindow) return;
    
    // エラーメッセージ要素を非表示にする
    const errorElements = chatWindow.querySelectorAll(
      '.dify-error-message, [class*="error-message"], [class*="errorMessage"]'
    );
    
    if (errorElements.length > 0) {
      console.log(`${windowId}でエラーを検出しました。フォールバック表示に切り替えます`);
      
      // エラー要素を隠す
      errorElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
        }
      });
      
      // iframeコンテンツを取得
      const iframe = chatWindow.querySelector('iframe');
      if (iframe instanceof HTMLIFrameElement) {
        const iframeContent = iframe.parentElement;
        if (iframeContent) {
          // フォールバックメッセージを表示
          const fallbackDiv = document.createElement('div');
          fallbackDiv.id = 'chat-fallback-message';
          fallbackDiv.innerHTML = `
            <p>チャットボットの読み込み中にエラーが発生しました。</p>
            <p>しばらく待ってから再度お試しください。</p>
            <button class="retry-button" style="
              background-color: #1C64F2;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              margin-top: 12px;
              cursor: pointer;
            ">もう一度試す</button>
          `;
          
          // リトライボタンのイベントリスナー
          setTimeout(() => {
            const retryButton = fallbackDiv.querySelector('.retry-button');
            if (retryButton) {
              retryButton.addEventListener('click', () => {
                // ウィンドウを閉じて再度開く処理
                chatWindow.remove();
                toast.info("チャットボットを再読み込みしています...");
                
                // ウィンドウIDに応じた再読み込み関数を呼び出す
                setTimeout(() => {
                  if (windowId === 'dify-chatbot-bubble-window' && window.openChatbot) {
                    window.openChatbot();
                  } else if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
                    window.startShoukiboJizokaChat();
                  } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
                    window.startShorikikaChat();
                  }
                }, 500);
              });
            }
          }, 100);
          
          // フォールバックメッセージを追加
          iframeContent.appendChild(fallbackDiv);
          
          // iframeを非表示にする
          iframe.style.display = 'none';
        }
      }
    }
  } catch (error) {
    console.error("エラー処理中に例外が発生しました:", error);
  }
};

/**
 * すべてのチャットウィンドウのエラーをチェックする
 */
export const checkAllChatbotErrors = () => {
  const chatWindowIds = [
    'dify-chatbot-bubble-window', 
    'shoukibo-jizoka-chatbot-window', 
    'shorikika-chatbot-window'
  ];
  
  chatWindowIds.forEach(windowId => {
    setTimeout(() => handleChatbotError(windowId), 2000);
    setTimeout(() => handleChatbotError(windowId), 5000);
  });
};
