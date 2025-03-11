
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // Add Dify chatbot script
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
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
      }
      
      /* Chat window styling */
      #dify-chatbot-bubble-window {
        position: fixed !important;
        width: 350px !important;
        height: 500px !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 5rem !important;
        right: 1rem !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 1001 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        background-color: white !important;
      }
      
      /* Chat content area */
      #dify-chatbot-bubble-window .dify-chatbot-window-content {
        flex: 1 !important;
        overflow: auto !important;
        display: flex !important;
        flex-direction: column !important;
        padding: 16px !important;
      }
      
      /* Chat header */
      #dify-chatbot-bubble-window .dify-chatbot-window-header {
        position: relative !important;
        z-index: 1010 !important;
        padding: 16px !important;
        border-bottom: 1px solid #e5e7eb !important;
        background-color: white !important;
      }
      
      /* Chat footer/input area */
      #dify-chatbot-bubble-window .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 12px !important;
        z-index: 1010 !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
        margin-top: auto !important;
        border-top: 1px solid #e5e7eb !important;
      }
      
      /* Close button */
      #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
        z-index: 1020 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        width: 28px !important;
        height: 28px !important;
        border-radius: 50% !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        background-color: transparent !important;
        border: none !important;
        color: #64748b !important;
      }
      
      /* Ensure input area is always visible */
      #dify-chatbot-bubble-window .dify-chatbot-window-footer textarea,
      #dify-chatbot-bubble-window .dify-chatbot-window-footer input {
        width: 100% !important;
        padding: 8px 12px !important;
        border-radius: 4px !important;
        border: 1px solid #e5e7eb !important;
        background-color: white !important;
        margin-bottom: 0 !important;
      }
      
      /* Send button */
      #dify-chatbot-bubble-window .dify-chatbot-window-footer button[type="submit"] {
        position: absolute !important;
        right: 20px !important;
        bottom: 20px !important;
        z-index: 1020 !important;
      }
      
      /* Mobile responsiveness */
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window {
          width: calc(100vw - 32px) !important;
          height: 60vh !important;
          max-height: 70vh !important;
          bottom: 5rem !important;
          right: 1rem !important;
          left: auto !important;
        }
        
        #dify-chatbot-bubble-window .dify-chatbot-window-content {
          padding: 12px !important;
        }
        
        #dify-chatbot-bubble-window .dify-chatbot-window-footer {
          padding: 8px !important;
        }
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
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#1C64F2',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        });
      }
      
      // Adjust the chat window
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        Object.assign(chatWindow.style, {
          position: 'fixed',
          width: '350px',
          height: '500px',
          maxHeight: '80vh',
          maxWidth: 'calc(100vw - 32px)',
          bottom: '5rem',
          right: '1rem',
          transform: 'none',
          marginBottom: '0',
          zIndex: '1001',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white'
        });
        
        // Find and adjust the close button
        const closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
        if (closeButton) {
          Object.assign((closeButton as HTMLElement).style, {
            zIndex: '1020',
            display: 'flex',
            visibility: 'visible',
            opacity: '1',
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#64748b'
          });
        }
        
        // Adjust content area
        const contentArea = chatWindow.querySelector('.dify-chatbot-window-content');
        if (contentArea) {
          Object.assign((contentArea as HTMLElement).style, {
            flex: '1',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px'
          });
        }
        
        // Adjust footer/input area
        const footerArea = chatWindow.querySelector('.dify-chatbot-window-footer');
        if (footerArea) {
          Object.assign((footerArea as HTMLElement).style, {
            position: 'sticky',
            bottom: '0',
            backgroundColor: 'white',
            padding: '12px',
            zIndex: '1010',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            marginTop: 'auto',
            borderTop: '1px solid #e5e7eb'
          });
          
          // Find and adjust input
          const input = footerArea.querySelector('textarea, input');
          if (input) {
            Object.assign((input as HTMLElement).style, {
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              marginBottom: '0'
            });
          }
        }
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
