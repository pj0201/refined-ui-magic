
import { createFallbackScript } from '../fallback/fallbackScript';
import { createScriptTag, createStyleTag } from './domUtils';
import { toast } from "@/components/ui/use-toast";
import { getChatbotStyles } from '../styles/chatbotStyles';

// Difyスクリプトのソースリスト
const scriptSources = [
  'https://cdn.jsdelivr.net/npm/@dify/web-client-chat@latest/dist/web-client-chat.js',
  'https://udify.app/js/web-client-chat.js',
  'https://cloud.dify.ai/js/web-client-chat.js'
];

let currentSourceIndex = 0;
let maxRetries = 3;
let currentRetry = 0;

/**
 * スクリプトURLをチェックする再帰関数
 */
const checkScriptUrls = (
  onSuccess: (scriptUrl: string) => void,
  onError: (error: Error) => void,
  sourceIndex: number = 0,
  retry: number = 0
): void => {
  if (sourceIndex >= scriptSources.length) {
    if (retry < maxRetries) {
      // 全URLを試した後、再試行
      console.log(`すべてのスクリプトURLの試行に失敗しました。再試行します (${retry + 1}/${maxRetries})`);
      setTimeout(() => {
        checkScriptUrls(onSuccess, onError, 0, retry + 1);
      }, 1000);
    } else {
      // 最大再試行回数に達した場合、フォールバックを使用
      console.log("すべてのスクリプトURLのロードに失敗しました。フォールバックスクリプトを使用します。");
      const fallbackScript = createScriptTag(
        'dify-fallback-script',
        createFallbackScript()
      );
      document.head.appendChild(fallbackScript);
      onSuccess('fallback');
    }
    return;
  }

  const url = scriptSources[sourceIndex];
  console.log(`スクリプトURL (${sourceIndex + 1}/${scriptSources.length}) をチェック中: ${url}`);

  // HEAD リクエストでURLをチェック
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, true);
  xhr.timeout = 5000; // 5秒タイムアウト

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(`スクリプトURL ${url} は有効です。スクリプトを読み込みます。`);
      loadScript(url, onSuccess, () => {
        // このURLでのスクリプト読み込みに失敗した場合、次のURLを試す
        console.warn(`${url} からのスクリプトロードに失敗: [object Event]、次のURLを試みます`);
        checkScriptUrls(onSuccess, onError, sourceIndex + 1, retry);
      });
    } else {
      console.warn(`スクリプトURL ${url} は利用できません (ステータス: ${xhr.status})、次のURLを試みます`);
      checkScriptUrls(onSuccess, onError, sourceIndex + 1, retry);
    }
  };

  xhr.onerror = function() {
    console.warn(`スクリプトURL ${url} へのアクセスに失敗しました、次のURLを試みます`);
    checkScriptUrls(onSuccess, onError, sourceIndex + 1, retry);
  };

  xhr.ontimeout = function() {
    console.warn(`スクリプトURL ${url} へのアクセスがタイムアウトしました、次のURLを試みます`);
    checkScriptUrls(onSuccess, onError, sourceIndex + 1, retry);
  };

  try {
    xhr.send();
  } catch (e) {
    console.warn(`スクリプトURL ${url} へのリクエスト送信に失敗しました、次のURLを試みます`);
    checkScriptUrls(onSuccess, onError, sourceIndex + 1, retry);
  }
};

/**
 * 利用可能なURLからスクリプトを読み込む
 */
const loadScript = (
  url: string,
  onSuccess: (scriptUrl: string) => void,
  onError: () => void
): void => {
  const mainScript = createScriptTag('dify-chat-script', undefined, url, true, true);

  mainScript.onload = function() {
    console.log(`スクリプト ${url} が正常に読み込まれました`);
    onSuccess(url);
  };

  mainScript.onerror = function(e) {
    console.error(`Difyスクリプト ${url} のロードエラー:`, e);
    // スクリプトタグを削除
    mainScript.remove();
    onError();
  };

  document.head.appendChild(mainScript);
};

/**
 * Difyスクリプトを初期化
 */
export const initializeDifyScripts = (
  onScriptLoaded: (success: boolean, source?: string) => void
): void => {
  console.log("Initializing Dify scripts");

  // スクリプトがすでに読み込まれている場合は早期リターン
  if (window.DifyChat) {
    console.log("DifyChatオブジェクトはすでに存在します");
    onScriptLoaded(true, 'existing');
    return;
  }

  // スタイルを追加
  const styleElement = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(styleElement);

  // スクリプト読み込み開始
  currentSourceIndex = 0;
  currentRetry = 0;

  // スクリプトURLをチェックして読み込み
  checkScriptUrls(
    (scriptUrl) => {
      console.log(`Difyスクリプトが正常に読み込まれました (ソース: ${scriptUrl})`);
      
      // スクリプト読み込み後に少し遅延させてから成功コールバックを呼び出す
      setTimeout(() => {
        onScriptLoaded(true, scriptUrl);
      }, 500);
    },
    (error) => {
      console.error("すべてのDifyスクリプトURLにアクセスできません", error);
      
      // エラーを表示
      toast({
        title: "チャットボットの読み込みに失敗しました",
        description: "後ほど再試行するか、別のブラウザをお試しください",
        variant: "destructive",
        duration: 5000,
      });
      
      onScriptLoaded(false);
    }
  );
};

/**
 * クリーンアップ - 追加したスクリプトとスタイル要素を削除
 */
export const cleanup = (): void => {
  console.log("Cleaning up Dify scripts and styles");
  
  // スクリプト要素の削除
  const scriptElement = document.getElementById('dify-chat-script');
  if (scriptElement) {
    scriptElement.remove();
    console.log("Difyスクリプト要素を削除しました");
  }
  
  const fallbackScript = document.getElementById('dify-fallback-script');
  if (fallbackScript) {
    fallbackScript.remove();
    console.log("フォールバックスクリプト要素を削除しました");
  }
  
  // スタイル要素の削除
  const styleElement = document.getElementById('dify-custom-styles');
  if (styleElement) {
    styleElement.remove();
    console.log("Difyスタイル要素を削除しました");
  }
  
  // チャットボット関連のDOMをクリーンアップ
  const container = document.getElementById('chatbot-elements-container');
  if (container) {
    container.remove();
    console.log("チャットボット要素コンテナを削除しました");
  }
  
  const bubbleWindow = document.getElementById('dify-chatbot-bubble-window');
  if (bubbleWindow) {
    bubbleWindow.remove();
    console.log("チャットボットウィンドウを削除しました");
  }
};

