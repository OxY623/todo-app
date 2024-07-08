import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import ReactDOM from 'react-dom'
import App from './components/app';

// ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
