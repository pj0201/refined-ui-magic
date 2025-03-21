
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { 
  safelyCloseWindow, 
  closeOtherChatWindows 
} from "../utils/chatbotDomUtils";
import { createChatWindowContent } from "../utils/chatWindowContent";
import { handleChatbotError, checkAllChatbotErrors } from "../utils/errorHandling";

/**
 * チャットウィンドウ操作用カスタムフック
 */
export const useChatWindows = () => {
  // 定期的にエラーチェックを実行
  useEffect(() => {
    // 初回チェック
    const initialCheck = setTimeout(checkAllChatbotErrors, 3000);
    
    // 定期チェック
    const intervalCheck = setInterval(checkAllChatbotErrors, 10000);
    
    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalCheck);
    };
  }, []);

  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('dify-chatbot-bubble-window', safelyCloseWindow);
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("dify-chatbot-bubble-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("一般チャットウィンドウを新規作成します");
      
      // ウィンドウの作成
      const chatbotWindow = document.createElement("div");
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
      // udify.app → api.dify.ai に変更し、正しいトークンを設定
      const iframeSrc = "https://api.dify.ai/embed/UlZEhca44ZNfJtdS";
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
      
      // エラーチェック
      setTimeout(() => handleChatbotError('dify-chatbot-bubble-window'), 2000);
      
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
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("小規模持続化補助金チャットウィンドウを新規作成します");
      
      // ウィンドウの作成
      const chatbotWindow = document.createElement("div");
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
      
      // HTMLコンテンツを設定 - 完全なURLを指定
      // udify.app → api.dify.ai に変更し、正しいトークンを設定
      const iframeSrc = "https://api.dify.ai/embed/jpVCvswMb5KaQFLk";
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
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("shorikika-chatbot-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("省力化投資補助金チャットウィンドウを新規作成します");
      
      // ウィンドウの作成
      const chatbotWindow = document.createElement("div");
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
      
      // HTMLコンテンツを設定 - 完全なURLを指定
      // udify.app → api.dify.ai に変更し、正しいトークンを設定
      const iframeSrc = "https://api.dify.ai/embed/kAwDqVSCnjM6ZfEY";
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
