
/**
 * Difyの設定情報
 */
export const DIFY_CONFIG = {
  token: 'UlZEhca44ZNfJtdS'
};

/**
 * Dify設定用のスクリプトを生成する
 */
export const getDifyConfigScript = (): string => {
  return `
    window.difyChatbotConfig = {
      token: '${DIFY_CONFIG.token}'
    }
  `;
};
