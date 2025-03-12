
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// シンプルなマウントロジック
const rootElement = document.getElementById('root');
  
if (!rootElement) {
  console.error('Root element with ID "root" not found.');
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
