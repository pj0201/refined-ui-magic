import React, { useState, useEffect } from 'react';

interface BasicChatWindowProps {
  title?: string;
}

/**
 * 基本的なチャットウィンドウコンポーネント
 * シンプルな表示と閉じる機能を持つチャットウィンドウ
 */
const BasicChatWindow: React.FC<BasicChatWindowProps> = ({ title = 'チャットウィンドウ' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: 'こんにちは！何かお手伝いできることはありますか？', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');

  // ウィンドウを閉じる
  const closeWindow = () => {
    setIsVisible(false);
  };

  // メッセージを送信
  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    // ユーザーメッセージを追加
    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');
    
    // 簡易的な応答（実際のアプリではAPIコールなどを行う）
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `「${inputText}」についてのお問い合わせありがとうございます。現在テスト中のため、実際の回答は提供できません。`, 
        isUser: false 
      }]);
    }, 1000);
  };

  // Enterキーでメッセージを送信
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // グローバル関数を設定
  useEffect(() => {
    // グローバル関数を定義
    window.openBasicWindow = () => {
      console.log('BasicChatWindowを開きます');
      setIsVisible(true);
    };

    // クリーンアップ
    return () => {
      // @ts-ignore
      window.openBasicWindow = undefined;
    };
  }, []);

  // 表示されていない場合は何も表示しない
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 2147483647,
    }}>
      {/* ヘッダー */}
      <div style={{
        backgroundColor: '#1C64F2',
        color: 'white',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <button 
          onClick={closeWindow}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 5px',
          }}
        >
          ×
        </button>
      </div>

      {/* メッセージエリア */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#f9fafb',
      }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={{
              alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
              backgroundColor: msg.isUser ? '#1C64F2' : 'white',
              color: msg.isUser ? 'white' : 'black',
              padding: '10px 15px',
              borderRadius: '18px',
              maxWidth: '80%',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              wordBreak: 'break-word',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        padding: '10px',
        display: 'flex',
        backgroundColor: 'white',
      }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力..."
          style={{
            flex: 1,
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '8px 12px',
            resize: 'none',
            height: '40px',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#1C64F2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0 15px',
            marginLeft: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            height: '40px',
          }}
        >
          送信
        </button>
      </div>
    </div>
  );
};

// グローバル関数の型定義用
declare global {
  interface Window {
    openBasicWindow?: () => void;
  }
}

export default BasicChatWindow;
