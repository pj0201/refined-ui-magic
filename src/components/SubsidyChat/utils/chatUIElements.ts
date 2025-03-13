
import { createChatbotLabel, createChatbotButton, removeElement } from './domUtils';
import '../types/dify.d.ts';

/**
 * 省力化投資補助金のメッセージを送信
 */
const sendShoroku = (): void => {
  console.log("省力化投資補助金ボタンがクリックされました");
  try {
    if (window.DifyChat && window.DifyChat.toggleBubbleWindow) {
      console.log("DifyChatが利用可能です。チャットウィンドウを開きます。");
      window.DifyChat.toggleBubbleWindow(true);
      
      if (window.DifyChat.onChatCleared) {
        console.log("チャット履歴をクリアします");
        window.DifyChat.onChatCleared();
      }
      
      // 省力化投資補助金についてのメッセージを自動送信
      setTimeout(() => {
        if (window.DifyChat?.sendMessage) {
          console.log("自動メッセージを送信: 省力化投資補助金について教えてください");
          window.DifyChat.sendMessage('省力化投資補助金について教えてください');
        } else {
          console.warn("DifyChat.sendMessageが利用できません");
          // 再試行
          setTimeout(() => {
            if (window.DifyChat?.sendMessage) {
              console.log("自動メッセージを再送信: 省力化投資補助金について教えてください");
              window.DifyChat.sendMessage('省力化投資補助金について教えてください');
            }
          }, 1000);
        }
      }, 1500);
    } else {
      console.warn("DifyChat API が利用できません");
      // イベントを通じて通知
      window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
    }
  } catch (error) {
    console.error("省力化投資補助金チャット開始中にエラーが発生しました:", error);
  }
};

/**
 * 小規模持続化補助金のメッセージを送信
 */
const sendShokibo = (): void => {
  console.log("小規模持続化補助金ボタンがクリックされました");
  try {
    if (window.DifyChat && window.DifyChat.toggleBubbleWindow) {
      console.log("DifyChatが利用可能です。チャットウィンドウを開きます。");
      window.DifyChat.toggleBubbleWindow(true);
      
      if (window.DifyChat.onChatCleared) {
        console.log("チャット履歴をクリアします");
        window.DifyChat.onChatCleared();
      }
      
      // 小規模持続化補助金についてのメッセージを自動送信
      setTimeout(() => {
        if (window.DifyChat?.sendMessage) {
          console.log("自動メッセージを送信: 小規模持続化補助金について教えてください");
          window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
        } else {
          console.warn("DifyChat.sendMessageが利用できません");
          // 再試行
          setTimeout(() => {
            if (window.DifyChat?.sendMessage) {
              console.log("自動メッセージを再送信: 小規模持続化補助金について教えてください");
              window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
            }
          }, 1000);
        }
      }, 1500);
    } else {
      console.warn("DifyChat API が利用できません");
      // イベントを通じて通知
      window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
    }
  } catch (error) {
    console.error("小規模持続化補助金チャット開始中にエラーが発生しました:", error);
  }
};

/**
 * チャットボット要素の追加
 */
export const addChatbotElements = (): void => {
  console.log("チャットボット要素をDOMに追加しています");
  
  // 既存の要素をクリーンアップ
  removeElement('chatbot-elements-container');
  removeElement('dify-chatbot-bubble-button-1');
  removeElement('dify-chatbot-label-1');
  removeElement('dify-chatbot-bubble-button-2');
  removeElement('dify-chatbot-label-2');
  
  // コンテナを作成
  const container = document.createElement('div');
  container.id = 'chatbot-elements-container';
  container.className = 'chatbot-elements-container';
  container.style.position = 'fixed';
  container.style.right = '20px';
  container.style.top = '20px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '11px';
  container.style.zIndex = '2147483646';
  
  // 1つ目のラベル（省力化投資補助金）
  const label1 = createChatbotLabel(
    'dify-chatbot-label-1', 
    'dify-chatbot-label', 
    '省力化投資補助金の質問はコチラ'
  );
  container.appendChild(label1);
  
  // 1つ目のチャットボタン（省力化投資補助金）- ヘルプアイコン
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    sendShoroku
  );
  container.appendChild(button1);
  
  // 2つ目のラベル（小規模持続化補助金）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2', 
    'dify-chatbot-label', 
    '小規模持続化補助金の質問はコチラ'
  );
  container.appendChild(label2);
  
  // 2つ目のチャットボタン（小規模持続化補助金）- メッセージアイコン
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    sendShokibo
  );
  container.appendChild(button2);
  
  // コンテナをDOMに追加
  document.body.appendChild(container);
  console.log("チャットボット要素がDOMに追加されました");
  
  // スタイルが確実に適用されるよう明示的に設定
  applyExplicitStyles();
};

/**
 * スタイルを明示的に適用する補助関数
 */
const applyExplicitStyles = () => {
  const buttons = document.querySelectorAll('.dify-chatbot-bubble-button');
  buttons.forEach(button => {
    if (button instanceof HTMLElement) {
      button.style.width = '32px';
      button.style.height = '32px';
      button.style.borderRadius = '50%';
      button.style.backgroundColor = '#1C64F2';
      button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.zIndex = '2147483647';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.opacity = '1';
      button.style.visibility = 'visible';
      button.style.position = 'relative';
      button.style.marginLeft = 'auto';
    }
  });
  
  const labels = document.querySelectorAll('.dify-chatbot-label');
  labels.forEach(label => {
    if (label instanceof HTMLElement) {
      label.style.color = '#22C55E';
      label.style.fontSize = '11px';
      label.style.textAlign = 'center';
      label.style.letterSpacing = '1px';
      label.style.lineHeight = '1.2';
      label.style.whiteSpace = 'nowrap';
      label.style.zIndex = '2147483646';
      label.style.fontWeight = 'normal';
      label.style.textShadow = '0 0 1px rgba(0,0,0,0.2)';
      label.style.transition = 'color 0.3s ease';
      label.style.width = '32px';
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.justifyContent = 'center';
      label.style.writingMode = 'vertical-rl';
      label.style.textOrientation = 'upright';
      label.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      label.style.padding = '8px 0';
      label.style.borderRadius = '16px';
      label.style.position = 'relative';
      label.style.marginLeft = 'auto';
      label.style.marginBottom = '2px';
    }
  });
};
