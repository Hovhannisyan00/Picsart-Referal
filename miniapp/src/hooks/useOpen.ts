import { getContext } from '@picsart/miniapps-sdk';
import { useRef, useState } from 'react';
import useMount from './useMount';

const useOpen = (callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const [state, setState] = useState(false);

  useMount(() =>
    getContext().handlers.onOpen(() => {
      setState(true);
      callbackRef.current();
    }),
  );

  return state;
};

export default useOpen;
