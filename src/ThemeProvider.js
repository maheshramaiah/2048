import React, { useState, useContext, useEffect } from 'react';
import { useStorage } from './utils/useStorage';

const Context = React.createContext();

function ThemeProvider(props) {
  const storage = useStorage();
  const [theme, setTheme] = useState(storage.get('theme') || 'dark');

  useEffect(() => {
    storage.set('theme', theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </Context.Provider>
  );
}

function useThemeProvider() {
  return useContext(Context);
}

export default ThemeProvider;
export { useThemeProvider };
