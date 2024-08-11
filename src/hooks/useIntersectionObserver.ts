import { useRef, useCallback } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      });
      if (node) observer.current.observe(node);
    },
    [callback],
  );

  return observe;
};

export default useIntersectionObserver;
