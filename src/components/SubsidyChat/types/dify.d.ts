
/**
 * Dify Chat API タイプ定義
 */
interface DifyChatInterface {
  toggleBubbleWindow?: (show: boolean) => void;
  onChatCleared?: () => void;
}

declare global {
  interface Window {
    DifyChat?: DifyChatInterface;
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
