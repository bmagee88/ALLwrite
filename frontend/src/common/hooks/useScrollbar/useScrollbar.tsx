import { RefObject, useEffect, useState } from "react";

export const useScrollbar = (containerRef: RefObject<HTMLDivElement> | null) => {
  const [isAtTop, setIsAtTop] = useState(true); // Initially assume at top
  const [isAtBottom, setIsAtBottom] = useState(false); // Initially assume not at bottom

  useEffect(() => {
    const container = containerRef?.current;

    const handleScroll = () => {
      console.log("container", container);
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        console.log(`${scrollLeft}-${clientWidth}-${scrollWidth}`);

        // Check if at the top
        // setIsAtTop(false);
        setIsAtTop(scrollLeft === 0);

        // Check if at the bottom
        // setIsAtBottom(false);
        setIsAtBottom(scrollLeft + clientWidth === scrollWidth);
      }
    };
    if (container) {
      console.log("adding listener");
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        console.log("removing listener");
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  return { isAtTop, isAtBottom };
};
