
import { toast } from "sonner";
import { createFallbackDisplay } from "./fallbackDisplay";

/**
 * CORS関連のエラーを処理する関数
 */
export const handleCORSError = () => {
  console.log("CORS問題を検出しました。プロキシモードに切り替えます");
  
  try {
    // CORSエラーを回避するためのプロキシURLを設定
    const proxyUrl = "https://corsproxy.io/?";
    
    // Difyスクリプトを取得
    const difyScripts = document.querySelectorAll('script[src*="dify"]');
    
    // Difyスクリプトが見つかれば、プロキシ経由に変更
    if (difyScripts.length > 0) {
      difyScripts.forEach(script => {
        // 現在のsrc属性を取得
        const originalSrc = script.getAttribute('src');
        if (originalSrc) {
          // すでにプロキシを使用している場合はスキップ
          if (!originalSrc.includes('corsproxy.io')) {
            // 直接スクリプト再読み込み
            script.remove(); // 既存のスクリプトを削除
            
            // 新しいスクリプトを作成
            const newScript = document.createElement('script');
            newScript.src = 'https://cdn.jsdelivr.net/npm/@dify-ai/chatbot/dist/index.min.js';
            newScript.async = true;
            newScript.defer = true;
            newScript.crossOrigin = 'anonymous';
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
      document.head.appendChild(newScript);
      console.log("CDN経由のDifyスクリプトを追加しました");
    }
    
    // API接続確認リクエストもプロキシ経由に変更
    window.difyApiProxyEnabled = true;
    
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
    // プロキシ設定を確認
    const useProxy = window.difyApiProxyEnabled || false;
    const baseUrl = useProxy ? "https://corsproxy.io/?https://api.dify.ai" : "https://api.dify.ai";
    
    // Dify APIの健全性チェック
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      referrerPolicy: 'no-referrer',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      console.error(`Dify API健全性チェックに失敗しました: ${response.status}`);
      
      // CORSエラーの場合はプロキシモードに切り替え
      if (!useProxy && (response.status === 0 || response.type === 'opaque')) {
        console.log("CORS制限により接続失敗。プロキシモードを有効にして再試行します");
        window.difyApiProxyEnabled = true;
        return await checkApiConnection();
      }
      
      return false;
    }
    
    console.log("Dify API接続確認: 成功");
    return true;
  } catch (error) {
    console.error("API接続確認中にエラーが発生しました:", error);
    
    // エラーメッセージでCORS問題を検出
    const errorString = String(error);
    if (errorString.includes('CORS') || errorString.includes('Failed to fetch')) {
      console.log("CORS制限を検出。プロキシモードを有効にして再試行します");
      if (!window.difyApiProxyEnabled) {
        window.difyApiProxyEnabled = true;
        return await checkApiConnection();
      }
    }
    
    return false;
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
