
import { toast } from "sonner";

/**
 * チャットウィンドウを安全に閉じる関数
 */
export const safelyCloseWindow = (windowId: string) => {
  try {
    const chatWindow = document.getElementById(windowId);
    if (chatWindow) {
      // ウィンドウを完全に削除
      chatWindow.remove();
      console.log(`チャットウィンドウ ${windowId} を安全に閉じました`);
      
      // スタイルクリーンアップ
      document.body.classList.remove('chatbot-window-active');
      
      // 関連する追加要素も削除
      const relatedElements = document.querySelectorAll(`[data-related-to="${windowId}"]`);
      relatedElements.forEach(el => el.remove());
      
      // イベントを発行して閉じられたことを通知
      window.dispatchEvent(new CustomEvent('chatbot-window-closed', { detail: { windowId } }));
    }
  } catch (error) {
    console.error(`チャットウィンドウ ${windowId} を閉じる際にエラーが発生しました:`, error);
  }
};
