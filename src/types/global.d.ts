
// グローバル関数の型定義
interface Window {
  // チャットボット関連のグローバル関数
  startShoukiboJizokaChat?: () => void;
  startShorikikaChat?: () => void;
  openChatbot?: () => void;
  
  // 後方互換性のための関数
  openSmallBusinessChatbot?: () => void;
  openSubsidyChatbot?: () => void;
  
  // チャットボット設定
  difyChatbotConfig?: {
    token: string;
    serverUrl: string;
  };
  shoukiboJizokaChatbotConfig?: {
    token: string;
    serverUrl: string;
  };
  shorikikaChatbotConfig?: {
    token: string;
    serverUrl: string;
  };
  
  // 一般チャットボット
  difyChatbot?: {
    toggle: () => void;
    open?: () => void;
    close?: () => void;
    sendMessage?: (message: string) => void;
  };
  DifyAI?: {
    toggleUI: (show: boolean) => void;
    sendMessage?: (message: string) => void;
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
  
  // その他のフラグ
  subsidyChatbotInitialized?: boolean;
  difyInitializationAttempted?: boolean;
  difyApiProxyEnabled?: boolean;
}
