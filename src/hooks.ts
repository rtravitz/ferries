import { useState, useEffect, useRef, useLayoutEffect, RefObject } from 'react';

export function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useOnClickOutside = <T extends HTMLElement | null>(
  element: RefObject<T>,
  handler: () => void,
  attached = true,
): void => {
  const latestHandler = useRef(handler);

  useLayoutEffect(() => {
    latestHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!attached || !element || !element.current) {
      return;
    }

    const handleClick = (e: Event) => {
      if (
        latestHandler &&
        element.current &&
        !element.current.contains(e.target as Node)
      ) {
        latestHandler.current();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };

  }, [element, attached]);
};
