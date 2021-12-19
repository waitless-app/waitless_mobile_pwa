function accessStorage(action) {
  try {
    return action;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
            // Firefox
            || e.code === 1014
            // test name field too, because code might not be present
            // everything except Firefox
            || e.name === 'QuotaExceededError'
            // Firefox
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && (localStorage && localStorage.length !== 0);
  }
}

const setItem = (key, value) => accessStorage(localStorage.setItem(key, value));
const getItem = (key) => accessStorage(localStorage.getItem(key));
const removeItem = (key) => accessStorage(localStorage.removeItem(key));

export { setItem, getItem, removeItem };
