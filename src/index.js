import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";
import { WordsContextProvider } from './components/wordsContext/wordsContext';
import { UserContextProvider } from './components/userContext/userContext';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/errorFallback/errorFallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <UserContextProvider>
        <WordsContextProvider>
          <App />
        </WordsContextProvider>
      </UserContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
