
/**
 * 他のチャットウィンドウを閉じる関数
 * @param currentWindowId 開いたままにするウィンドウのID
 */
export const closeOtherChatWindows = (currentWindowId: string) => {
  try {
    const windowIds = [
      'dify-chatbot-bubble-window',
      'shoukibo-jizoka-chatbot-window',
      'shorikika-chatbot-window'
    ];
    
    windowIds.forEach(id => {
      if (id !== currentWindowId) {
        const window = document.getElementById(id);
        if (window) {
          window.style.display = 'none';
        }
      }
    });
  } catch (error) {
    console.error("他のチャットウィンドウを閉じる際にエラーが発生しました:", error);
  }
};
