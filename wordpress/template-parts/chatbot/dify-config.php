
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
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 6rem !important; /* 省力化投資補助金チャットボットの上に配置 - 調整済み */
    right: 1rem !important;
  }
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 40rem !important;
    bottom: 6rem !important; /* 修正: 下部の切れ目を防ぐため */
    max-height: 80vh !important; /* 修正: 画面高さの80%までに制限 */
  }
  /* ラベルのスタイリング - 位置調整 */
  .chatbot-label {
    position: fixed;
    background-color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 50;
    backdrop-filter: blur(4px);
  }
  .small-subsidy-label {
    bottom: 13rem; /* 位置調整 */
    right: 0.75rem;
  }
  .investment-subsidy-label {
    bottom: 3.5rem;
    right: 0.75rem;
  }
</style>
