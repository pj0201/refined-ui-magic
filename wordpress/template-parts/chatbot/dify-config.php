
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<!-- 小規模持続化補助金のDify Chatbot -->
<script>
 window.difyChatbotConfig = {
  token: 'yXBz3rzpDBhMgYcB'
 }
</script>
<script
 src="https://udify.app/embed.min.js"
 id="yXBz3rzpDBhMgYcB"
 defer>
</script>
<style>
  /* Difyチャットボットのスタイリング - 位置とサイズを調整 */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 11rem !important;
    right: 1rem !important;
    z-index: 1000 !important;
  }
  #dify-chatbot-bubble-window {
    width: 350px !important;
    height: 500px !important;
    max-height: calc(100vh - 120px) !important;
    bottom: 5rem !important;
    right: 1rem !important;
    transform: none !important;
    margin-bottom: 0 !important;
    z-index: 1000 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }
  
  #dify-chatbot-bubble-window .dify-chatbot-window-content {
    flex: 1 !important;
    overflow: auto !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  #dify-chatbot-bubble-window .dify-chatbot-window-header {
    position: relative !important;
    z-index: 1010 !important;
  }
  
  #dify-chatbot-bubble-window .dify-chatbot-window-footer {
    position: sticky !important;
    bottom: 0 !important;
    background-color: white !important;
    padding: 12px !important;
    z-index: 1010 !important;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
    margin-top: auto !important;
  }
  
  #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
    z-index: 1020 !important;
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  @media (max-width: 640px) {
    #dify-chatbot-bubble-window {
      width: calc(100vw - 2rem) !important;
      height: 500px !important;
      max-height: calc(100vh - 120px) !important;
      bottom: 5rem !important;
      right: 1rem !important;
      left: auto !important;
    }
  }
  
  /* ラベルのスタイリング - 共通スタイル */
  .chatbot-label {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 1000;
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(226, 232, 240, 0.8);
    transition: all 0.2s ease;
  }
  .chatbot-label:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* ラベル位置を固定 */
  .small-subsidy-label {
    bottom: 15rem;
    right: 1rem;
  }
  .investment-subsidy-label {
    bottom: 7rem;
    right: 1rem;
  }
  #subsidy-chatbot .rounded-full {
    bottom: 2rem !important;
    right: 1rem !important;
    position: fixed !important;
  }
</style>
