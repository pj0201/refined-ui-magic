
import { toast } from "sonner";
import { createFallbackDisplay } from "../../SubsidyChat/utils/fallbackDisplay";

/**
 * グローバル関数のセットアップ
 * チャットボットのグローバル関数を設定し、初期化状態を追跡します
 */
export const setupGlobalFunctions = () => {
  console.log("チャットボットグローバル関数を設定します");
  
  // 既に初期化されているか確認
  if (typeof window.startShoukiboJizokaChat === 'function' && 
      typeof window.startShorikikaChat === 'function') {
    console.log("チャットボットグローバル関数は既に設定されています");
    return true;
  }
  
  try {
    // 初期化状態を追跡する
    const chatbotInitStatus = {
      shoukiboInitialized: !!window.shoukiboJizokaChatbot,
      shorikikaInitialized: !!window.shorikika_chatbot,
      loadAttempted: true
    };
    
    // チャットボットのロードエラーイベントリスナーを設定
    document.addEventListener('chatbot-load-error', (event: any) => {
      const detail = event.detail || {};
      console.warn(`チャットボットロードエラー検出: ${detail.type || '不明'}`);
      
      if (detail.type === 'shoukibo') {
        chatbotInitStatus.shoukiboInitialized = false;
      } else if (detail.type === 'shorikika') {
        chatbotInitStatus.shorikikaInitialized = false;
      }
    });
    
    // 小規模持続化補助金チャットボットを開く関数
    window.startShoukiboJizokaChat = () => {
      console.log("小規模持続化補助金チャットボットを開きます");
      
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = document.querySelectorAll('#shorikika-chatbot-window, #mock-chat-window');
        otherWindows.forEach(window => {
          if (window && window instanceof HTMLElement && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shoukiboJizokaChatbot) {
          // ウィンドウを表示する
          const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
          if (chatWindow) {
            chatWindow.style.display = 'flex';
          }
          
          // openメソッドがあればそれを使用
          if (typeof window.shoukiboJizokaChatbot.open === 'function') {
            window.shoukiboJizokaChatbot.open();
          } else if (typeof window.shoukiboJizokaChatbot.toggle === 'function') {
            // toggleメソッドの場合はウィンドウの状態を確認
            const isVisible = chatWindow && 
                             getComputedStyle(chatWindow).display !== 'none' && 
                             getComputedStyle(chatWindow).visibility !== 'hidden';
            
            if (!isVisible) {
              window.shoukiboJizokaChatbot.toggle();
            }
          }
          return;
        }
        
        // フォールバック表示
        showFallbackChat('小規模持続化補助金AI相談', 'shoukibo-jizoka-chatbot-window');
      } catch (error) {
        console.error("小規模持続化補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
        
        // エラー時のフォールバック
        showFallbackChat('小規模持続化補助金AI相談', 'shoukibo-jizoka-chatbot-window');
      }
    };
    
    // 省力化投資補助金チャットボットを開く関数
    window.startShorikikaChat = () => {
      console.log("省力化投資補助金チャットボットを開きます");
      
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = document.querySelectorAll('#shoukibo-jizoka-chatbot-window, #mock-chat-window');
        otherWindows.forEach(window => {
          if (window && window instanceof HTMLElement && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shorikika_chatbot) {
          // ウィンドウを表示する
          const chatWindow = document.getElementById('shorikika-chatbot-window');
          if (chatWindow) {
            chatWindow.style.display = 'flex';
          }
          
          // openメソッドがあればそれを使用
          if (typeof window.shorikika_chatbot.open === 'function') {
            window.shorikika_chatbot.open();
          } else if (typeof window.shorikika_chatbot.toggle === 'function') {
            // toggleメソッドの場合はウィンドウの状態を確認
            const isVisible = chatWindow && 
                             getComputedStyle(chatWindow).display !== 'none' && 
                             getComputedStyle(chatWindow).visibility !== 'hidden';
            
            if (!isVisible) {
              window.shorikika_chatbot.toggle();
            }
          }
          return;
        }
        
        // フォールバック表示
        showFallbackChat('省力化投資補助金AI相談', 'shorikika-chatbot-window');
      } catch (error) {
        console.error("省力化投資補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
        
        // エラー時のフォールバック
        showFallbackChat('省力化投資補助金AI相談', 'shorikika-chatbot-window');
      }
    };
    
    // フォールバックチャットを表示する関数
    const showFallbackChat = (title: string, windowId: string) => {
      console.log(`フォールバックチャットを表示: ${title}`);
      
      // 既存のモックウィンドウ
      let existingWindow = document.getElementById(windowId);
      const mockWindow = document.getElementById('mock-chat-window');
      
      // モックウィンドウが既に存在する場合は表示
      if (mockWindow) {
        mockWindow.style.display = 'flex';
        return;
      }
      
      // 対象のウィンドウが存在する場合
      if (existingWindow) {
        // 内容をクリア
        existingWindow.innerHTML = '';
        existingWindow.style.display = 'flex';
        
        // 新しいフォールバック表示を作成して追加
        const fallbackContent = createFallbackDisplay(windowId, title);
        existingWindow.appendChild(fallbackContent);
        return;
      }
      
      // 新しいフォールバックウィンドウを作成
      const newFallbackWindow = document.createElement('div');
      newFallbackWindow.id = 'mock-chat-window';
      
      // スタイル設定
      newFallbackWindow.style.cssText = `
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
      
      // フォールバック内容を作成
      const fallbackContent = createFallbackDisplay(windowId, title);
      newFallbackWindow.appendChild(fallbackContent);
      
      // ボディに追加
      document.body.appendChild(newFallbackWindow);
    };
    
    // 後方互換性のための関数
    window.openSmallBusinessChatbot = window.startShoukiboJizokaChat;
    window.openSubsidyChatbot = window.startShorikikaChat;
    
    // チャットボットの初期化状態を確認
    setTimeout(() => {
      const shoukiboLoaded = !!window.shoukiboJizokaChatbot;
      const shorikikaLoaded = !!window.shorikika_chatbot;
      
      chatbotInitStatus.shoukiboInitialized = shoukiboLoaded;
      chatbotInitStatus.shorikikaInitialized = shorikikaLoaded;
      
      console.log(`チャットボット初期化状態: 小規模持続化=${shoukiboLoaded}, 省力化投資=${shorikikaLoaded}`);
      
      // 初期化に失敗した場合は警告
      if (!shoukiboLoaded || !shorikikaLoaded) {
        console.warn("一部のチャットボットの初期化に失敗しました。フォールバックモードを使用します。");
      }
      
      // 初期化完了イベントを発行
      document.dispatchEvent(new CustomEvent('chatbot-initialized', {
        detail: { shoukiboLoaded, shorikikaLoaded }
      }));
    }, 3000);
    
    return true;
  } catch (error) {
    console.error("グローバル関数のセットアップ中にエラーが発生しました:", error);
    toast.error("チャットボット機能の初期化に失敗しました");
    return false;
  }
};
