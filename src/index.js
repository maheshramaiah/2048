import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import './style.scss';

function Page() {
  useEffect(() => {
    async function registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('./sw.js', {
            scope: '/2048/'
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    window.addEventListener('load', registerServiceWorker);

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return <App />;
}

ReactDOM.render(<Page />, document.getElementById('app'));
