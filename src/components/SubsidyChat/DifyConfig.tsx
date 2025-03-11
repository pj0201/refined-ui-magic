
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // Add Dify chatbot script with new token
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

    // Add a more aggressive style enforcement mechanism with a periodic check
    const adjustDifyElements = () => {
      // Adjust the chat button
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (chatButton) {
        Object.assign(chatButton.style, {
          position: 'fixed',
          bottom: '11rem',
          right: '1rem',
          zIndex: '1000',
          backgroundColor: '#1C64F2'
        });
      }
      
      // Adjust the chat window
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        Object.assign(chatWindow.style, {
          width: '24rem',
          height: '40rem',
          maxHeight: '80vh',
          maxWidth: 'calc(100vw - 32px)',
          bottom: '5rem',
          right: '1rem',
          transform: 'none',
          marginBottom: '0',
          zIndex: '1001'
        });
      }
    };
    
    // Run adjustment immediately and then periodically
    adjustDifyElements();
    const intervalId = setInterval(adjustDifyElements, 500);
    
    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      adjustDifyElements();
    });
    
    // Start observing the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Clean up on component unmount
    return () => {
      clearInterval(intervalId);
      observer.disconnect();
      try {
        document.head.removeChild(difyChatbotConfig);
        document.body.removeChild(difyChatbotScript);
        document.head.removeChild(difyChatbotStyle);
      } catch (e) {
        console.error('Error removing Dify chatbot scripts:', e);
      }
    };
  }, []);

  return null;
};
