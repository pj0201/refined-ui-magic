
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

declare global {
  interface Window {
    DifyAI?: DifyAIInterface;
    __DIFY_CHAT_CONFIG__?: DifyChatConfig;
  }
}

export {};
