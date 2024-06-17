import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CreateUserFormValues } from '@/modules/users';

import { OnboardingUserFormValues } from '../types';

type OnboardingUsersStore = {
  users: OnboardingUserFormValues[];
  setUsers: (users: OnboardingUserFormValues[]) => void;

  addUser: (user: OnboardingUserFormValues) => void;
  updateUser: (user: OnboardingUserFormValues, index: number) => void;
  removeUser: (index: number) => void;
  removeAllUsers: () => void;
};

export const useOnboardingUsersStore = create<OnboardingUsersStore>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (updateUser, updateIndex) =>
        set((state) => {
          const users = state.users.map((user, index) => {
            if (index === updateIndex) {
              return updateUser;
            }
            return user;
          });

          return { users };
        }),
      removeUser: (index: number) =>
        set((state) => {
          const users = state.users
            .map((user, userIndex) => {
              if (userIndex === index) {
                return undefined;
              }

              return user;
            })
            .filter(Boolean) as CreateUserFormValues[];

          return { users };
        }),
      removeAllUsers: () => set({ users: [] }),
    }),
    { name: 'onboarding-users' },
  ),
);
