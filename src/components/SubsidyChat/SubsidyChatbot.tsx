
import { DifyConfig } from "./DifyConfig";

/**
 * 省力化投資補助金チャットボットコンポーネント
 * Difyチャットボットのみを表示します
 */
export const SubsidyChatbot = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Difyチャットボット設定 */}
      <DifyConfig />
      
      {/* 省力化投資補助金のラベルは
          DifyConfig内で適用されるCSSで表示されます */}
    </div>
  );
};
