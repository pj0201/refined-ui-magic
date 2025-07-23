export const setupGlobalFunctions = () => {
  // グローバル関数の設定
  window.openChatWindow = (windowId: string) => {
    const window = document.getElementById(windowId);
    if (window) {
      window.style.display = 'flex';
    }
  };
  
  window.closeChatWindow = (windowId: string) => {
    const window = document.getElementById(windowId);
    if (window) {
      window.style.display = 'none';
    }
  };
  
  // 初期化関数を設定
  if (!window.initChatbots) {
    window.initChatbots = () => {
      console.log("globalFunctions: initChatbots が呼び出されました");
      // この関数は ChatbotInitializer で実装される
    };
  }
};