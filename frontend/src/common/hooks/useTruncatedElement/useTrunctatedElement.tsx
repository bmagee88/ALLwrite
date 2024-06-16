import { useState, useLayoutEffect } from 'react';

export const useTruncatedElement = (callback) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [el, setEl] = useState(null);

  useLayoutEffect(() => {
    if (callback && typeof callback === 'function') {
      setTimeout(() => {
        const element = callback();
        setEl(element);
      }, 500);
    }
  }, [callback]);

  useLayoutEffect(() => {
    if (el) {
      const { offsetHeight, scrollHeight } = el;

      console.log(offsetHeight, scrollHeight);
      console.log(el.clientWidth, el.scrollHeight);
      console.log(el.offsetHeight === 58);

      console.log('setting isTruncated to ', offsetHeight + 10 < scrollHeight);

      setIsTruncated(offsetHeight + 10 < scrollHeight);
    }
  }, [el]);

  return {
    isTruncated,
  };
};
