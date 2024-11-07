import { EffectCallback, useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = (effect: EffectCallback) => useEffect(effect, []);

export default useMount;
