
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
  /* Difyチャットボットのスタイリング - 位置を下から20remに設定 */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 20rem !important; /* 省力化投資補助金チャットボットとの間隔を広げる */
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
    background-color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 50;
    backdrop-filter: blur(4px);
  }
  /* 小規模持続化補助金ラベル - アイコンの上に配置 */
  .small-subsidy-label {
    bottom: 23rem; /* 小規模持続化補助金ラベルの位置 - アイコンの上 */
    right: 4rem; /* 右側に余裕を持たせる */
  }
  /* 省力化投資補助金ラベル - アイコンの上に配置 */
  .investment-subsidy-label {
    bottom: 7rem; /* 省力化投資補助金ラベルの位置 - アイコンの上 */
    right: 4rem; /* 右側に余裕を持たせる */
  }
</style>
