import { useEffect, useState } from 'react';

import { ENV_CONFIG } from './env';
import type { Configuration } from './types';

type GetConfigurationResponse = {
  data: {
    configuration: Configuration;
  };
};

const getConfiguration = async (): Promise<
  GetConfigurationResponse | undefined
> => {
  const res = await fetch(ENV_CONFIG.API_URL_PUBLIC, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'GetConfiguration',
      query: `
        query GetConfiguration {
          configuration {
            msalConfig {
              clientId
              authority
              knownAuthorities
            }
          }
        }`,
      variables: {},
    }),
  });

  return await res.json();
};

type State = {
  isLoading: boolean;
  data?: Configuration;
  error?: Error;
};

export const useGetConfiguration = () => {
  const [state, setState] = useState<State>({
    isLoading: true,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getConfiguration();
        const data = res?.data?.configuration;

        if (!data) {
          setState({
            data: undefined,
            isLoading: false,
            error: undefined,
          });
          return;
        }

        setState({
          data,
          error: undefined,
          isLoading: false,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }));
      }
    };

    fetch();
  }, []);

  return state;
};
