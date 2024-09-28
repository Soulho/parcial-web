import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Robots from "./components/robots";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {IntlProvider} from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

const getBrowserLocale = () => {
  const language = navigator.language || navigator.languages[0];
  return language.toLowerCase();
};

const determineMessages = (locale) => {
  if (locale.startsWith('es')) {
      return { locale: 'es-ES', messages: localeEsMessages };
  } else {
      return { locale: 'en-US', messages: localeEnMessages };
  }
};

const { locale, messages } = determineMessages(getBrowserLocale());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/robots" element={<Robots />} />
        </Routes>
     </BrowserRouter>
  </IntlProvider>, 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
