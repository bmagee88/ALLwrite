import { MutableRefObject, useCallback, useRef } from 'react';

export const useTruncateTextReferences = () => {
  const ref: MutableRefObject<any> = useRef(null);

  const refCallback: () => any = useCallback(() => {
    return ref.current;
  }, []);

  return { ref, refCallback };
};
