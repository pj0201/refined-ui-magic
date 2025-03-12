
/**
 * チャットウィンドウのスタイルを適用
 */
export const applyChatWindowStyle = (chatWindow: HTMLElement): void => {
  // チャットウィンドウのスタイルを強制的に適用
  chatWindow.style.cssText = `
    display: flex !important;
    flex-direction: column !important;
    width: 350px !important;
    height: 500px !important;
    max-height: 80vh !important;
    position: fixed !important;
    bottom: 5rem !important;
    right: 1rem !important;
    z-index: 9995 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    background-color: white !important;
    overflow: hidden !important;
  `;
  
  // モバイル対応
  if (window.innerWidth <= 640) {
    chatWindow.style.width = 'calc(100vw - 2rem)';
    chatWindow.style.height = '70vh';
  }
};

/**
 * チャットボタンのスタイルを適用
 */
export const applyChatButtonStyle = (chatButton: HTMLElement): void => {
  chatButton.style.cssText = `
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 9995 !important;
    position: fixed !important;
    bottom: 11rem !important;
    right: 1rem !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    background-color: #1C64F2 !important;
    cursor: pointer !important;
    color: white !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  `;

  // アイコンの設定
  if (!chatButton.innerHTML.includes('svg')) {
    chatButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
  }
};
