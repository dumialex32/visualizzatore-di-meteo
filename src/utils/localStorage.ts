//set
export const setLocalStorageItem = (key: string, item: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error(`Error setting ${key} in local storage ${err}`);
  }
};

//get
export const getLocalStorageItem = (key: string, defaultValue?: T) => {
  const localStorageItem = localStorage.getItem(key);
  if (localStorageItem) {
    try {
      return JSON.parse(localStorageItem);
    } catch (err) {
      console.error(`Error parsing${key} from local storage, ${err}`);
    }
  }

  return defaultValue;
};
