import { useCallback, useMemo } from 'react';
import { z, ZodRawShape, ZodType, ZodTypeAny } from 'zod';

import { useTranslation } from '@/i18n';
import { validateByCountry } from '@/utils/phone';

export const useFormValidation = () => {
  const { t } = useTranslation();

  const injectOptional = useCallback(
    (rule: ZodTypeAny, isOptional?: boolean) => {
      return isOptional ? rule.or(z.literal('')) : rule;
    },
    [],
  );

  const schema = useCallback(
    <V>(shape: Partial<Record<keyof V, ZodTypeAny>>) => {
      return z.object(shape as ZodRawShape) as unknown as ZodType<V>;
    },
    [],
  );

  const string = useCallback(
    (isOptional?: boolean) => {
      return injectOptional(
        z
          .string({ invalid_type_error: t('fieldError.required') })
          .min(1, t('fieldError.required')),
        isOptional,
      );
    },
    [t, injectOptional],
  );

  const stringArray = useCallback(
    (minLength?: number) => {
      return z
        .string()
        .array()
        .min(minLength ?? 0, t('fieldError.required'));
    },
    [t],
  );

  const email = useCallback(
    (isOptional?: boolean) => {
      return injectOptional(
        z.string().email(t('fieldError.email')),
        isOptional,
      );
    },
    [injectOptional, t],
  );

  // TODO add trans
  const image = useCallback((fileSize: number, types: string[]) => {
    return z
      .any()
      .refine((file) => file?.length !== 1, 'Image is required.')
      .refine((file) => file?.size <= fileSize, `Max file size is 5MB.`)
      .refine(
        (file) => types.includes(file?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.',
      );
  }, []);

  const date = useCallback(
    (isOptional?: boolean) => {
      return injectOptional(z.date().nullable(), isOptional);
    },
    [injectOptional],
  );

  const number = useCallback(
    (isOptional?: boolean) => {
      const rule = z.number({ invalid_type_error: t('fieldError.required') });

      return isOptional ? rule.nullable() : rule;
    },
    [t],
  );

  const boolean = useCallback(() => {
    return z.boolean();
  }, []);

  const phoneNumber = useCallback(
    (isOptional?: boolean) => {
      const isValidPhoneNumber = (phone: string) => {
        const minPhoneLength = 5;
        const optionalCondition = isOptional ? !phone : undefined;

        return (
          optionalCondition ||
          (phone.length > minPhoneLength && validateByCountry(phone))
        );
      };
      return isOptional
        ? z
            .string({ invalid_type_error: t('fieldError.required') })
            .refine(isValidPhoneNumber, {
              message: t('fieldError.phone'),
            })
            .optional()
        : z
            .string({ invalid_type_error: t('fieldError.required') })
            .refine(isValidPhoneNumber, {
              message: t('fieldError.phone'),
            });
    },
    [t],
  );

  // TODO remove/refactor
  const elementSchema = useCallback(
    (withDefaultTenant = false) => {
      return z.array(
        z.object({
          tenantId: injectOptional(
            z
              .string({ invalid_type_error: t('fieldError.required') })
              .min(1, { message: t('fieldError.required') }),
            !withDefaultTenant,
          ),
          roleAssignments: z.array(z.string()),
        }),
      );
    },
    [t, injectOptional],
  );

  return useMemo(
    () => ({
      schema,
      string,
      email,
      date,
      number,
      boolean,
      phoneNumber,
      elementSchema,
      stringArray,
      image,
    }),
    [
      schema,
      string,
      email,
      date,
      number,
      boolean,
      phoneNumber,
      elementSchema,
      stringArray,
      image,
    ],
  );
};
