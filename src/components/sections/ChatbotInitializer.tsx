
import { toast } from "sonner";
import { openChatbot as subsidyChatbotOpen } from "@/components/SubsidyChat/SubsidyChatbot";

export const ChatbotInitializer = () => {
  /**
   * チャットボットを開くシンプルな関数
   * SubsidyChatbotの関数を呼び出す
   */
  const openChatbot = () => {
    // SubsidyChatbot の実装を使用
    subsidyChatbotOpen();
  };

  return { openChatbot };
};
