
/**
 * Difyスクリプトのフォールバック実装
 * 外部CDNスクリプトの読み込みに失敗した場合のバックアップとして機能します
 */

export const createFallbackScript = (): string => {
  return `
  // フォールバックスクリプト - DifyChatの簡易実装
  (function() {
    console.log("フォールバックDifyスクリプトを初期化しています");
    
    if (window.DifyChat) {
      console.log("DifyChatオブジェクトはすでに存在します");
      return;
    }
    
    // モックDifyChatオブジェクトの作成
    window.DifyChat = {
      init: function(config) {
        console.log("DifyChat.init が呼び出されました", config);
        this.config = config;
        return this;
      },
      onReady: function(callback) {
        console.log("DifyChat.onReady が呼び出されました");
        if (callback && typeof callback === 'function') {
          setTimeout(callback, 100);
        }
        return this;
      },
      resetHistory: function() {
        console.log("DifyChat.resetHistory が呼び出されました");
        return this;
      },
      sendMessage: function(message) {
        console.log("DifyChat.sendMessage が呼び出されました:", message);
        this._showChatWindow();
        this._appendUserMessage(message);
        this._appendBotMessage("申し訳ありませんが、現在チャットボットサービスに接続できません。後ほど再試行するか、メールでお問い合わせください: hori@planjoy.net");
        return this;
      },
      toggleBubble: function() {
        console.log("DifyChat.toggleBubble が呼び出されました");
        this._showChatWindow();
        return this;
      },
      // 内部ヘルパーメソッド
      _showChatWindow: function() {
        console.log("チャットウィンドウを表示中");
        let bubbleWindow = document.getElementById('dify-chatbot-bubble-window');
        
        if (!bubbleWindow) {
          bubbleWindow = document.createElement('div');
          bubbleWindow.id = 'dify-chatbot-bubble-window';
          bubbleWindow.style.position = 'fixed';
          bubbleWindow.style.bottom = '100px';
          bubbleWindow.style.right = '20px';
          bubbleWindow.style.width = '380px';
          bubbleWindow.style.height = '600px';
          bubbleWindow.style.maxHeight = '80vh';
          bubbleWindow.style.borderRadius = '12px';
          bubbleWindow.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          bubbleWindow.style.zIndex = '2147483647';
          bubbleWindow.style.overflow = 'hidden';
          bubbleWindow.style.backgroundColor = 'white';
          bubbleWindow.style.display = 'flex';
          bubbleWindow.style.flexDirection = 'column';
          
          // タイトルバー
          const titleBar = document.createElement('div');
          titleBar.style.padding = '16px';
          titleBar.style.borderBottom = '1px solid #e5e7eb';
          titleBar.style.display = 'flex';
          titleBar.style.justifyContent = 'space-between';
          titleBar.style.alignItems = 'center';
          
          const title = document.createElement('h3');
          title.textContent = 'PLANNINGJOY チャット';
          title.style.margin = '0';
          title.style.fontSize = '16px';
          title.style.fontWeight = 'bold';
          
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '&times;';
          closeButton.style.background = 'none';
          closeButton.style.border = 'none';
          closeButton.style.fontSize = '20px';
          closeButton.style.cursor = 'pointer';
          closeButton.style.padding = '0 8px';
          closeButton.onclick = function() {
            bubbleWindow.style.display = 'none';
          };
          
          titleBar.appendChild(title);
          titleBar.appendChild(closeButton);
          
          // メッセージコンテナ
          const messageContainer = document.createElement('div');
          messageContainer.id = 'dify-messages-container';
          messageContainer.style.flex = '1';
          messageContainer.style.overflowY = 'auto';
          messageContainer.style.padding = '16px';
          
          // 入力フォーム
          const inputForm = document.createElement('form');
          inputForm.style.padding = '16px';
          inputForm.style.borderTop = '1px solid #e5e7eb';
          inputForm.style.display = 'flex';
          
          const textInput = document.createElement('input');
          textInput.type = 'text';
          textInput.placeholder = 'メッセージを入力...';
          textInput.style.flex = '1';
          textInput.style.padding = '8px 12px';
          textInput.style.border = '1px solid #e5e7eb';
          textInput.style.borderRadius = '4px';
          textInput.style.marginRight = '8px';
          
          const sendButton = document.createElement('button');
          sendButton.type = 'submit';
          sendButton.textContent = '送信';
          sendButton.style.padding = '8px 16px';
          sendButton.style.backgroundColor = '#1C64F2';
          sendButton.style.color = 'white';
          sendButton.style.border = 'none';
          sendButton.style.borderRadius = '4px';
          sendButton.style.cursor = 'pointer';
          
          inputForm.appendChild(textInput);
          inputForm.appendChild(sendButton);
          
          inputForm.onsubmit = function(e) {
            e.preventDefault();
            if (textInput.value.trim()) {
              window.DifyChat.sendMessage(textInput.value.trim());
              textInput.value = '';
            }
          };
          
          bubbleWindow.appendChild(titleBar);
          bubbleWindow.appendChild(messageContainer);
          bubbleWindow.appendChild(inputForm);
          
          document.body.appendChild(bubbleWindow);
        } else {
          bubbleWindow.style.display = 'flex';
        }
      },
      _appendUserMessage: function(text) {
        const messageContainer = document.getElementById('dify-messages-container');
        if (!messageContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '16px';
        messageDiv.style.display = 'flex';
        messageDiv.style.justifyContent = 'flex-end';
        
        const message = document.createElement('div');
        message.textContent = text;
        message.style.backgroundColor = '#1C64F2';
        message.style.color = 'white';
        message.style.padding = '8px 12px';
        message.style.borderRadius = '8px';
        message.style.maxWidth = '80%';
        
        messageDiv.appendChild(message);
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      },
      _appendBotMessage: function(text) {
        const messageContainer = document.getElementById('dify-messages-container');
        if (!messageContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '16px';
        messageDiv.style.display = 'flex';
        messageDiv.style.justifyContent = 'flex-start';
        
        const message = document.createElement('div');
        message.textContent = text;
        message.style.backgroundColor = '#f3f4f6';
        message.style.padding = '8px 12px';
        message.style.borderRadius = '8px';
        message.style.maxWidth = '80%';
        
        messageDiv.appendChild(message);
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    };
    
    console.log("フォールバックDifyスクリプトが初期化されました");
    
    // DOMContentLoadedイベントを発火（すでに完了していた場合）
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
    }
  })();
  `;
};
