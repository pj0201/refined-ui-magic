
import { toast } from "sonner";
import { openChatbot as subsidyChatbotOpen } from "@/components/SubsidyChat/SubsidyChatbot";

export const ChatbotInitializer = () => {
  /**
   * チャットボットを開くシンプルな関数
   * SubsidyChatbotの関数を呼び出す
   */
  const openChatbot = () => {
    try {
      // SubsidyChatbot の実装を使用
      subsidyChatbotOpen();
    } catch (error) {
      console.error("チャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  return { openChatbot };
};
