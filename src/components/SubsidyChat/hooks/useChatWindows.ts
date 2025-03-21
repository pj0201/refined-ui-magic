
import { useCallback } from "react";
import { toast } from "sonner";
import { 
  safelyCloseWindow, 
  closeOtherChatWindows 
} from "../utils/chatbotDomUtils";
import { createChatWindowContent } from "../utils/chatWindowContent";

/**
 * チャットウィンドウ操作用カスタムフック
 */
export const useChatWindows = () => {
  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('dify-chatbot-bubble-window', safelyCloseWindow);
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("dify-chatbot-bubble-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("一般チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("dify-chatbot-bubble-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("一般チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "dify-chatbot-bubble-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/UlZEhca44ZNfJtdS";
        chatbotWindow.innerHTML = createChatWindowContent("一般チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("dify-chatbot-bubble-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("一般チャットウィンドウを表示しました");
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shoukibo-jizoka-chatbot-window', safelyCloseWindow);
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("小規模持続化補助金チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "shoukibo-jizoka-chatbot-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/jpVCvswMb5KaQFLk";
        chatbotWindow.innerHTML = createChatWindowContent("小規模持続化補助金チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("shoukibo-jizoka-chatbot-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("小規模持続化補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log("省力化投資補助金チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shorikika-chatbot-window', safelyCloseWindow);
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shorikika-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("shorikika-chatbot-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("省力化投資補助金チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "shorikika-chatbot-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/kAwDqVSCnjM6ZfEY";
        chatbotWindow.innerHTML = createChatWindowContent("省力化投資補助金チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("shorikika-chatbot-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("省力化投資補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);

  return {
    openChatbot,
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};
