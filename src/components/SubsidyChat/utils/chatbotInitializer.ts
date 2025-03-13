
// Re-export all functionality needed by SubsidyChatbot.tsx to maintain API compatibility
import { initializeDifyScripts, cleanup } from './scriptInitializer';
import { addChatbotElements } from './chatUIElements';
import '../types/dify.d.ts';

// Export all the functions that are used by SubsidyChatbot.tsx
export { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
};
