
/**
 * チャットボット用の基本スタイル定義
 */
export const getBaseStyles = (): string => `
  /* コンテンツが表示されることを確保 */
  #dify-chatbot-bubble-window iframe {
    flex: 1 !important;
    height: 100% !important;
    width: 100% !important;
  }
  
  /* カスタムコンテナでチャットの表示を確保 */
  #dify-chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 99995;
  }
  
  /* モバイル対応 */
  @media (max-width: 640px) {
    #dify-chatbot-bubble-window {
      width: calc(100vw - 2rem) !important;
      height: 70vh !important;
      max-height: 70vh !important;
    }
  }
`;
