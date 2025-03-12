
import { 
  createScriptTag, 
  createStyleTag, 
  createChatbotLabel, 
  createChatbotButton, 
  removeElement, 
  chatbotElementIds 
} from './domUtils';
import { getChatbotStyles } from '../styles/chatbotStyles';

/**
 * チャットボット要素追加
 */
export const addChatbotElements = (): void => {
  console.log("Adding chatbot elements to the DOM");
  
  // 既存の要素を削除（念のため）
  chatbotElementIds.forEach(id => removeElement(id));
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);

  // 1つ目のラベル（省力化投資補助金の質問はコチラ）
  const label1 = createChatbotLabel(
    'dify-chatbot-label-1',
    'dify-chatbot-label',
    '省力化投資補助金の質問はコチラ'
  );
  document.body.appendChild(label1);

  // 1つ目のチャットボタン（省力化投資補助金）
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1',
    'dify-chatbot-bubble-button',
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    () => {
      console.log("省力化投資補助金 chatbot button clicked");
      // クリックされたときにDifyのボタンをクリックする
      const difyButton = document.querySelector('dify-chatbot-button');
      if (difyButton) {
        console.log("Triggering click on Dify button");
        // @ts-ignore
        difyButton.click();
      } else {
        console.log("Dify button not found, opening fallback chat window");
        // フォールバック処理
      }
    }
  );
  document.body.appendChild(button1);

  // 2つ目のラベル（小規模持続化補助金の質問はコチラ）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2',
    'dify-chatbot-label',
    '小規模持続化補助金の質問はコチラ'
  );
  document.body.appendChild(label2);

  // 2つ目のチャットボタン（小規模持続化補助金）
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2',
    'dify-chatbot-bubble-button',
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    () => {
      console.log("小規模持続化補助金 chatbot button clicked");
      // 現状では同じDifyボタンをクリックするが、将来的に別のチャットサービスを使用する可能性もある
      const difyButton = document.querySelector('dify-chatbot-button');
      if (difyButton) {
        console.log("Triggering click on Dify button");
        // @ts-ignore
        difyButton.click();
      } else {
        console.log("Dify button not found, opening fallback chat window");
        // フォールバック処理
      }
    }
  );
  document.body.appendChild(button2);
};

/**
 * Difyチャットボットスクリプト初期化
 */
export const initializeDifyScripts = (
  onScriptLoad: () => void, 
  onScriptError: (e: Error | Event) => void
): void => {
  // 設定スクリプトを追加
  const configScript = createScriptTag(
    'dify-chat-config',
    `
      window.difyChatbotConfig = { 
        token: 'yXBz3rzpDBhMgYcB'
      };
    `
  );
  document.head.appendChild(configScript);

  // メインスクリプトを追加
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    undefined,
    'https://udify.app/embed.min.js',
    true,
    true
  );
  
  mainScript.onload = () => {
    console.log("Dify script loaded successfully");
    onScriptLoad();
  };
  
  mainScript.onerror = onScriptError;
  
  document.body.appendChild(mainScript);
};

/**
 * チャットボット要素のクリーンアップ
 */
export const cleanup = (): void => {
  console.log("Cleaning up subsidy chatbot elements");
  chatbotElementIds.forEach(id => removeElement(id));
};
