import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { Button, Card, Heading, Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/modules/auth';
import { routes } from '@/router/routesList';
import { createTestIdProp } from '@/utils/e2e';

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { signIn, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={routes.index()} replace />;
  }

  const handleLogin = () => {
    signIn();
  };

  return (
    <div className="grid min-h-screen bg-login-img bg-cover bg-center bg-no-repeat p-4 md:px-8">
      <div className="mx-auto lg:min-w-[75%]">
        <Image
          alt="Logo"
          className="mt-4 lg:mt-10"
          height="31"
          src="/images/logo_white.svg"
          width="202"
        />
        <div className="mt-12 grid lg:mt-40">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-[35.5rem] text-white">
              <Heading className="mb-6 text-white">{t('login.title')}</Heading>
              <Text size="lg">{t('login.text')}</Text>
            </div>
            <Card className="w-full lg:w-[25.75rem]">
              <Heading className="mb-4" variant="h2">
                {t('common.login')}
              </Heading>
              <Button
                className="w-full"
                size="lg"
                onClick={handleLogin}
                {...createTestIdProp('sign-in-btn')}
              >
                {t('common.signin')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
