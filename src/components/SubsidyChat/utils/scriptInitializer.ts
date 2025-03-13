
import { createScriptTag, createStyleTag, removeElement } from './domUtils';
import { getChatbotStyles } from '../styles/chatbotStyles';
import '../types/dify.d.ts';

/**
 * Difyスクリプトの初期化
 */
export const initializeDifyScripts = (
  onSuccess: () => void, 
  onError: (error: Event | Error) => void
): void => {
  console.log("Initializing Dify scripts");
  
  // 既存の要素をクリーンアップ
  cleanup();
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);
  
  // Difyの設定スクリプト
  const configScript = createScriptTag(
    'dify-chat-config',
    `window.__DIFY_CHAT_CONFIG__ = {
      apiEndpoint: "https://cloud.dify.ai", // udify.app から cloud.dify.ai に変更
      publicApiKey: "app-KDYnIQfxqkXo7a89jFOplm4c",
      features: {
        text_to_speech: { enabled: false }
      }
    };`
  );
  document.head.appendChild(configScript);
  
  // 複数のスクリプトURLを試みる
  const scriptUrls = [
    "https://cloud.dify.ai/js/web-client-chat.js",  // 主要なDifyホスティング
    "https://udify.app/js/web-client-chat.js",      // オリジナルのURL
    "https://cdn.jsdelivr.net/npm/@dify/web-client-chat@latest/dist/web-client-chat.js" // CDNバックアップ
  ];
  
  // 各URLが有効かチェック
  checkScriptUrls(scriptUrls, 0, onSuccess, onError);
};

/**
 * 複数のスクリプトURLを順次チェックする再帰関数
 */
const checkScriptUrls = (
  urls: string[],
  index: number,
  onSuccess: () => void,
  onError: (error: Event | Error) => void
) => {
  if (index >= urls.length) {
    console.error("すべてのスクリプトURLのロードに失敗しました");
    onError(new Error("すべてのDifyスクリプトURLにアクセスできません"));
    return;
  }
  
  const currentUrl = urls[index];
  console.log(`スクリプトURL (${index + 1}/${urls.length}) をチェック中: ${currentUrl}`);
  
  // URLのアクセス可能性をチェック
  fetch(currentUrl, { method: 'HEAD', mode: 'no-cors' })
    .then(response => {
      console.log(`Script URL ${currentUrl} response status: ${response.status}`);
      
      if (response.ok || response.status === 0) { // no-corsモードでは0が返ることがある
        console.log(`スクリプトURL ${currentUrl} にアクセスできました、スクリプトをロードします`);
        loadMainScript(currentUrl, onSuccess, (error) => {
          console.warn(`${currentUrl} からのスクリプトロードに失敗: ${error}、次のURLを試みます`);
          checkScriptUrls(urls, index + 1, onSuccess, onError);
        });
      } else {
        console.warn(`スクリプトURL ${currentUrl} は応答コード ${response.status} を返しました、次のURLを試みます`);
        checkScriptUrls(urls, index + 1, onSuccess, onError);
      }
    })
    .catch(err => {
      console.warn(`スクリプトURL ${currentUrl} のチェックに失敗: ${err}、次のURLを試みます`);
      // fetch自体が失敗した場合でも、スクリプトのロードを試みる（CORSの問題かもしれない）
      loadMainScript(currentUrl, onSuccess, (error) => {
        checkScriptUrls(urls, index + 1, onSuccess, onError);
      });
    });
};

/**
 * メインスクリプトをロードする
 */
const loadMainScript = (
  scriptUrl: string,
  onSuccess: () => void,
  onError: (error: Event | Error) => void
) => {
  console.log(`スクリプトをロード中: ${scriptUrl}`);
  
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    null,
    scriptUrl,
    true,
    true
  );
  
  // タイムアウト設定
  const timeoutId = setTimeout(() => {
    console.error(`スクリプトロードがタイムアウトしました: ${scriptUrl}`);
    mainScript.remove(); // 未完了のスクリプトタグを削除
    onError(new Error(`スクリプトロードがタイムアウトしました: ${scriptUrl}`));
  }, 10000); // 10秒タイムアウト
  
  // 正常にロードされた場合
  mainScript.onload = (): void => {
    clearTimeout(timeoutId);
    console.log(`Difyスクリプト ${scriptUrl} が正常にロードされました`);
    
    // window.DifyChat が実際に存在するか確認
    if (window.DifyChat) {
      console.log("DifyChat オブジェクトが利用可能です:", Object.keys(window.DifyChat));
      onSuccess();
    } else {
      console.error("スクリプトはロードされましたが、DifyChat オブジェクトが見つかりません");
      onError(new Error("DifyChat オブジェクトが見つかりません"));
    }
  };
  
  // エラーが発生した場合
  mainScript.onerror = (error: Event): void => {
    clearTimeout(timeoutId);
    console.error(`Difyスクリプト ${scriptUrl} のロードエラー:`, error);
    onError(error);
  };
  
  document.head.appendChild(mainScript);
};

/**
 * チャットボット要素のクリーンアップ
 */
export const cleanup = (): void => {
  console.log("Cleaning up chatbot elements");
  
  const elementsToRemove = [
    'dify-chat-config', 
    'yXBz3rzpDBhMgYcB', 
    'dify-custom-styles', 
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-label-1',
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-label-2',
    'chatbot-elements-container',
    'dify-fallback-container' // フォールバックメッセージコンテナも削除
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
};
