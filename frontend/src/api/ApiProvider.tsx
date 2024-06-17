import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import { ENV_CONFIG } from '@/config/env';
import { useGetLatest } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/modules/auth';

// Automatically generated types from BE
import possibleTypes from '../../scripts/possibleTypes.json';

import { ERROR_CODES } from './errorCodes';
import {
  handleErrorNotifications,
  hasGqlErrorCode,
  hasNetworkStatusCode,
} from './utils';

type Props = {
  children: ReactNode;
};

type ApiContextRef = {
  tenantId: string;
};

type ApiContextType = {
  setTenant: (tenantId: string) => void;
};

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

const httpLink = createUploadLink({
  uri: ENV_CONFIG.API_URL_PRIVATE,
}) as unknown as ApolloLink; // TODO fix this type issue when new upload link version is ready
const cache = new InMemoryCache({ possibleTypes });

export const ApiProvider: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const { getToken, signOut } = useAuth();
  const contextApiRef = useRef<ApiContextRef>({ tenantId: '' });
  const getT = useGetLatest(t);

  const client = useMemo(() => {
    const authLink = setContext(async () => {
      const token = await getToken();

      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'x-tenant-id': contextApiRef.current.tenantId || '',
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      const isUnauthenticated =
        hasNetworkStatusCode(401, networkError) ||
        hasGqlErrorCode(ERROR_CODES.AUTH_NOT_AUTHENTICATED, graphQLErrors);

      handleErrorNotifications(getT(), graphQLErrors);

      if (isUnauthenticated) {
        signOut();
      }
    });

    return new ApolloClient({
      link: from([errorLink, authLink, httpLink]),
      cache,
    });
  }, [getT, getToken, signOut]);

  const contextApi = useMemo<ApiContextType>(
    () => ({
      setTenant: (tenantId) => {
        contextApiRef.current.tenantId = tenantId;
      },
    }),
    [],
  );

  return (
    <ApolloProvider client={client}>
      <ApiContext.Provider value={contextApi}>{children}</ApiContext.Provider>
    </ApolloProvider>
  );
};

export const useApiContext = () => useContext(ApiContext);
