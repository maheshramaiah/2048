import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import './style.scss';

ReactDOM.render(<App />, document.getElementById('app'));

async function registerServiceWorker() {
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (e) {
    console.log(e);
  }
}

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}
