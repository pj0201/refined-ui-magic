
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
        
        // 他のチャットボットを閉じる試み
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
      
      console.error("小規模持続化補助金チャットボットが初期化されていません");
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
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
      
      console.error("省力化投資補助金チャットボットが初期化されていません");
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);

  return {
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};
