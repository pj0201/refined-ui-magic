
import { useCallback } from "react";
import { toast } from "sonner";

/**
 * チャットウィンドウ操作用カスタムフック（シンプル化版）
 */
export const useChatWindows = () => {
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます");
    
    try {
      // グローバルオブジェクトを使用する
      if (window.shoukiboJizokaChatbot) {
        console.log("グローバルオブジェクトを使用して小規模持続化補助金チャットを開きます");
        
        // 他のチャットウィンドウを閉じる
        if (window.shorikika_chatbot?.toggle) {
          window.shorikika_chatbot.toggle();
        }
        
        // openメソッドを優先して使用
        if (typeof window.shoukiboJizokaChatbot.open === 'function') {
          window.shoukiboJizokaChatbot.open();
        } else if (typeof window.shoukiboJizokaChatbot.toggle === 'function') {
          window.shoukiboJizokaChatbot.toggle();
        }
        
        console.log("小規模持続化補助金チャットボット表示リクエスト完了");
        return;
      }
      
      console.log("小規模持続化補助金チャットボットが初期化されていません。フォールバックを使用します。");
      
      // フォールバックとしてモックインターフェースを表示
      showFallbackChatInterface('小規模持続化補助金AI相談');
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log("省力化投資補助金チャットボットを開きます");
    
    try {
      // グローバルオブジェクトを使用する
      if (window.shorikika_chatbot) {
        console.log("グローバルオブジェクトを使用して省力化投資補助金チャットを開きます");
        
        // 他のチャットウィンドウを閉じる
        if (window.shoukiboJizokaChatbot?.toggle) {
          window.shoukiboJizokaChatbot.toggle();
        }
        
        // openメソッドを優先して使用
        if (typeof window.shorikika_chatbot.open === 'function') {
          window.shorikika_chatbot.open();
        } else if (typeof window.shorikika_chatbot.toggle === 'function') {
          window.shorikika_chatbot.toggle();
        }
        
        console.log("省力化投資補助金チャットボット表示リクエスト完了");
        return;
      }
      
      console.log("省力化投資補助金チャットボットが初期化されていません。フォールバックを使用します。");
      
      // フォールバックとしてモックインターフェースを表示
      showFallbackChatInterface('省力化投資補助金AI相談');
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);

  // フォールバックチャットインターフェースを表示する関数
  const showFallbackChatInterface = (title: string) => {
    console.log(`フォールバックチャットインターフェースを表示: ${title}`);
    
    // 既存のモックウィンドウを確認
    let mockWindow = document.getElementById('mock-chat-window');
    if (!mockWindow) {
      // モックウィンドウの作成
      mockWindow = document.createElement('div');
      mockWindow.id = 'mock-chat-window';
      mockWindow.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        width: 380px;
        height: 600px;
        max-height: 80vh;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        z-index: 99999;
        overflow: hidden;
      `;
      
      // ヘッダーの作成
      const header = document.createElement('div');
      header.style.cssText = `
        background-color: #1C64F2;
        padding: 15px;
        color: white;
        font-weight: bold;
        position: relative;
      `;
      header.innerText = title;
      
      // 閉じるボタンの作成
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '×';
      closeButton.style.cssText = `
        position: absolute;
        right: 10px;
        top: 10px;
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      closeButton.onclick = () => {
        mockWindow?.remove();
      };
      
      // コンテンツの作成
      const content = document.createElement('div');
      content.style.cssText = `
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      `;
      
      // メッセージの追加
      const message = document.createElement('div');
      message.style.cssText = `
        background-color: #f0f0f0;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        align-self: flex-start;
        max-width: 80%;
      `;
      message.innerText = 'こんにちは！AI相談チャットです。現在、技術的な問題によりチャットボットが読み込めません。ページを再読み込みするか、後ほどお試しください。';
      
      // 入力エリアの作成
      const inputArea = document.createElement('div');
      inputArea.style.cssText = `
        padding: 15px;
        border-top: 1px solid #eee;
        display: flex;
      `;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'メッセージを入力...';
      input.disabled = true;
      input.style.cssText = `
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 10px;
      `;
      
      const sendButton = document.createElement('button');
      sendButton.innerText = '送信';
      sendButton.disabled = true;
      sendButton.style.cssText = `
        background-color: #1C64F2;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: not-allowed;
        opacity: 0.5;
      `;
      
      // 要素の追加
      header.appendChild(closeButton);
      inputArea.appendChild(input);
      inputArea.appendChild(sendButton);
      content.appendChild(message);
      
      mockWindow.appendChild(header);
      mockWindow.appendChild(content);
      mockWindow.appendChild(inputArea);
      
      document.body.appendChild(mockWindow);
    } else {
      // 既存のモックウィンドウを表示
      mockWindow.style.display = 'flex';
    }
  };

  return {
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};
