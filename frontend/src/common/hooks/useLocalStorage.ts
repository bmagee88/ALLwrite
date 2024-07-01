import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    if (initialValue instanceof Function) {
      return initialValue();
    } else {
      return JSON.parse(storedValue);
    }
  } else {
    return;
  }
}

export default function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
