
import { toast } from "sonner";
import { createFallbackDisplay } from "./fallbackDisplay";

/**
 * チャットボットのエラー表示を処理する関数
 * @param windowId エラーが発生したチャットウィンドウのID
 */
export const handleChatbotError = (windowId: string) => {
  try {
    const chatWindow = document.getElementById(windowId);
    if (!chatWindow) return;
    
    // エラーメッセージ要素を確認
    const errorElements = chatWindow.querySelectorAll(
      '.dify-error-message, [class*="error-message"], [class*="errorMessage"], .error, .error-container'
    );
    
    // 404エラーを特に確認
    const iframe = chatWindow.querySelector('iframe');
    let has404Error = false;
    
    if (iframe instanceof HTMLIFrameElement) {
      try {
        // iframeの内容をチェックしようとする（同一オリジンポリシーにより失敗する可能性あり）
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // 404テキストを含む要素を探す
          const error404Elements = iframeDoc.querySelectorAll('*');
          for (let i = 0; i < error404Elements.length; i++) {
            const el = error404Elements[i];
            if (el.textContent && el.textContent.includes('404')) {
              has404Error = true;
              break;
            }
          }
        }
      } catch (e) {
        // 同一オリジンポリシーによるエラーは無視
        console.log("iframeコンテンツへのアクセスが拒否されました（想定内）");
      }
    }
    
    // エラー検出：エラー要素があるか、または404が検出された場合
    if (errorElements.length > 0 || has404Error) {
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
          // iframeを非表示にする
          iframe.style.display = 'none';
          
          // タイトルの取得
          let title = "チャットボット";
          if (windowId === 'shoukibo-jizoka-chatbot-window') {
            title = "小規模持続化補助金チャット";
          } else if (windowId === 'shorikika-chatbot-window') {
            title = "省力化投資補助金チャット";
          }
          
          // フォールバック表示を作成して追加
          const fallbackElement = createFallbackDisplay(windowId, title);
          iframeContent.appendChild(fallbackElement);
          
          // サーバー接続エラーをコンソールに出力
          console.error(`チャットサーバーに接続できません: ${windowId}`);
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
    const window = document.getElementById(windowId);
    if (window && window.style.display !== 'none') {
      // 表示されているウィンドウのみエラーチェック
      setTimeout(() => handleChatbotError(windowId), 2000);
    }
  });
};

/**
 * チャットボットの接続エラーを手動でチェックする
 * @param token チャットボットのトークン
 * @returns Promise<boolean> 接続の成否
 */
export const checkChatbotConnection = async (token: string): Promise<boolean> => {
  try {
    // Dify APIの健全性チェック
    const response = await fetch('https://api.dify.ai/health', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      console.error(`Dify API健全性チェックに失敗しました: ${response.status}`);
      return false;
    }
    
    // アプリケーション情報の取得を試みる
    const appResponse = await fetch(`https://api.dify.ai/v1/provider-config`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!appResponse.ok) {
      console.error(`Difyアプリケーション情報の取得に失敗しました: ${appResponse.status}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("チャットボット接続チェック中にエラーが発生しました:", error);
    return false;
  }
};
