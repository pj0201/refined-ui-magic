
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
      
      /* Make close button always visible */
      #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 9999 !important;
        width: 24px !important;
        height: 24px !important;
        color: #666 !important;
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: 50% !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
      }
      
      /* Add a custom close button if the default is hidden */
      #dify-chatbot-bubble-window:not(:has(.dify-chatbot-window-close-btn:visible))::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 10px;
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6L6 18'%3E%3C/path%3E%3Cpath d='M6 6L18 18'%3E%3C/path%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
        z-index: 9999;
      }
    `;
    document.head.appendChild(difyChatbotStyle);

    // Add a MutationObserver to ensure the close button is visible
    const observer = new MutationObserver((mutations) => {
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        const closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
        if (closeButton) {
          closeButton.setAttribute('style', `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 24px !important;
            height: 24px !important;
            color: #666 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          `);
        } else {
          // If no close button is found, inject a custom one
          const customCloseButton = document.createElement('button');
          customCloseButton.className = 'custom-dify-close-btn';
          customCloseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>';
          customCloseButton.setAttribute('style', `
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 24px !important;
            height: 24px !important;
            color: #666 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            border: none !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          `);
          customCloseButton.addEventListener('click', () => {
            if (chatWindow) {
              chatWindow.style.display = 'none';
              // Trigger click on the chat button to properly close the chat
              const chatButton = document.getElementById('dify-chatbot-bubble-button');
              if (chatButton) chatButton.click();
            }
          });
          chatWindow.appendChild(customCloseButton);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Run initial check after a short delay to ensure DOM is ready
    setTimeout(() => {
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        const closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
        if (!closeButton || getComputedStyle(closeButton).display === 'none') {
          const customCloseButton = document.createElement('button');
          customCloseButton.className = 'custom-dify-close-btn';
          customCloseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>';
          customCloseButton.setAttribute('style', `
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 9999 !important;
            width: 24px !important;
            height: 24px !important;
            color: #666 !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            border: none !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          `);
          customCloseButton.addEventListener('click', () => {
            if (chatWindow) {
              chatWindow.style.display = 'none';
              // Trigger click on the chat button to properly close the chat
              const chatButton = document.getElementById('dify-chatbot-bubble-button');
              if (chatButton) chatButton.click();
            }
          });
          chatWindow.appendChild(customCloseButton);
        }
      }
    }, 2000);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(difyChatbotConfig);
      const scriptElement = document.getElementById('yXBz3rzpDBhMgYcB');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      document.head.removeChild(difyChatbotStyle);
      observer.disconnect();
    };
  }, []);

  return null;
};
