import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue) {
  const savedvalue = JSON.parse(localStorage.getItem(key));

  if (savedvalue) return savedvalue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

export default function useLocalStorage(key: string, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
