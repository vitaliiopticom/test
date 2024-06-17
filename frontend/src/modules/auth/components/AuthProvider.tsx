import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {
  MsalProvider,
  useAccount,
  useIsAuthenticated,
  useMsal,
} from '@azure/msal-react';

import { useConfig } from '@/config/ConfigProvider';

import {
  createMsalConfig,
  getLoginRequest,
  getMsalInstance,
  getUserFromAccount,
} from '../msal';
import type { User } from '../types';

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
  getToken: () => Promise<string | null>;
  user?: User;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProviderInner: FC<Props> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});
  const config = useConfig();

  const loginRequest = useMemo(
    () => getLoginRequest(config.msalConfig.clientId),
    [config],
  );

  const signIn = useCallback(() => {
    instance.loginPopup(loginRequest).catch((e) => console.log(e));
  }, [instance, loginRequest]);

  const signOut = useCallback(() => {
    window.localStorage.clear();

    instance.logoutRedirect().catch((e) => console.log(e));
  }, [instance]);

  const getToken = useCallback(async () => {
    try {
      const res = await instance.acquireTokenSilent({
        scopes: [...loginRequest.scopes],
        account: account ?? undefined,
      });

      return res.accessToken;
    } catch (err) {
      return null;
    }
  }, [loginRequest, account, instance]);

  const value = useMemo<AuthContextType>(
    () => ({
      user: getUserFromAccount(account),
      isAuthenticated,
      signIn,
      signOut,
      getToken,
    }),
    [isAuthenticated, account, signIn, signOut, getToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const config = useConfig();

  const msalInstance = useMemo(() => {
    const msalConfig = createMsalConfig(config.msalConfig);
    const instance = getMsalInstance(msalConfig);
    instance.enableAccountStorageEvents();

    return instance;
  }, [config]);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </MsalProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
