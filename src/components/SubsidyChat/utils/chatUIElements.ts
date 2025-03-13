
import { createChatbotLabel, createChatbotButton, removeElement } from './domUtils';
import { sendShoroku, sendShokibo, setupMessageListeners } from './chatMessageHandler';
import '../types/dify.d.ts';
import { toast } from "@/components/ui/use-toast";

/**
 * チャットボット要素の追加
 */
export const addChatbotElements = (): void => {
  try {
    console.log("Adding chatbot elements to the DOM");
    
    // 既存の要素をクリーンアップ
    removeElement('chatbot-elements-container');
    removeElement('dify-chatbot-bubble-button-1');
    removeElement('dify-chatbot-label-1');
    removeElement('dify-chatbot-bubble-button-2');
    removeElement('dify-chatbot-label-2');
    
    // コンテナを作成
    const container = document.createElement('div');
    container.id = 'chatbot-elements-container';
    container.className = 'chatbot-elements-container';
    
    // スタイルを直接設定
    container.style.position = 'fixed';
    container.style.right = '20px';
    container.style.top = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '11px';
    container.style.zIndex = '2147483646';
    
    // 1つ目のラベル（省力化投資補助金）
    const label1 = createChatbotLabel(
      'dify-chatbot-label-1', 
      'dify-chatbot-label', 
      '省力化投資補助金の質問はコチラ'
    );
    // ラベルスタイルを直接設定
    label1.style.color = '#22C55E';
    label1.style.fontSize = '11px';
    label1.style.textAlign = 'center';
    label1.style.letterSpacing = '1px';
    label1.style.lineHeight = '1.2';
    label1.style.whiteSpace = 'nowrap';
    label1.style.zIndex = '2147483646';
    label1.style.fontWeight = 'normal';
    label1.style.textShadow = '0 0 1px rgba(0,0,0,0.2)';
    label1.style.transition = 'color 0.3s ease';
    label1.style.width = '32px';
    label1.style.display = 'flex';
    label1.style.alignItems = 'center';
    label1.style.justifyContent = 'center';
    label1.style.writingMode = 'vertical-rl';
    label1.style.textOrientation = 'upright';
    label1.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    label1.style.padding = '8px 0';
    label1.style.borderRadius = '16px';
    label1.style.position = 'relative';
    label1.style.marginLeft = 'auto';
    label1.style.marginBottom = '2px';
    
    container.appendChild(label1);
    
    // 1つ目のチャットボタン（省力化投資補助金）- ヘルプアイコン
    const button1 = createChatbotButton(
      'dify-chatbot-bubble-button-1', 
      'dify-chatbot-bubble-button',
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      () => {
        try {
          console.log("省力化投資補助金ボタンがクリックされました");
          if (window.DifyChat) {
            sendShoroku();
          } else {
            console.log("DifyChatが読み込まれていません。メッセージは送信できません。");
            toast({
              title: "チャットの準備中",
              description: "チャットボットを読み込み中です。しばらくお待ちください...",
              duration: 3000,
            });
            // 少し待ってから再試行
            setTimeout(() => {
              if (window.DifyChat) {
                sendShoroku();
              } else {
                toast({
                  title: "チャットの読み込みに失敗",
                  description: "ページを再読み込みして再試行してください",
                  variant: "destructive",
                  duration: 5000,
                });
              }
            }, 2000);
          }
        } catch (error) {
          console.error("省力化投資補助金ボタンクリック処理エラー:", error);
        }
      }
    );
    // ボタンスタイルを直接設定
    button1.style.width = '32px';
    button1.style.height = '32px';
    button1.style.borderRadius = '50%';
    button1.style.backgroundColor = '#1C64F2';
    button1.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    button1.style.border = 'none';
    button1.style.cursor = 'pointer';
    button1.style.zIndex = '2147483647';
    button1.style.display = 'flex';
    button1.style.alignItems = 'center';
    button1.style.justifyContent = 'center';
    button1.style.opacity = '1';
    button1.style.visibility = 'visible';
    button1.style.position = 'relative';
    button1.style.marginLeft = 'auto';
    
    container.appendChild(button1);
    
    // 2つ目のラベル（小規模持続化補助金）
    const label2 = createChatbotLabel(
      'dify-chatbot-label-2', 
      'dify-chatbot-label', 
      '小規模持続化補助金の質問はコチラ'
    );
    // ラベルスタイルを直接設定（label1と同じなので再利用）
    Object.assign(label2.style, {
      color: '#22C55E',
      fontSize: '11px',
      textAlign: 'center',
      letterSpacing: '1px',
      lineHeight: '1.2',
      whiteSpace: 'nowrap',
      zIndex: '2147483646',
      fontWeight: 'normal',
      textShadow: '0 0 1px rgba(0,0,0,0.2)',
      transition: 'color 0.3s ease',
      width: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      writingMode: 'vertical-rl',
      textOrientation: 'upright',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '8px 0',
      borderRadius: '16px',
      position: 'relative',
      marginLeft: 'auto',
      marginBottom: '2px'
    });
    
    container.appendChild(label2);
    
    // 2つ目のチャットボタン（小規模持続化補助金）- メッセージアイコン
    const button2 = createChatbotButton(
      'dify-chatbot-bubble-button-2', 
      'dify-chatbot-bubble-button',
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      () => {
        try {
          console.log("小規模持続化補助金ボタンがクリックされました");
          if (window.DifyChat) {
            sendShokibo();
          } else {
            console.log("DifyChatが読み込まれていません。メッセージは送信できません。");
            toast({
              title: "チャットの準備中",
              description: "チャットボットを読み込み中です。しばらくお待ちください...",
              duration: 3000,
            });
            // 少し待ってから再試行
            setTimeout(() => {
              if (window.DifyChat) {
                sendShokibo();
              } else {
                toast({
                  title: "チャットの読み込みに失敗",
                  description: "ページを再読み込みして再試行してください",
                  variant: "destructive",
                  duration: 5000,
                });
              }
            }, 2000);
          }
        } catch (error) {
          console.error("小規模持続化補助金ボタンクリック処理エラー:", error);
        }
      }
    );
    // ボタンスタイルを直接設定（button1と同じなので再利用）
    Object.assign(button2.style, {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#1C64F2',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      border: 'none',
      cursor: 'pointer',
      zIndex: '2147483647',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '1',
      visibility: 'visible',
      position: 'relative',
      marginLeft: 'auto'
    });
    
    container.appendChild(button2);
    
    // コンテナをDOMに追加
    document.body.appendChild(container);
    
    // メッセージリスナーをセットアップ
    setupMessageListeners();
    
    console.log("チャットボット要素の追加が完了しました");
  } catch (error) {
    console.error("チャットボット要素の追加中にエラーが発生しました:", error);
    toast({
      title: "エラーが発生しました",
      description: "チャットボットの表示に問題があります。ページを再読み込みしてください",
      variant: "destructive",
      duration: 5000,
    });
  }
};
