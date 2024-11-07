import { getContext } from '@picsart/miniapps-sdk';
import { useRef, useState } from 'react';
import useMount from './useMount';

const useClose = (callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const [state, setState] = useState(false);

  useMount(() =>
    getContext().handlers.onClose(() => {
      setState(true);
      callbackRef.current();
    }),
  );

  return state;
};

export default useClose;
