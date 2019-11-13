import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import ThemeProvider, { useThemeProvider } from './ThemeProvider';
import './style.scss';

function Page() {
  const { theme } = useThemeProvider();

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

  return (
    <div className={theme}>
      <App />
    </div>
  );
}

ReactDOM.render(
  <ThemeProvider>
    <Page />
  </ThemeProvider>,
  document.getElementById('app')
);
