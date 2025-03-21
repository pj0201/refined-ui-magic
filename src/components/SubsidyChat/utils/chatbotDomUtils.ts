
import { safelyCloseWindow } from "./windowClose";
import { hideBlueButton } from "./buttonHide";
import { setupChatbotStyles } from "./styleSetup";
import { addCustomCloseButtons } from "./closeButtons";
import { closeOtherChatWindows } from "./windowManagement";

// 他のファイルからアクセスできるように、すべての関数をエクスポート
export {
  safelyCloseWindow,
  hideBlueButton,
  setupChatbotStyles,
  addCustomCloseButtons,
  closeOtherChatWindows
};
