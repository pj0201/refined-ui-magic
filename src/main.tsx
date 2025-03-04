
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// WordPressとのフレキシブルな連携のためのroot要素検出
const rootElements = [
  'root',
  'react-root',
  'planningjoy-app',
  'wp-react-app'
];

// ルート要素を探す関数
const findRootElement = () => {
  for (const id of rootElements) {
    const element = document.getElementById(id);
    if (element) {
      console.log(`Root element found: #${id}`);
      return element;
    }
  }
  return null;
};

// ルート要素を取得
const rootElement = findRootElement();

if (!rootElement) {
  // 要素が見つからない場合は新しい要素を作成し、エラーをログに残す
  console.error('Root element not found, creating a new one with ID "root"');
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
  // 既存の要素が見つかった場合はそれを使用
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
