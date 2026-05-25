import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n/i18n';
import "leaflet/dist/leaflet.css";
// بنستورد الـ Provider مش الـ Context نفسه
import { UserTokenProvider } from './context/UserContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* تغليف المشروع بالـ Provider الجديد */}
    <UserTokenProvider>
      <App />
    </UserTokenProvider>
  </StrictMode>
);