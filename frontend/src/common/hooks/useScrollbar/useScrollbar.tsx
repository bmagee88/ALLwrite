import { RefObject, useEffect, useState } from "react";
import { handleScroll } from "./utils/handlers";

export const useScrollbar = (containerRef: RefObject<HTMLDivElement> | null) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;

    if (container) {
      container.addEventListener("scroll", handleScroll(container, setIsAtTop, setIsAtBottom));
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll(container, setIsAtTop, setIsAtBottom));
      }
    };
  }, [containerRef]);

  return { isAtTop, isAtBottom };
};
