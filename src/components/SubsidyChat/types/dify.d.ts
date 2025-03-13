
/**
 * Dify Chat API タイプ定義（古いバージョン）
 */
interface DifyChatInterface {
  toggleBubbleWindow?: (show: boolean) => void;
  onChatCleared?: () => void;
  sendMessage?: (message: string) => void;
}

/**
 * Dify Chatbot API タイプ定義（中間バージョン）
 */
interface DifyChatbotInterface {
  toggle: () => void;
  sendMessage: (message: string) => void;
  isOpen?: () => boolean;
}

/**
 * Dify AI API タイプ定義（最新バージョン v1.2.0以降）
 */
interface DifyAIInterface {
  toggleUI: (show: boolean) => void;
  isOpen: () => boolean;
  sendMessage: (message: string) => void;
  toggleBubbleWindow?: (show: boolean) => void;
  clearConversation?: () => void;
}

/**
 * Dify Chat Widget 設定
 */
interface DifyChatWidgetSettings {
  position?: 'left' | 'right';
  width?: number;
  height?: number;
  margin?: number;
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
  chatWidgetSettings?: DifyChatWidgetSettings;
}

declare global {
  interface Window {
    DifyChat?: DifyChatInterface;
    difyChatbot?: DifyChatbotInterface;
    DifyAI?: DifyAIInterface;
    __DIFY_CHAT_CONFIG__?: DifyChatConfig;
  }
}

export {};
