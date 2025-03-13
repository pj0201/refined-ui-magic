
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
}

/**
 * Dify AI API タイプ定義（最新バージョン）
 */
interface DifyAIInterface {
  toggleUI: (show: boolean) => void;
  isOpen: () => boolean;
  sendMessage: (message: string) => void;
}

declare global {
  interface Window {
    DifyChat?: DifyChatInterface;
    difyChatbot?: DifyChatbotInterface;
    DifyAI?: DifyAIInterface;
    __DIFY_CHAT_CONFIG__?: {
      apiEndpoint: string;
      publicApiKey: string;
      features: {
        text_to_speech: {
          enabled: boolean;
        };
      };
    };
  }
}

export {};
