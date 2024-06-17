import type { GraphQLErrors, NetworkError } from '@apollo/client/errors';

import { toast } from '@/components/shared';
import type { TFunction } from '@/i18n';

export const hasGqlErrorCode = (code: string, errors?: GraphQLErrors) => {
  return errors?.some((error) => error.extensions.code === code);
};

export const hasNetworkStatusCode = (
  code: number,
  error?: NetworkError | any,
) => {
  return error?.statusCode === code;
};

export const handleErrorNotifications = (
  t: TFunction,
  errors?: GraphQLErrors,
) => {
  errors?.forEach((error) => {
    if (!error.message) return;

    if (!error.extensions.code || !error.extensions.errorCodeLocalizationKey) {
      return toast.error(error.message, { toastId: error.message });
    }

    toast.error<string>(
      t(error.extensions.errorCodeLocalizationKey as string, {
        defaultValue: error.message,
      }),
      { toastId: error.extensions.errorCodeLocalizationKey as string },
    );
  });
};

export const getErrorMessage = (t: TFunction, errors?: GraphQLErrors) => {
  return errors?.map((error) => {
    const { message, extensions } = error;

    if (!message) return;

    if (!extensions.code || !extensions.errorCodeLocalizationKey) {
      return message;
    }

    return t(extensions.errorCodeLocalizationKey as string, {
      defaultValue: message,
    });
  });
};
