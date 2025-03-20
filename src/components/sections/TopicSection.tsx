
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useChatbotInitializer } from "./ChatbotInitializer";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const [chatbotsReady, setChatbotsReady] = useState(false);
  const chatInitialized = useRef(false);
  
  // useChatbotInitializerフックから関数を取得
  const { 
    openChatbot, 
    startShorikikaChat, 
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  } = useChatbotInitializer();

  // チャットボットの読み込み状態を監視
  useEffect(() => {
    if (isDifyLoaded || isShoukiboLoaded || isShorikikaLoaded) {
      setChatbotsReady(true);
    }
  }, [isDifyLoaded, isShoukiboLoaded, isShorikikaLoaded]);

  // 遅延初期化 - コンポーネント初回マウント時の初期化を保証
  useEffect(() => {
    // すでに初期化済みの場合は何もしない
    if (chatInitialized.current) return;
    
    // チャットボットの初期化関数
    const initChatbots = () => {
      console.log("TopicSection: チャットボットの遅延初期化を実行します");
      
      // グローバル関数が設定されていることを確認
      if (!window.openChatbot) {
        window.openChatbot = openChatbot;
      }
      
      if (!window.startShoukiboJizokaChat) {
        window.startShoukiboJizokaChat = startShoukiboJizokaChat;
      }
      
      if (!window.startShorikikaChat) {
        window.startShorikikaChat = startShorikikaChat;
      }
      
      chatInitialized.current = true;
    };
    
    // 初期化を1秒遅延して実行 (DOM要素の追加待機)
    const timer = setTimeout(initChatbots, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat]);

  // トピックに応じたチャットボットを開く関数
  const handleTopicChat = useCallback((content: string) => {
    console.log(`TopicSection: トピックチャット開始: ${content}`);
    
    try {
      // 小規模持続化補助金のチャットボットを開く
      if (content.includes('小規模持続化補助金')) {
        console.log('TopicSection: 小規模持続化補助金のチャットボットを開きます');
        
        // グローバル関数が設定されていることを確認
        if (typeof window.startShoukiboJizokaChat === 'function') {
          window.startShoukiboJizokaChat();
        } else if (typeof startShoukiboJizokaChat === 'function') {
          startShoukiboJizokaChat();
        } else {
          console.error('TopicSection: 小規模持続化補助金チャット関数が見つかりません');
          toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
        }
        return;
      }
      
      // 省力化投資補助金のチャットボットを開く
      if (content.includes('省力化投資補助金')) {
        console.log('TopicSection: 省力化投資補助金のチャットボットを開きます');
        
        // グローバル関数が設定されていることを確認
        if (typeof window.startShorikikaChat === 'function') {
          window.startShorikikaChat();
        } else if (typeof startShorikikaChat === 'function') {
          startShorikikaChat();
        } else {
          console.error('TopicSection: 省力化投資補助金チャット関数が見つかりません');
          toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
        }
        return;
      }
      
      // 一般チャットボットを開く（デフォルト）
      console.log('TopicSection: 一般チャットボットを開きます');
      
      // グローバル関数が設定されていることを確認
      if (typeof window.openChatbot === 'function') {
        window.openChatbot();
      } else if (typeof openChatbot === 'function') {
        openChatbot();
      } else {
        console.error('TopicSection: 一般チャット関数が見つかりません');
        toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
      }
    } catch (error) {
      console.error('TopicSection: チャットボットを開く際にエラーが発生しました:', error);
      toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
    }
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat]);

  if (isLoading) return <div className="loading">トピックを読み込み中...</div>;
  
  // Properly handle the error case, ensuring that error is not null
  if (error !== null) {
    // Create a local errorMessage variable that TypeScript knows is not null
    let errorMessage = "不明なエラーが発生しました";
    
    if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        errorMessage = (error as Error).message;
      } else {
        errorMessage = String(error);
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return <div className="error">エラーが発生しました: {errorMessage}</div>;
  }
  
  if (!topics || topics.length === 0) return <div className="no-topics">トピックがありません</div>;

  return (
    <section className="topics-section">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">よくあるご質問</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicItem 
              key={topic.id} 
              {...topic} 
              openChatbot={() => handleTopicChat(topic.content)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
