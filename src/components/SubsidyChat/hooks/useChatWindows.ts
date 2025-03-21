
import { useCallback } from "react";
import { toast } from "sonner";

/**
 * チャットウィンドウ操作用カスタムフック（シンプル化版）
 */
export const useChatWindows = () => {
  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます");
    
    try {
      // Difyのグローバルオブジェクトを使用する
      if (window.difyChatbot) {
        console.log("Difyグローバルオブジェクトを使用して一般チャットを開きます");
        
        // 他のチャットボットを閉じる試み
        if (window.shoukiboJizokaChatbot?.toggle) {
          window.shoukiboJizokaChatbot.toggle();
        }
        if (window.shorikika_chatbot?.toggle) {
          window.shorikika_chatbot.toggle();
        }
        
        // openメソッドを優先して使用
        if (typeof window.difyChatbot.open === 'function') {
          window.difyChatbot.open();
        } else if (typeof window.difyChatbot.toggle === 'function') {
          window.difyChatbot.toggle();
        }
        
        console.log("一般チャットボット表示リクエスト完了");
        return;
      }
      
      console.error("Difyチャットボットが初期化されていません");
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます");
    
    try {
      // グローバルオブジェクトを使用する
      if (window.shoukiboJizokaChatbot) {
        console.log("グローバルオブジェクトを使用して小規模持続化補助金チャットを開きます");
        
        // 他のチャットボットを閉じる試み
        if (window.difyChatbot?.toggle) {
          window.difyChatbot.toggle();
        }
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
      
      // フォールバック: スクリプトタグが作成する新しいチャットボット
      const scriptId = 'shoukibo-jizoka-chatbot-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.defer = true;
        script.src = 'https://udify.app/embed.js';
        script.dataset.chatbotConfig = JSON.stringify({
          api_url: 'https://api.dify.ai/v1',
          chat_path: '/jpVCvswMb5KaQFLk',
          container_id: 'shoukibo-jizoka-chatbot',
          theme: 'auto',
          default_opening: true,
          position: 'right'
        });
        document.head.appendChild(script);
        console.log("小規模持続化補助金チャットボットスクリプトを追加しました");
      } else {
        toast.error("チャットボットの初期化が必要です。ページを再読み込みしてください。");
      }
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
        
        // 他のチャットボットを閉じる試み
        if (window.difyChatbot?.toggle) {
          window.difyChatbot.toggle();
        }
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
      
      // フォールバック: スクリプトタグが作成する新しいチャットボット
      const scriptId = 'shorikika-chatbot-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.defer = true;
        script.src = 'https://udify.app/embed.js';
        script.dataset.chatbotConfig = JSON.stringify({
          api_url: 'https://api.dify.ai/v1',
          chat_path: '/kAwDqVSCnjM6ZfEY',
          container_id: 'shorikika-chatbot',
          theme: 'auto',
          default_opening: true,
          position: 'right'
        });
        document.head.appendChild(script);
        console.log("省力化投資補助金チャットボットスクリプトを追加しました");
      } else {
        toast.error("チャットボットの初期化が必要です。ページを再読み込みしてください。");
      }
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
