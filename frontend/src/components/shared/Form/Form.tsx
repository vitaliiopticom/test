import { createContext, ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm as useRHFForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import type { ZodSchema } from 'zod';

export type ZodSchemaType = ZodSchema;
export type FieldValuesType = FieldValues;
export type DeepPartialType<T> = DeepPartial<T>;

export const injectSchemaResolver = <V extends FieldValuesType>(
  formProps: UseFormProps<V>,
  schema?: ZodSchemaType,
): UseFormProps<V> | undefined => {
  if (!schema) return formProps;

  return { resolver: zodResolver(schema), ...formProps };
};

export type FormDisabledContextType = { disabled?: boolean };

type BaseProps<V extends {}> = {
  children: ReactNode;
  onSubmit: SubmitHandler<V>;
  formMethods?: UseFormReturn<V>;
  schema?: ZodSchema;
};

type HTMLFormProps = {
  id?: string;
  className?: string;
} & FormDisabledContextType;

export type FormProps<V extends FieldValuesType> = BaseProps<V> &
  UseFormProps<V> &
  HTMLFormProps;

export const FormDisabledContext = createContext<FormDisabledContextType>({
  disabled: false,
});

const BaseProvider = <V extends FieldValuesType>({
  children,
  onSubmit,
  formMethods,
  id,
  className,
  disabled,
}: Required<Omit<BaseProps<V>, 'schema'>> &
  HTMLFormProps &
  FormDisabledContextType) => {
  return (
    <FormProvider {...formMethods}>
      <FormDisabledContext.Provider value={{ disabled }}>
        <form
          className={className}
          id={id}
          noValidate
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormDisabledContext.Provider>
    </FormProvider>
  );
};

const UncontrolledForm = <V extends FieldValuesType>({
  children,
  onSubmit,
  id,
  className,
  disabled,
  ...rest
}: Omit<FormProps<V>, 'formMethods'>) => {
  const methods = useRHFForm<V>(rest);

  return (
    <BaseProvider<V>
      className={className}
      disabled={disabled}
      formMethods={methods}
      id={id}
      onSubmit={onSubmit}
    >
      {children}
    </BaseProvider>
  );
};

export const Form = <V extends FieldValuesType>({
  children,
  onSubmit,
  formMethods,
  schema,
  id,
  className,
  disabled,
  ...rest
}: FormProps<V>) => {
  if (formMethods) {
    return (
      <BaseProvider<V>
        className={className}
        disabled={disabled}
        formMethods={formMethods}
        id={id}
        onSubmit={onSubmit}
      >
        {children}
      </BaseProvider>
    );
  }

  return (
    <UncontrolledForm<V>
      className={className}
      disabled={disabled}
      id={id}
      onSubmit={onSubmit}
      {...injectSchemaResolver(rest, schema)}
    >
      {children}
    </UncontrolledForm>
  );
};

export const useForm = <V extends FieldValuesType>(
  args?: UseFormProps<V> & Pick<BaseProps<V>, 'schema'>,
) => {
  const { schema, ...rest } = args || {};
  return useRHFForm<V>(injectSchemaResolver(rest, schema));
};

export type { UseFormReturn } from 'react-hook-form';
export {
  type DefaultValues as FormDefaultValues,
  type SubmitHandler,
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
