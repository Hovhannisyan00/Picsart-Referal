import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@picsart/miniapp-container-editor';
import '@picsart/miniapp-container-editor/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (window.location.pathname === '/') {
  window.location.href = '/editor?category=miniapps';
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
