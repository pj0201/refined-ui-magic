/**
 * DifyチャットボットのCSSスタイルをインポート
 */
import { getBaseStyles } from './baseStyles';
import { getChatButtonStyles } from './chatButtonStyles';
import { getChatWindowStyles } from './chatWindowStyles';
import { getCloseButtonStyles, closeButtonSvg, closeButtonHtml } from './closeButtonStyles';
import { getLabelStyles, smallSubsidyLabelHtml } from './labelStyles';

/**
 * Difyチャットボット用のCSSスタイル
 * 複数のコンポーネントをマージする
 */
export const difyChatStyles = `
  ${getBaseStyles()}
  ${getChatButtonStyles()}
  ${getChatWindowStyles()}
  ${getCloseButtonStyles()}
  ${getLabelStyles()}
`;

// 既存のエクスポートを維持
export { closeButtonSvg, closeButtonHtml, smallSubsidyLabelHtml };
