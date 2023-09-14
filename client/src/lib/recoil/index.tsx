import { useMemo } from 'react';

import { RecoilURLSync, RecoilURLSyncOptions } from 'recoil-sync';

import { useSyncURLNext } from './useSyncURLNext';

type Props = Omit<RecoilURLSyncOptions, 'browserInterface'> & {
  decodedQueryParams?: boolean;
};

export type Serialize = (data: unknown) => string;

export type Deserialize = (str: string) => unknown;

export const RecoilURLSyncNext: React.FC<Props> = ({ children, ...options }) => {
  const { decodedQueryParams = true } = options;

  const { browserInterface, ...defaultOptions } = useSyncURLNext({
    decodedQueryParams,
  });

  const RECOIL_URL_SYNC_OPTIONS = useMemo(() => {
    return {
      ...defaultOptions,
      ...options,
      browserInterface,
    };
  }, [browserInterface, defaultOptions, options]);

  return <RecoilURLSync {...RECOIL_URL_SYNC_OPTIONS}>{children}</RecoilURLSync>;
};
