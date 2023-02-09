import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CeloProvider } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";
import 'babel-polyfill';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CeloProvider
          dapp={{
            name: "My awesome dApp",
            description: "My awesome description",
            url: "https://example.com",
      }}
    >
     <App />
    </CeloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
