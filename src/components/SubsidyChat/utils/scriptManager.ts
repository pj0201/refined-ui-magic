
/**
 * ユーティリティ関数: スクリプトが既に存在するかを確認
 */
export const scriptExists = (id: string): boolean => {
  return !!document.getElementById(id);
};

/**
 * ユーティリティ関数: スクリプト要素の作成
 */
export const createScript = (
  id: string, 
  src?: string, 
  content?: string, 
  attributes: Record<string, string> = {}
): HTMLScriptElement => {
  const script = document.createElement('script');
  script.id = id;
  
  if (src) {
    script.src = src;
  }
  
  if (content) {
    script.textContent = content;
  }
  
  // 追加の属性を設定
  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  
  return script;
};

/**
 * ユーティリティ関数: スタイル要素の作成
 */
export const createStyle = (id: string, cssContent: string): HTMLStyleElement => {
  const style = document.createElement('style');
  style.id = id;
  style.textContent = cssContent;
  return style;
};

/**
 * ユーティリティ関数: DOM要素の作成
 */
export const createElement = (
  tagName: string, 
  id: string, 
  attributes: Record<string, string> = {}
): HTMLElement => {
  const element = document.createElement(tagName);
  element.id = id;
  
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  return element;
};
