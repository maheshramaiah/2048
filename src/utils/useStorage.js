import { useCallback } from 'react';

export function useStorage() {
  const get = useCallback((key) => {
    return window.localStorage.getItem(key) || null;
  }, []);

  const set = useCallback((key, val) => {
    window.localStorage.setItem(key, val);
  }, []);

  return { get, set };
}