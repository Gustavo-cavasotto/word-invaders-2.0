import { useXRStore } from '@react-three/xr';
import { useEffect } from 'react';

export function useAutoEnterAR() {
  const store = useXRStore();

  useEffect(() => {
    if (store.getState().session) return;
    store.enterAR().catch((error: unknown) => {
      console.warn('Entrada automática no AR falhou:', error);
    });
  }, [store]);
}
