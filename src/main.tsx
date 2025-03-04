
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Simplified mounting logic without WordPress dependencies
document.addEventListener('DOMContentLoaded', () => {
  const rootId = 'root';
  const rootElement = document.getElementById(rootId);
  
  if (!rootElement) {
    console.error(`Root element with ID "${rootId}" not found. React app cannot be mounted.`);
    return;
  }
  
  try {
    const root = createRoot(rootElement);
    
    // Use StrictMode in development only
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
