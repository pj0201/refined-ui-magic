
/**
 * Dify AI API タイプ定義（最新バージョン v1.2.0以降）
 */
interface DifyAIInterface {
  toggleUI: (show: boolean) => void;
  isOpen: () => boolean;
  sendMessage: (message: string) => void;
  clearConversation?: () => void;
}

/**
 * Dify Chat Config
 */
interface DifyChatConfig {
  apiEndpoint: string;
  publicApiKey: string;
  features: {
    text_to_speech: {
      enabled: boolean;
    };
  };
}

/**
 * difyChatbot トークンベース実装の型定義
 */
interface DifyChatbotInterface {
  toggle: () => void;
  open?: () => void; // オプションのopen関数を追加
  isOpen?: boolean;
  sendMessage: (message: string) => void;
}

// 古いバージョンのDify APIも対応（後方互換性のため）
interface DifyChatInterface {
  // Legacy API methods that might be used
  toggleBubble?: () => void;
  toggleWindow?: () => void;
}

/**
 * Dify Chatbot Config トークンベース実装
 */
interface DifyChatbotConfig {
  token: string;
}

declare global {
  interface Window {
    DifyAI?: DifyAIInterface;
    __DIFY_CHAT_CONFIG__?: DifyChatConfig;
    // Legacy objects that might be used in the code
    DifyChat?: DifyChatInterface;
    difyChatbot?: DifyChatbotInterface;
    difyChatbotConfig?: DifyChatbotConfig;
  }
}

export {};
