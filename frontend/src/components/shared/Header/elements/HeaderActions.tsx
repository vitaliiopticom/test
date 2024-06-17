import { FC } from 'react';

import { ActionsMenu, Avatar } from '@/components/elements';
import { DEBUG_LANG, useTranslation } from '@/i18n';
import { PERMISSIONS, useAuth, usePermissions } from '@/modules/auth';
import { createFullNameFromUser, useProfile } from '@/modules/users';
import { routes } from '@/router/routesList';

import { useLang } from '../../LangProvider/LangProvider';

type Props = {
  isSetupLayout?: boolean;
  currentCompanyId: string;
};

export const HeaderActions: FC<Props> = ({
  isSetupLayout,
  currentCompanyId,
}) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const canDebugTranslations = usePermissions(
    PERMISSIONS.Misc_DebugTranslations,
  );
  const canViewCompanyProfile = usePermissions(
    PERMISSIONS.CompanyProfiles_View,
  );
  const { profileDefaultLang, debugMode, toggleDebugMode } = useLang();

  if (!profile) return null;

  return (
    <ActionsMenu
      items={[
        {
          label: t('common.profile'),
          to: routes.userDetail(profile.id),
          icon: 'user',
          isShown: !isSetupLayout,
        },
        {
          label: t('common.company'),
          to: routes.companyDetail(currentCompanyId),
          icon: 'company',
          isShown: !!currentCompanyId && canViewCompanyProfile,
        },
        {
          label: t('common.signout'),
          onClick: () => signOut(),
          icon: 'logout',
        },
        {
          label: debugMode ? profileDefaultLang?.label : DEBUG_LANG.label,
          onClick: toggleDebugMode,
          icon: debugMode ? profileDefaultLang?.icon : DEBUG_LANG.icon,
          iconClassName: 'h-4 w-4',
          isShown: canDebugTranslations,
        },
      ]}
      menuClassName="rounded-md w-fit divide-none"
      menuItemClassName="hover:text-primary pl-4 pr-8 first:pt-4 last:pb-4 text-base gap-3"
      offset={[-20, 0]}
      placement="bottom-end"
    >
      <button
        className="flex items-center gap-3 py-3.5 pl-3 pr-6 hover:bg-transparent/10"
        type="button"
      >
        <Avatar
          alt=""
          imgUrl={profile.photoUrl}
          name={createFullNameFromUser(profile.firstname, profile.lastname)}
          size="md"
        />
        <span className="inset-y-0 right-0 mt-1 flex items-center before:h-0 before:w-0 before:border-x-[5px] before:border-t-[6px] before:border-x-transparent before:border-t-primary-tint-60" />
      </button>
    </ActionsMenu>
  );
};
