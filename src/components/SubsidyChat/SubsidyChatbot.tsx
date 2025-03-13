
import { useEffect, useRef } from "react";
import { useDifyChat } from "./hooks/useDifyChat";
import { toast } from "@/components/ui/use-toast";

/**
 * Dify統合チャットボットコンポーネント
 * - embed.min.jsスクリプトを使用
 * - 右下に固定表示
 * - スタイルのカスタマイズ
 */
export const SubsidyChatbot = () => {
  const { isLoaded, isError } = useDifyChat();
  const containerRef = useRef<HTMLDivElement>(null);

  // 読み込み状態のロギング
  useEffect(() => {
    if (isLoaded) {
      console.log('チャットボットが正常に読み込まれました');
      toast({
        title: "チャットボットが利用可能です",
        description: "お気軽に質問してください",
        duration: 3000,
      });
    }
    
    if (isError) {
      console.error('チャットボットの読み込みに問題が発生しました');
    }
  }, [isLoaded, isError]);

  // ネットワーク状態の監視
  useEffect(() => {
    const handleOnline = () => {
      console.log('ネットワーク接続が回復しました');
      toast({
        title: "ネットワーク接続が回復しました",
        description: "チャットボットを再読み込みします",
        duration: 3000,
      });
      // 簡易的な再読み込み
      window.location.reload();
    };

    const handleOffline = () => {
      console.log('ネットワーク接続が切断されました');
      toast({
        title: "ネットワーク接続が切断されました",
        description: "チャットボットが一時的に利用できなくなる可能性があります",
        variant: "destructive",
        duration: 5000,
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // DOM操作で要素を追加する代わりに、コンテナ要素を提供
  return (
    <div 
      id="dify-chatbot-container" 
      ref={containerRef} 
      className="fixed bottom-0 right-0 z-50"
      aria-live="polite"
      aria-label="チャットボット"
    />
  );
};
