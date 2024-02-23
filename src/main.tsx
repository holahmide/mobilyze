import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalContextProvider } from './context/provider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </GlobalContextProvider>
  </React.StrictMode>
);
