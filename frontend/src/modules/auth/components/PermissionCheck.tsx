import type { FC, PropsWithChildren, ReactNode } from 'react';

import { usePermissions } from '../hooks/usePermissions';
import type { Permission } from '../types';

type Props = PropsWithChildren<{
  permission: Permission | Permission[];
  fallback?: ReactNode;
}>;

export const PermissionCheck: FC<Props> = ({
  permission,
  children,
  fallback,
}) => {
  const isPermitted = usePermissions(permission);

  if (!isPermitted) return fallback ? <>{fallback}</> : null;

  return <>{children}</>;
};
