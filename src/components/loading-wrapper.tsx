'use client';

import { useEffect } from 'react';
import { useLoadingStore } from '@/store/loading-store';
import Loading from './loading';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useLoadingStore.getState().setIsLoading(false);
  }, []);

  const isLoading = useLoadingStore((state) => state.isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
