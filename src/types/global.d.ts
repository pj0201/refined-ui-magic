// グローバル関数の型定義
interface Window {
  // チャットボット関連のグローバル関数
  startShoukiboJizokaChat?: () => void;
  startShorikikaChat?: () => void;
  
  // 後方互換性のための関数
  openSmallBusinessChatbot?: () => void;
  openSubsidyChatbot?: () => void;
  openChatbot?: (message?: string) => void;
  
  // テスト用の基本チャットウィンドウ
  openBasicWindow?: () => void;
  
  // チャットボット設定
  shoukiboJizokaChatbotConfig?: {
    token: string;
    serverUrl: string;
  };
  shorikikaChatbotConfig?: {
    token: string;
    serverUrl: string;
  };
  
  // 小規模持続化補助金チャットボット
  shoukiboJizokaChatbot?: {
    toggle: () => void;
    open?: () => void;
    close?: () => void;
    sendMessage?: (message: string) => void;
  };
  
  // 省力化投資補助金チャットボット
  shorikika_chatbot?: {
    toggle: () => void;
    open?: () => void;
    close?: () => void;
    sendMessage?: (message: string) => void;
  };
  
  // Dify一般チャットボット
  difyChatbot?: {
    toggle: () => void;
    open?: () => void;
    close?: () => void;
    sendMessage?: (message: string) => void;
  };
}
