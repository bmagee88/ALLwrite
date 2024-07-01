export const handleScroll = (
  container: HTMLDivElement | null | undefined,
  setIsAtTop: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>
): EventListenerOrEventListenerObject => {
  const scrollHandler = () => {
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsAtTop(scrollLeft === 0);
      setIsAtBottom(Math.ceil(scrollLeft + clientWidth) === scrollWidth);
    }
  };

  return scrollHandler;
};
