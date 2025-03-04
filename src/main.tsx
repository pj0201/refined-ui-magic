
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// WordPressとの連携用のルート要素を取得
// 複数のID候補をチェックして、より柔軟に対応
const rootElement = 
  document.getElementById('root') || 
  document.getElementById('react-root') || 
  document.getElementById('planningjoy-app');

if (!rootElement) {
  // 要素が見つからない場合はエラーログを出力し、新しい要素を作成
  console.error('Root element not found, creating a new one');
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  const root = createRoot(newRoot);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // 既存の要素が見つかった場合
  console.log('Root element found:', rootElement.id);
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
