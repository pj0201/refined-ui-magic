
/**
 * 他のチャットウィンドウを閉じる関数
 */
export const closeOtherChatWindows = (keepWindowId: string, safelyCloseWindowFn: (windowId: string) => void) => {
  try {
    const windowIds = [
      'dify-chatbot-bubble-window',
      'shoukibo-jizoka-chatbot-window',
      'shorikika-chatbot-window'
    ];
    
    windowIds.forEach(id => {
      if (id !== keepWindowId) {
        const window = document.getElementById(id);
        if (window) {
          safelyCloseWindowFn(id);
        }
      }
    });
  } catch (error) {
    console.error("他のチャットウィンドウを閉じる際にエラーが発生しました:", error);
  }
};
