
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
    bottom: 10rem !important; /* 省力化投資補助金チャットボットとの間隔を広げる */
    right: 1rem !important;
  }
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 40rem !important;
    bottom: 4rem !important; /* 省力化投資補助金チャットボットと同じ位置に表示 */
    right: 1rem !important;
    max-height: 70vh !important; /* 画面高さの70%までに制限して表示領域を確保 */
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
    bottom: 16rem; /* 小規模持続化補助金ラベルの位置を調整 - アイコンに近づける */
    right: 4rem; /* 右側も調整 */
  }
  .investment-subsidy-label {
    bottom: 3.5rem;
    right: 0.75rem;
  }
</style>
