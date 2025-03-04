
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// WordPress統合のためのより安定した実装
document.addEventListener('DOMContentLoaded', () => {
  const rootId = 'wp-react-app';
  const rootElement = document.getElementById(rootId);
  
  if (!rootElement) {
    console.error(`Root element with ID "${rootId}" not found. React app cannot be mounted.`);
    return; // WordPressの構造を乱さないために早期リターン
  }
  
  try {
    const root = createRoot(rootElement);
    
    // プロダクション環境では StrictMode を無効化して二重レンダリングを防止
    if (import.meta.env.DEV) {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      root.render(<App />);
    }
    
    console.log(`React app successfully mounted on #${rootId}`);
  } catch (error) {
    console.error('Error mounting React app:', error);
  }
});
