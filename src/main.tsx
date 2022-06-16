import { createRoot } from 'react-dom/client'
import App from './App'
import "./assets/css/global.less";
createRoot(document.getElementById('root') as any).render(
  <App />
)
