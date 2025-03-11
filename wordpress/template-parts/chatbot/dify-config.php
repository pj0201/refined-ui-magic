
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
  /* Difyチャットボットのスタイリング - 位置を調整 */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 13rem !important; /* 小規模持続化補助金アイコン位置 */
    right: 1rem !important;
  }
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 40rem !important;
    bottom: 4rem !important;
    right: 1rem !important;
    max-height: 70vh !important; /* 画面高さの70%までに制限して表示領域を確保 */
  }
  /* ラベルのスタイリング - 共通スタイル */
  .chatbot-label {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 50;
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
  /* 小規模持続化補助金ラベル - アイコンの上に配置 */
  .small-subsidy-label {
    bottom: 16rem; /* 小規模持続化補助金ラベルの位置 */
    right: 1rem; /* 右側のアイコンに揃える */
  }
  /* 省力化投資補助金ラベル - アイコンの上に配置 */
  .investment-subsidy-label {
    bottom: 8rem; /* 省力化投資補助金ラベルの位置 */
    right: 1rem; /* 右側のアイコンに揃える */
  }
  /* カスタマイズしたChatbotのボタン位置 - 一番下に配置 */
  #subsidy-chatbot .rounded-full {
    bottom: 5rem !important;
    right: 1rem !important;
    position: fixed !important;
  }
</style>
