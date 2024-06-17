import { FC } from 'react';

import { Button, Image, Text } from '@/components/elements';
import { NAMESPACES, useTranslation } from '@/i18n';
import { useAuth } from '@/modules/auth';

export const OnboardingUnfinishedFallback: FC = () => {
  const { t } = useTranslation(NAMESPACES.Onboarding);
  const { signOut } = useAuth();

  return (
    <div className="min-h-layoutSetup bg-white px-24 pt-12">
      <div className="mx-auto flex max-w-[850px] items-center justify-center">
        <div className="grid justify-center justify-items-center gap-2.5">
          <Image
            alt="Error"
            className="mb-3"
            height="163"
            src="/images/error.svg"
            width="255"
          />
          <Text className="text-center text-5xl font-semibold">
            {t('onboardingUnfinished.title')}
          </Text>
          <Text className="text-center text-lg font-semibold">
            {t('onboardingUnfinished.text')}
          </Text>
          <Button
            startIcon="logout"
            variant="secondary"
            onClick={() => signOut()}
          >
            {t('common.signout', { ns: NAMESPACES.Common })}
          </Button>
        </div>
      </div>
    </div>
  );
};
