/**
 * DOM操作ユーティリティ
 */

// 要素を削除する
export const removeElement = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    console.log(`Removing element: ${id}`);
    element.remove();
  }
};

// スクリプトタグを作成する
export const createScriptTag = (
  id: string, 
  content?: string, 
  src?: string, 
  defer?: boolean, 
  async?: boolean
): HTMLScriptElement => {
  const script = document.createElement('script');
  script.id = id;
  
  if (content) {
    script.textContent = content;
  }
  
  if (src) {
    script.src = src;
    if (defer) script.defer = defer;
    if (async) script.async = async;
  }
  
  return script;
};

// スタイルタグを作成する
export const createStyleTag = (id: string, content: string): HTMLStyleElement => {
  const style = document.createElement('style');
  style.id = id;
  style.textContent = content;
  return style;
};

// チャットボットのラベルを作成する
export const createChatbotLabel = (
  id: string, 
  className: string, 
  text: string
): HTMLDivElement => {
  const label = document.createElement('div');
  label.id = id;
  label.className = className;
  label.textContent = text;
  return label;
};

// チャットボットのボタンを作成する
export const createChatbotButton = (
  id: string, 
  className: string, 
  svgContent: string, 
  clickHandler: () => void
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.id = id;
  button.className = className;
  button.innerHTML = svgContent;
  button.onclick = clickHandler;
  return button;
};

// 閉じるボタンの表示・非表示を切り替える
export const toggleCloseButton = (visible: boolean): void => {
  const closeButton = document.getElementById('chatbot-close-button');
  if (closeButton) {
    console.log(`Setting close button visibility to: ${visible ? 'visible' : 'hidden'}`);
    if (visible) {
      closeButton.classList.add('visible');
    } else {
      closeButton.classList.remove('visible');
    }
  } else {
    console.log('Close button element not found');
  }
};

// チャットボット関連要素のIDリスト
export const chatbotElementIds = [
  'dify-chat-config', 
  'yXBz3rzpDBhMgYcB', 
  'dify-custom-styles', 
  'dify-chatbot-bubble-button-1', 
  'dify-chatbot-label-1',
  'dify-chatbot-bubble-button-2', 
  'dify-chatbot-label-2',
  'chatbot-close-button'
];
