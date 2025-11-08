import { useEffect, useState } from 'react';

const getStoragedValue = (key: string, defaultValue: string) => {
  const saved = localStorage.getItem(key);
  try {
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn(
      `${error} Failed to parse localStorage item with key "${key}". Using default value.`
    );
    return defaultValue;
  }
};

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStoragedValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
