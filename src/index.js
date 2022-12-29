import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { HashRouter } from 'react-router-dom';
import '../src/style/style.scss'
import '../src/style/media.scss'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename='/'>
    <App />
  </HashRouter>
);


