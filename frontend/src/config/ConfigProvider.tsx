import { createContext, FC, ReactNode, useContext } from 'react';

import { Spinner } from '@/components/elements';
import { DataLoader } from '@/components/shared';

import { useGetConfiguration } from './getConfiguration';
import type { Configuration } from './types';

type Props = {
  children: ReactNode;
};

export type ConfigContextType = Configuration;

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export const ConfigProvider: FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useGetConfiguration();

  return (
    <DataLoader
      data={data}
      error={error}
      isLoading={isLoading}
      loader={
        <div className="grid h-screen place-content-center">
          <Spinner className="text-primary" size="xl" />
        </div>
      }
    >
      {({ data }) => (
        <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
      )}
    </DataLoader>
  );
};

export const useConfig = () => useContext(ConfigContext);
