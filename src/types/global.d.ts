declare global {
  interface Window {
    // チャットボット初期化関連
    chatbotsInitialized?: boolean;
    initChatbots?: () => void;
    openChatWindow?: (windowId: string) => void;
    closeChatWindow?: (windowId: string) => void;
    
    // チャットボット関連のグローバル関数
    openShoukiboJizokaChat?: () => void;
    openShorikikaChat?: () => void;
    
    // 後方互換性のための関数（旧関数名）
    startShoukiboJizokaChat?: () => void;
    startShorikikaChat?: () => void;
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
    
    // チャットボット初期化状態
    chatbotInitialized?: boolean;
    
    // Dify AI オブジェクト
    DifyAI?: any;
  }
}

export {};
