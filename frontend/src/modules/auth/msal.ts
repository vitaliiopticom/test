import {
  type AccountInfo,
  type Configuration,
  type PopupRequest,
  PublicClientApplication,
} from '@azure/msal-browser';

import { User } from './types';

type MsalConfigArgs = {
  clientId: string;
  authority: string;
  knownAuthorities: string[];
};

export const createMsalConfig = ({
  clientId,
  authority,
  knownAuthorities,
}: MsalConfigArgs): Configuration => {
  return {
    auth: {
      clientId,
      authority,
      knownAuthorities,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: 'localStorage',
    },
    /** Uncomment to debug Msal */
    // system: {
    //   loggerOptions: {
    //     loggerCallback: (level, message, containsPii) => {
    //       if (containsPii) {
    //         return;
    //       }
    //       switch (level) {
    //         case LogLevel.Error:
    //           console.error(message);
    //           return;
    //         case LogLevel.Info:
    //           console.info(message);
    //           return;
    //         case LogLevel.Verbose:
    //           console.debug(message);
    //           return;
    //         case LogLevel.Warning:
    //           console.warn(message);
    //           return;
    //       }
    //     },
    //   },
    // },
  };
};

export const getLoginRequest = (clientId: string): PopupRequest => ({
  scopes: [clientId],
});

export const getMsalInstance = (config: Configuration) => {
  return new PublicClientApplication(config);
};

export const getUserFromAccount = (
  account: AccountInfo | null,
): User | undefined => {
  if (!account) return;

  return {
    id: account.localAccountId,
    name: account.name || '',
  };
};
