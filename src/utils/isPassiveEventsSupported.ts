import { isBrowser } from './isBrowser';

export const isPassiveEventsSupported = (): boolean => {
  if (!isBrowser) {
    return false;
  }

  let supportsPassive = false;

  try {
    const options: AddEventListenerOptions = Object.defineProperty({}, "passive", {
      get() {
        supportsPassive = true;
      },
    });

    const noopEventListener = () => { };

    window.addEventListener("test", noopEventListener, options);
    window.removeEventListener("test", noopEventListener, options as EventListenerOptions);

    return supportsPassive;
  } catch (e) {
    return false;
  }
};
