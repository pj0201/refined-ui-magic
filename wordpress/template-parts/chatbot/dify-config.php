
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
    bottom: 11rem !important; /* 小規模持続化補助金アイコン位置 - 固定位置 */
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

  /* 垂直方向の配置をすべて固定位置に設定 */
  /* 小規模持続化補助金ラベル - 一番上に配置 */
  .small-subsidy-label {
    bottom: 15rem; /* 固定位置 */
    right: 1rem;
  }
  /* 省力化投資補助金ラベル - 小規模持続化補助金アイコンの下に配置 */
  .investment-subsidy-label {
    bottom: 7rem; /* 固定位置 */
    right: 1rem;
  }
  /* カスタマイズしたChatbotのボタン位置 - 位置を調整 */
  #subsidy-chatbot .rounded-full {
    bottom: 3rem !important; /* 修正: 4rem → 3rem に変更 */
    right: 1rem !important;
    position: fixed !important;
  }

  /* 小さい画面用の調整 - 固定位置を維持 */
  @media (max-height: 600px) {
    .small-subsidy-label {
      bottom: 15rem; /* 固定位置を維持 */
    }
    .investment-subsidy-label {
      bottom: 7rem; /* 固定位置を維持 */
    }
    #dify-chatbot-bubble-button {
      bottom: 11rem !important; /* 固定位置を維持 */
    }
    #subsidy-chatbot .rounded-full {
      bottom: 3rem !important; /* 修正: 4rem → 3rem に変更 */
    }
  }
</style>
