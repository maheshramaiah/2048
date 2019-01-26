const Storage = {
  get(key) {
    return window.localStorage.getItem(key) || null;
  },
  set(key, val) {
    window.localStorage.setItem(key, val);
  }
}

export default Storage;