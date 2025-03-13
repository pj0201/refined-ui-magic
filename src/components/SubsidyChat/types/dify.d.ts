
/**
 * Dify Chat API タイプ定義
 */
interface DifyChatInterface {
  toggleBubbleWindow?: (show: boolean) => void;
  onChatCleared?: () => void;
  sendMessage?: (message: string) => void;
}

/**
 * Dify Chatbot API タイプ定義 (新しい埋め込みAPI)
 */
interface DifyChatbotInterface {
  toggle: () => void;
  sendMessage: (message: string) => void;
}

declare global {
  interface Window {
    DifyChat?: DifyChatInterface;
    difyChatbot?: DifyChatbotInterface;
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
