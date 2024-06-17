import { createContext, FC, ReactNode, useContext } from 'react';

import { Spinner } from '@/components/elements';
import { DataLoader } from '@/components/shared';
import { useAuth } from '@/modules/auth';

import { useProfileQuery } from '../api/getProfile';
import type { Profile } from '../types';

type Props = {
  children: ReactNode;
};

export type ProfileContextType = {
  profile: Profile | undefined;
  refetch: () => void;
};

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType,
);

export const ProfileProvider: FC<Props> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;
  const { data, loading, error, refetch } = useProfileQuery({
    skip: !userId,
  });

  return (
    <DataLoader
      data={data}
      error={error}
      isLoading={loading}
      loader={
        <div className="grid h-screen place-content-center">
          <Spinner className="text-primary" size="xl" />
        </div>
      }
      useCustomLoading={!isAuthenticated}
    >
      {({ data }) => (
        <ProfileContext.Provider
          value={{ profile: data?.currentUserProfile, refetch }}
        >
          {children}
        </ProfileContext.Provider>
      )}
    </DataLoader>
  );
};

export const useProfile = () => useContext(ProfileContext);
