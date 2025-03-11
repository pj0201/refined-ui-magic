
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // Add Dify chatbot script with the provided token
    const difyChatbotConfig = document.createElement('script');
    difyChatbotConfig.textContent = `window.difyChatbotConfig = { token: 'UlZEhca44ZNfJtdS' }`;
    document.head.appendChild(difyChatbotConfig);

    const difyChatbotScript = document.createElement('script');
    difyChatbotScript.src = 'https://udify.app/embed.min.js';
    difyChatbotScript.id = 'UlZEhca44ZNfJtdS';
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
