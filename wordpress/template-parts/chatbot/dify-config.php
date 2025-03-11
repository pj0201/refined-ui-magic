
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
    bottom: 11rem !important; /* 小規模持続化補助金アイコン位置 - 固定位置 */
    right: 1rem !important;
  }
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 700px !important; /* 高さをさらに増加 */
    min-height: 650px !important; /* 最小高さをさらに増加 */
    max-height: 80vh !important; /* 画面高さの80%に制限 */
    bottom: 5rem !important; /* 下部の位置を調整 - より上部に */
    right: 1rem !important;
    transform: translateY(0) !important; /* 位置の強制調整 */
    margin-bottom: 1.5rem !important; /* 下部のマージンを増加 */
  }
  
  /* チャット領域の表示調整 */
  #dify-chatbot-bubble-window .dify-chatbot-window-content {
    height: calc(100% - 130px) !important; /* ヘッダーとフッターの高さを引いた高さ */
    overflow: auto !important;
  }
  
  /* 入力エリアが常に表示されるように */
  #dify-chatbot-bubble-window .dify-chatbot-window-footer {
    position: sticky !important;
    bottom: 0 !important;
    background-color: white !important;
    padding: 15px !important; /* パディングを増加 */
    z-index: 10 !important; /* 重なり順序を確保 */
  }
  
  /* iOSおよびモバイルデバイス用の特別対応 */
  @supports (-webkit-overflow-scrolling: touch) {
    #dify-chatbot-bubble-window {
      height: 700px !important;
      min-height: 650px !important;
      max-height: 80vh !important;
      bottom: 5rem !important; /* より大きめのマージン */
    }
  }
  
  /* 小さい画面用の調整 */
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window {
      height: 600px !important;
      min-height: 550px !important;
      max-height: 70vh !important;
      bottom: 5rem !important;
    }
    #dify-chatbot-bubble-button {
      bottom: 11rem !important; /* 固定位置を維持 */
    }
  }
  
  /* さらに小さい画面用の調整 */
  @media (max-height: 500px) {
    #dify-chatbot-bubble-window {
      height: 450px !important;
      min-height: 400px !important;
      max-height: 65vh !important;
      bottom: 5rem !important;
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
    bottom: 2rem !important; /* 固定位置を下部に調整 */
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
    #subsidy-chatbot .rounded-full {
      bottom: 2rem !important;
    }
  }
</style>
