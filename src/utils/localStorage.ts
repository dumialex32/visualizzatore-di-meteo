// salva un oggetto nel local storage
export const setLocalStorageItem = <T>(key: string, item: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error(`Error setting ${key} in local storage: ${err}`);
  }
};

// recupera un oggetto dal local storage
export const getLocalStorageItem = <T>(
  key: string,
  defaultValue: T[] = []
): T[] => {
  const localStorageItem = localStorage.getItem(key);
  if (localStorageItem) {
    try {
      return JSON.parse(localStorageItem) as T[];
    } catch (err) {
      console.error(`Error parsing ${key} from local storage: ${err}`);
    }
  }
  return defaultValue;
};
