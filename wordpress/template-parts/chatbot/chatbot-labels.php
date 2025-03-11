
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<script>
// 画面サイズに応じてラベルの位置を調整する関数
function adjustLabelPositions() {
  // 小規模持続化補助金ラベル - 一番上に配置
  const smallSubsidyLabel = document.querySelector('.small-subsidy-label');
  if (smallSubsidyLabel) {
    smallSubsidyLabel.style.bottom = '15rem'; // 固定位置
  }
  
  // 小規模持続化補助金のチャットボットアイコン（Dify）- ラベルのすぐ下
  const difyChatbotButton = document.getElementById('dify-chatbot-bubble-button');
  if (difyChatbotButton) {
    difyChatbotButton.style.bottom = '11rem'; // 固定位置
  }
  
  // 省力化投資補助金ラベル - 小規模持続化補助金アイコンの下に配置
  const investmentSubsidyLabel = document.querySelector('.investment-subsidy-label');
  if (investmentSubsidyLabel) {
    investmentSubsidyLabel.style.bottom = '7rem'; // 固定位置
  }
  
  // 省力化投資補助金のチャットボットアイコン - ラベルのすぐ下に配置
  const investmentSubsidyBot = document.querySelector('.investment-subsidy-bot');
  if (investmentSubsidyBot) {
    investmentSubsidyBot.style.bottom = '3rem'; // 修正: 省力化投資補助金ラベルから4rem下がった位置
  }
  
  // Difyのチャットウィンドウの位置とサイズを調整
  const difyChatbotWindow = document.getElementById('dify-chatbot-bubble-window');
  if (difyChatbotWindow) {
    // ウィンドウの高さをビューポートに応じて調整
    difyChatbotWindow.style.maxHeight = '80vh'; // 画面高さの80%に制限
    difyChatbotWindow.style.height = 'auto'; // 高さを自動調整
    difyChatbotWindow.style.bottom = '6rem'; // 下部に適切な余白を確保
    difyChatbotWindow.style.transform = 'translateY(0)'; // 位置を強制調整
    
    // 画面の高さが小さい場合はさらに調整
    if (window.innerHeight < 600) {
      difyChatbotWindow.style.maxHeight = '60vh';
      difyChatbotWindow.style.bottom = '8rem';
    }
  }
}

// ページ読み込み時と画面サイズ変更時に位置を調整
document.addEventListener('DOMContentLoaded', function() {
  // 初回調整
  adjustLabelPositions();
  
  // Difyチャットボットが読み込まれた後、位置を再調整（遅延を長めに）
  setTimeout(adjustLabelPositions, 1500);
  
  // さらに再調整を追加（完全な読み込みを保証）
  setTimeout(adjustLabelPositions, 3000);
  
  // 画面サイズ変更時に調整
  window.addEventListener('resize', adjustLabelPositions);
  
  // ウィンドウがクリックされた時にも位置調整（Difyボタンクリック対応）
  document.addEventListener('click', function() {
    // クリック後に少し遅延を入れて調整
    setTimeout(adjustLabelPositions, 500);
  });
});
</script>

<!-- 小規模持続化補助金ラベル -->
<div class="chatbot-label small-subsidy-label">
  <span>小規模持続化補助金</span>
  <span>の質問はコチラ</span>
</div>

<!-- 省力化投資補助金ラベル -->
<div class="chatbot-label investment-subsidy-label">
  <span>省力化投資補助金</span>
  <span>の質問はコチラ</span>
</div>
