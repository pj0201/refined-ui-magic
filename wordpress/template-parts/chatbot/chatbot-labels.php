
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<script>
// 画面サイズに応じてラベルの位置を調整する関数
function adjustLabelPositions() {
  // 小規模持続化補助金ラベル - 固定位置
  const smallSubsidyLabel = document.querySelector('.small-subsidy-label');
  if (smallSubsidyLabel) {
    smallSubsidyLabel.style.bottom = '15rem';
    smallSubsidyLabel.style.zIndex = '1000';
  }
  
  // 小規模持続化補助金のチャットボットアイコン（Dify）- 固定位置
  const difyChatbotButton = document.getElementById('dify-chatbot-bubble-button');
  if (difyChatbotButton) {
    difyChatbotButton.style.bottom = '11rem';
    difyChatbotButton.style.zIndex = '1000';
  }
  
  // 省力化投資補助金ラベル - 固定位置
  const investmentSubsidyLabel = document.querySelector('.investment-subsidy-label');
  if (investmentSubsidyLabel) {
    investmentSubsidyLabel.style.bottom = '7rem';
    investmentSubsidyLabel.style.zIndex = '1000';
  }
  
  // 省力化投資補助金のチャットボットアイコン - 固定位置
  const investmentSubsidyBot = document.querySelector('.investment-subsidy-bot');
  if (investmentSubsidyBot) {
    investmentSubsidyBot.style.bottom = '2rem';
    investmentSubsidyBot.style.zIndex = '1000';
  }
  
  // Difyのチャットウィンドウの位置とサイズを調整
  const difyChatbotWindow = document.getElementById('dify-chatbot-bubble-window');
  if (difyChatbotWindow) {
    // ウィンドウサイズをviewportの割合で指定
    difyChatbotWindow.style.height = '80vh';
    difyChatbotWindow.style.minHeight = '500px';
    difyChatbotWindow.style.maxHeight = '700px';
    difyChatbotWindow.style.bottom = '70px';
    difyChatbotWindow.style.transform = 'none';
    difyChatbotWindow.style.marginBottom = '10px';
    difyChatbotWindow.style.zIndex = '1000';
    difyChatbotWindow.style.display = 'flex';
    difyChatbotWindow.style.flexDirection = 'column';
    
    // チャット入力部分が見えるようにFlexレイアウトを適用
    const chatContent = difyChatbotWindow.querySelector('.dify-chatbot-window-content');
    if (chatContent) {
      chatContent.style.flexGrow = '1';
      chatContent.style.overflow = 'auto';
      chatContent.style.display = 'flex';
      chatContent.style.flexDirection = 'column';
    }
    
    const chatFooter = difyChatbotWindow.querySelector('.dify-chatbot-window-footer');
    if (chatFooter) {
      chatFooter.style.position = 'sticky';
      chatFooter.style.bottom = '0';
      chatFooter.style.backgroundColor = 'white';
      chatFooter.style.padding = '15px';
      chatFooter.style.zIndex = '1010';
      chatFooter.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
    }
    
    // モバイル表示の調整
    if (window.innerWidth <= 640) {
      difyChatbotWindow.style.width = '90vw';
      difyChatbotWindow.style.height = '70vh';
      difyChatbotWindow.style.minHeight = '400px';
      difyChatbotWindow.style.maxHeight = '600px';
      difyChatbotWindow.style.right = '5vw';
      difyChatbotWindow.style.left = '5vw';
    }
  }
}

// ページ読み込み時と画面サイズ変更時に位置を調整
document.addEventListener('DOMContentLoaded', function() {
  // 要素が確実に読み込まれた後に調整を実行
  setTimeout(adjustLabelPositions, 300);
  setTimeout(adjustLabelPositions, 1000);
  setTimeout(adjustLabelPositions, 2000);
  
  // さらに長い遅延でも調整を追加（確実に適用されるように）
  setTimeout(adjustLabelPositions, 3000);
  setTimeout(adjustLabelPositions, 5000);
  
  // 画面サイズ変更時に調整
  window.addEventListener('resize', adjustLabelPositions);
  
  // クリックイベントでも位置調整を実行
  document.addEventListener('click', function() {
    setTimeout(adjustLabelPositions, 100);
    setTimeout(adjustLabelPositions, 500);
    setTimeout(adjustLabelPositions, 1000);
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
