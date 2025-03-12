
import { DifyConfig } from "./DifyConfig";

/**
 * 省力化投資補助金チャットボットコンポーネント
 * Difyチャットボットのみを表示します - 軽量化バージョン
 */
export const SubsidyChatbot = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DifyConfig />
    </div>
  );
};
