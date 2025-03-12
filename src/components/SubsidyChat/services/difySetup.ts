
/**
 * Re-export all the functionality from the new files
 * to maintain backward compatibility
 */
import { setupDifyChat, monitorChatbotState } from './chatInit';
import { applyStyles as applyDifyChatStyles, setupChatButton, ensureChatWindowVisibility } from './chatUIManager';

export {
  setupDifyChat,
  monitorChatbotState,
  applyDifyChatStyles,
  setupChatButton,
  ensureChatWindowVisibility
};
