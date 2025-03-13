
/**
 * Difyの設定情報
 */
export const DIFY_CONFIG = {
  token: 'UlZEhca44ZNfJtdS'
};

/**
 * 埋め込みコード用のDify設定コードを生成
 */
export const getDifyConfigScript = (): string => {
  return `
    window.difyChatbotConfig = {
      token: "${DIFY_CONFIG.token}"
    };
  `;
};
