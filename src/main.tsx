
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// シンプルなマウントロジック
const rootElement = document.getElementById('root');
  
if (!rootElement) {
  console.error('Root element with ID "root" not found. React app cannot be mounted.');
} else {
  const root = createRoot(rootElement);
  
  // 開発環境のみStrictModeを使用
  if (import.meta.env.DEV) {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    root.render(<App />);
  }
  
  console.log('React app successfully mounted on #root');
}
