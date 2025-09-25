
import { useState, useEffect } from "react";
import { Topic, topics as fallbackTopics } from "@/data/topicsData";
import { toast } from "sonner";

export const useTopicData = () => {
  const [topics, setTopics] = useState<Topic[]>(fallbackTopics);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 開発環境ではフォールバックデータを使用する
        const isDevelopment = import.meta.env.DEV;
        if (isDevelopment) {
          console.log("開発モード: フォールバックトピックデータを使用しています");
          setTopics(fallbackTopics);
          setIsLoading(false);
          return;
        }

        // 本番環境ではAPIを呼び出す
        const response = await fetch('/api/topics');
        
        if (!response.ok) {
          throw new Error(`トピックの取得に失敗しました: ${response.status}`);
        }
        
        // レスポンスのContent-Typeをチェック
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.warn("APIエンドポイントがJSON以外のレスポンスを返しました", contentType);
          throw new Error("APIエンドポイントがJSON以外のレスポンスを返しました");
        }
        
        const data = await response.json();
        
        // データの構造を検証
        if (!Array.isArray(data)) {
          console.warn("APIからの応答が配列ではありません", data);
          throw new Error("予期しないデータ形式を受信しました");
        }
        
        setTopics(data);
        console.log("トピックの取得に成功しました:", data);
      } catch (err) {
        console.error("トピックの取得中にエラーが発生しました:", err);
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
        console.log("フォールバックトピックデータを使用します");
        // すでに初期状態としてフォールバックデータが設定されているので何もしない
        toast.error("トピックの読み込みに失敗しました", {
          description: "デフォルトの情報を表示しています"
        });
      } finally {
        setIsLoading(false);
      }
    };

    // フォールバックデータを使用
    console.log("フォールバックトピックデータを使用しています");
    setTopics(fallbackTopics);
    setIsLoading(false);
  }, []);

  return { topics, isLoading, error };
};
