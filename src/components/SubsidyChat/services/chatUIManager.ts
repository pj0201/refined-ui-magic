
/**
 * Re-export UI management functions from modular files
 */
import { applyStyles } from "./ui/uiManager";
import { setupChatButton } from "./ui/buttonManager";
import { ensureChatWindowVisibility } from "./ui/styleManager";

export {
  applyStyles,
  setupChatButton,
  ensureChatWindowVisibility
};
