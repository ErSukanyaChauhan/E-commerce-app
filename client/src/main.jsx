import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './theme.jsx';
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>

    </ThemeProvider>
  </React.StrictMode>,
);
