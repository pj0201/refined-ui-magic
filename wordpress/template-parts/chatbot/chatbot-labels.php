
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<script>
// 画面サイズに応じてラベルの位置を調整する関数
function adjustLabelPositions() {
  const viewportHeight = window.innerHeight;
  
  // 小規模持続化補助金ラベル - 位置固定
  const smallSubsidyLabel = document.querySelector('.small-subsidy-label');
  if (smallSubsidyLabel) {
    const smallSubsidyBottom = Math.min(Math.max(viewportHeight * 0.4, 12 * 16), 16 * 16) / 16;
    smallSubsidyLabel.style.bottom = `${smallSubsidyBottom}rem`;
  }
  
  // 省力化投資補助金ラベル - 位置固定
  const investmentSubsidyLabel = document.querySelector('.investment-subsidy-label');
  if (investmentSubsidyLabel) {
    const investmentSubsidyBottom = Math.min(Math.max(viewportHeight * 0.2, 6 * 16), 8 * 16) / 16;
    investmentSubsidyLabel.style.bottom = `${investmentSubsidyBottom}rem`;
  }
  
  // Difyチャットボットのアイコンを小規模持続化補助金ラベルの下に配置
  const difyChatbotButton = document.getElementById('dify-chatbot-bubble-button');
  if (difyChatbotButton && smallSubsidyLabel) {
    const labelBottom = parseFloat(smallSubsidyLabel.style.bottom);
    // ラベルの下に9rem分オフセットして配置（オフセットを増加）
    difyChatbotButton.style.bottom = `${labelBottom - 9}rem`;
  }
  
  // 省力化投資補助金のチャットボットアイコン
  const investmentSubsidyBot = document.querySelector('.investment-subsidy-bot');
  if (investmentSubsidyBot && investmentSubsidyLabel) {
    const labelBottom = parseFloat(investmentSubsidyLabel.style.bottom);
    // ラベルの下に6rem分オフセットして配置（オフセットを増加）
    investmentSubsidyBot.style.bottom = `${labelBottom - 6}rem`;
  }
}

// ページ読み込み時と画面サイズ変更時に位置を調整
document.addEventListener('DOMContentLoaded', function() {
  // 初回調整
  adjustLabelPositions();
  
  // Difyチャットボットが読み込まれた後、位置を再調整
  setTimeout(adjustLabelPositions, 1000);
  
  // 画面サイズ変更時に調整
  window.addEventListener('resize', adjustLabelPositions);
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
