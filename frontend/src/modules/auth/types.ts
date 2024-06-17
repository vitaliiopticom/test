import { PERMISSIONS } from './constants';

export type User = {
  id: string;
  name: string;
};

export type Permission = keyof typeof PERMISSIONS;
