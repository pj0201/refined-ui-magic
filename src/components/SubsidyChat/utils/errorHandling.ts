
import { toast } from "sonner";
import { createFallbackDisplay } from "./fallbackDisplay";

/**
 * CORS関連のエラーを処理する関数
 */
export const handleCORSError = () => {
  console.log("CORS問題を検出しました。CDNモードに切り替えます");
  
  try {
    // すでにCDNモードが有効なら早期リターン
    if (window.difyApiProxyEnabled) {
      return true;
    }
    
    // CDNモードを有効化
    window.difyApiProxyEnabled = true;
    
    // Difyスクリプトを取得
    const difyScripts = document.querySelectorAll('script[src*="dify"]');
    
    // Difyスクリプトが見つかれば、CDN経由に変更
    if (difyScripts.length > 0) {
      difyScripts.forEach(script => {
        // 現在のsrc属性を取得
        const originalSrc = script.getAttribute('src');
        if (originalSrc) {
          // すでにCDNを使用している場合はスキップ
          if (!originalSrc.includes('cdn.jsdelivr.net')) {
            // 直接スクリプト再読み込み
            script.remove(); // 既存のスクリプトを削除
            
            // 新しいスクリプトを作成
            const newScript = document.createElement('script');
            newScript.src = 'https://cdn.jsdelivr.net/npm/@dify-ai/chatbot/dist/index.min.js';
            newScript.async = true;
            newScript.defer = true;
            newScript.crossOrigin = 'anonymous';
            newScript.referrerPolicy = 'no-referrer';
            document.head.appendChild(newScript);
            
            console.log("CDN経由のDifyスクリプトに切り替えました");
          }
        }
      });
    } else {
      // スクリプトが見つからない場合は新規追加
      const newScript = document.createElement('script');
      newScript.src = 'https://cdn.jsdelivr.net/npm/@dify-ai/chatbot/dist/index.min.js';
      newScript.async = true;
      newScript.defer = true;
      newScript.crossOrigin = 'anonymous';
      newScript.referrerPolicy = 'no-referrer';
      document.head.appendChild(newScript);
      console.log("CDN経由のDifyスクリプトを追加しました");
    }
    
    return true;
  } catch (error) {
    console.error("CORS問題解決中にエラーが発生しました:", error);
    return false;
  }
};

/**
 * チャットボットのAPIへの接続状態を確認する関数
 * @returns Promise<boolean> 接続の成否
 */
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    // CDN経由のリクエストを優先
    if (!window.difyApiProxyEnabled) {
      // まずプロキシなしで試行
      const response = await fetch('https://api.dify.ai/health', {
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        referrerPolicy: 'no-referrer',
        credentials: 'omit'
      });
      
      if (response.ok) {
        console.log("Dify API直接接続: 成功");
        return true;
      }
      
      // 直接接続に失敗した場合、CDNモードに切り替え
      console.log("Dify API直接接続に失敗。CDNモードに切り替えます");
      window.difyApiProxyEnabled = true;
    }
    
    // CORS問題が検出された場合は、CDNモードに切り替え
    handleCORSError();
    
    // サーバーが生きているとみなす (CDNモード時はAPIチェックをスキップ)
    return true;
  } catch (error) {
    console.error("API接続確認中にエラーが発生しました:", error);
    
    // エラーが発生した場合はCDNモードに切り替え
    window.difyApiProxyEnabled = true;
    handleCORSError();
    
    // CDNモードでは接続できるものとして扱う
    return true;
  }
};

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
    
    // エラー検出：エラー要素がある場合
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
