
/**
 * Difyの設定情報
 */
export const DIFY_CONFIG = {
  apiEndpoint: "https://api.dify.ai/v1",
  publicApiKey: "pk-45fe59b28e984b81b970e756ae2bceac",
  features: {
    text_to_speech: { 
      enabled: false 
    }
  }
};

/**
 * 埋め込みコード用のDify設定コードを生成
 */
export const getDifyConfigScript = (): string => {
  return `
    window.__DIFY_CHAT_CONFIG__ = {
      apiEndpoint: "${DIFY_CONFIG.apiEndpoint}",
      publicApiKey: "${DIFY_CONFIG.publicApiKey}",
      features: {
        text_to_speech: { enabled: ${DIFY_CONFIG.features.text_to_speech.enabled} }
      }
    };
  `;
};
