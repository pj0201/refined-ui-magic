
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // Add Dify chatbot script with the provided token
    const difyChatbotConfig = document.createElement('script');
    difyChatbotConfig.textContent = `window.difyChatbotConfig = { token: 'yXBz3rzpDBhMgYcB' }`;
    document.head.appendChild(difyChatbotConfig);

    const difyChatbotScript = document.createElement('script');
    difyChatbotScript.src = 'https://udify.app/embed.min.js';
    difyChatbotScript.id = 'yXBz3rzpDBhMgYcB';
    difyChatbotScript.defer = true;
    document.body.appendChild(difyChatbotScript);

    // Improved styling for Dify chatbot with !important to ensure styles are applied
    const difyChatbotStyle = document.createElement('style');
    difyChatbotStyle.textContent = `
      /* Chat button styling */
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        bottom: 11rem !important;
        right: 1rem !important;
        z-index: 1000 !important;
        position: fixed !important;
      }
      
      /* Chat window styling */
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 5rem !important;
        right: 1rem !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 1001 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }

      /* Ensure content is visible */
      #dify-chatbot-bubble-window iframe {
        flex: 1 !important;
        height: 100% !important;
        width: 100% !important;
      }
    `;
    document.head.appendChild(difyChatbotStyle);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(difyChatbotConfig);
      document.body.removeChild(difyChatbotScript);
      document.head.removeChild(difyChatbotStyle);
    };
  }, []);

  return null;
};
