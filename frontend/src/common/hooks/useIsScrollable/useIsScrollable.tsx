import { useEffect, useState } from "react";

export const useIsScrollable = (): boolean => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScrollable(document.documentElement.scrollHeight > window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isScrollable;
};
