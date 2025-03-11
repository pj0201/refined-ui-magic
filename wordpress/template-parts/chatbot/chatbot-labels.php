
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<script>
// 画面サイズに応じてラベルの位置を調整する関数
function adjustLabelPositions() {
  const viewportHeight = window.innerHeight;
  
  // 小規模持続化補助金ラベル
  const smallSubsidyLabel = document.querySelector('.small-subsidy-label');
  if (smallSubsidyLabel) {
    const smallSubsidyBottom = Math.min(Math.max(viewportHeight * 0.4, 12 * 16), 16 * 16) / 16;
    smallSubsidyLabel.style.bottom = `${smallSubsidyBottom}rem`;
  }
  
  // 省力化投資補助金ラベル
  const investmentSubsidyLabel = document.querySelector('.investment-subsidy-label');
  if (investmentSubsidyLabel) {
    const investmentSubsidyBottom = Math.min(Math.max(viewportHeight * 0.2, 6 * 16), 8 * 16) / 16;
    investmentSubsidyLabel.style.bottom = `${investmentSubsidyBottom}rem`;
  }
}

// ページ読み込み時と画面サイズ変更時に位置を調整
document.addEventListener('DOMContentLoaded', adjustLabelPositions);
window.addEventListener('resize', adjustLabelPositions);
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
