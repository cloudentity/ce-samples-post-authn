import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SystemError from './errors/SystemError';
import reportWebVitals from './reportWebVitals';

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SystemError>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </SystemError>
);

reportWebVitals();
