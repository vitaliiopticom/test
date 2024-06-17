import { useEffect, useMemo, useState } from 'react';
import type { ZodObjectDef } from 'zod';

import { Button, Modal } from '@/components/elements';
import { useDisclosure, useFormValidation, useTabs } from '@/hooks';
import { useTranslation } from '@/i18n';
import { createTestIdProp } from '@/utils/e2e';

import { handleProceedWithPrompt } from '../PromptConfirmModal';
import { PromptConfirmModal } from '../PromptConfirmModal/PromptConfirmModal';
import { Tabs } from '../Tabs';

import {
  FieldValuesType,
  Form,
  FormDefaultValues,
  useForm,
  ZodSchemaType,
} from './Form';

export type Tab = {
  title: string;
  content: JSX.Element;
  schema: ZodSchemaType;
};

type Props<T> = {
  defaultValues: FormDefaultValues<T>;
  isOpen: boolean;
  isSubmitting: boolean;
  successSubmitCount: number;
  tabs: Tab[];
  title: string;
  onClose: () => void;
  onSubmit: (values: T) => void;
};

export const FormModalWithTabs = <T extends FieldValuesType>({
  title,
  onClose,
  onSubmit,
  isSubmitting,
  successSubmitCount,
  tabs,
  defaultValues,
  isOpen,
}: Props<T>) => {
  const [internalSuccessSubmitCount, setInternalSuccessSubmitCount] =
    useState(0);

  const warningModal = useDisclosure();
  const { selectedTabIndex, setSelectedTabIndex } = useTabs();
  const { t } = useTranslation();
  const formValidation = useFormValidation();

  const isNotFirstStep = selectedTabIndex !== 0;
  const isLastStep = selectedTabIndex === tabs.length - 1;

  const combinedSchemas = useMemo(
    () =>
      tabs.reduce((acc, tab) => {
        const getSchemaFromTab = () =>
          (tab.schema?._def as ZodObjectDef).shape();

        acc = { ...acc, ...getSchemaFromTab() };

        return acc;
      }, {}),
    [tabs],
  );

  const formMethods = useForm<T>({
    schema: isLastStep
      ? formValidation.schema<FormDefaultValues<T>>(combinedSchemas)
      : tabs[selectedTabIndex].schema,
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    const shouldResetAfterSubmitSuccess =
      successSubmitCount > internalSuccessSubmitCount;
    if (shouldResetAfterSubmitSuccess) {
      setInternalSuccessSubmitCount((prev) => prev + 1);
      setSelectedTabIndex(0);
      formMethods.reset();
    }
  }, [
    formMethods,
    successSubmitCount,
    internalSuccessSubmitCount,
    setSelectedTabIndex,
  ]);

  const tabsWithoutSchema = useMemo(
    () =>
      tabs.map(({ title, content }) => ({
        title,
        content,
      })),
    [tabs],
  );

  const tabContentStyle =
    'last:[&>div]:mt-6 last:[&>div]:max-h-[calc(100vh-288px)] last:[&>div]:overflow-auto';

  const closeAndReset = () => {
    warningModal.onClose();
    setTimeout(() => onClose(), 0);
    setSelectedTabIndex(0);
    formMethods.reset();
  };

  const handleModalClose = () =>
    handleProceedWithPrompt(
      formMethods,
      warningModal.onOpen,
      closeAndReset,
      defaultValues,
    );

  const buttons = (
    <div className="absolute bottom-6 flex w-[calc(100%-48px)] justify-between">
      <div>
        {isNotFirstStep && (
          <Button
            className="mr-4"
            variant="secondary"
            onClick={() => setSelectedTabIndex((prev) => prev - 1)}
          >
            {t('common.back')}
          </Button>
        )}
      </div>
      <div className="flex w-[250px] justify-end">
        <Button className="mr-4" variant="ghost" onClick={handleModalClose}>
          {t('common.cancel')}
        </Button>
        {!isLastStep && (
          <Button
            onClick={async () => {
              const isValid = await formMethods.trigger();

              if (isValid) {
                setSelectedTabIndex((prev) => prev + 1);
              }
            }}
            {...createTestIdProp('add_company_next')}
          >
            {t('common.next')}
          </Button>
        )}
        {isLastStep && (
          <Button
            isLoading={isSubmitting}
            type="submit"
            {...createTestIdProp('add_company_next')}
          >
            {t('common.create')}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Modal
        className="relative pb-24 [&>div]:max-h-full [&>div]:overflow-y-visible"
        isOpen={isOpen}
        title={title}
        onClose={handleModalClose}
      >
        <Form
          className="flex flex-col gap-5"
          formMethods={formMethods}
          onSubmit={onSubmit}
        >
          <div className={tabContentStyle}>
            <Tabs
              selectedTab={selectedTabIndex}
              tabs={tabsWithoutSchema}
              unmount={false}
              isNotClickable
            />
          </div>
          {buttons}
        </Form>
      </Modal>
      <PromptConfirmModal
        isOpen={warningModal.isOpen}
        onClose={warningModal.onClose}
        onConfirm={closeAndReset}
      />
    </>
  );
};
