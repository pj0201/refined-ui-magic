
import { setupDomObserver, performInitialElementsCheck } from "../../utils/domObserver";
import { createCloseButton } from "./styleManager";

/**
 * スタイルを適用する関数
 */
export const applyStyles = (): MutationObserver => {
  // DOM変更を監視するObserverを設定
  const observer = setupDomObserver();

  // 初期チェックを実行
  performInitialElementsCheck();

  // 閉じるボタンをチェックして再作成する
  const checkCloseButton = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      createCloseButton(chatWindow);
    }
  };

  // 定期的に閉じるボタンの存在をチェック (頻度を下げる)
  setInterval(checkCloseButton, 2000);

  return observer;
};
