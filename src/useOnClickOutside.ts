import { useEffect, RefObject } from "react";
import { isBrowser } from './utils/isBrowser';
import { isPassiveEventsSupported } from './utils/isPassiveEventsSupported';

const getPassiveOption = () => {
  if (isPassiveEventsSupported()) {
    return { passive: true };
  }
  return;
};

type EventType = TouchEvent | MouseEvent;
type HandlerType = (event: EventType) => void;

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: HandlerType): void => {
  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const listener = (event: EventType) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener, getPassiveOption());
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener, getPassiveOption() as EventListenerOptions);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
