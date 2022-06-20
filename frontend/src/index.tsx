import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { PageContext } from "./hook/usePage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageContext>
      <App /> 
    </PageContext>
  </React.StrictMode>
);
