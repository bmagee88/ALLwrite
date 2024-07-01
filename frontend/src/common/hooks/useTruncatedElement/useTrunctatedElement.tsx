import { useState, useLayoutEffect } from "react";

export const useTruncatedElement = (callback: () => {}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [el, setEl] = useState<any>(null);

  useLayoutEffect(() => {
    if (callback && typeof callback === "function") {
      setTimeout(() => {
        const element = callback();
        setEl(element);
      }, 500);
    }
  }, [callback]);

  useLayoutEffect(() => {
    if (el) {
      const { offsetHeight, scrollHeight } = el;
      setIsTruncated(offsetHeight + 10 < scrollHeight);
    }
  }, [el]);

  return {
    isTruncated,
  };
};
