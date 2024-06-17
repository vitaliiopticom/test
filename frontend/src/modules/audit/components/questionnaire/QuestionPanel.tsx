import { ClipboardEvent, FC } from 'react';
import { useParams } from 'react-router-dom';

import { Upload } from '@/components/elements';
import { TextareaField, useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { getFileFromPasteEvent } from '@/utils/clipboard';

import { useUploadAttachmentsMutation } from '../../api/uploadAttachment';
import {
  AttachmentsCombinationType,
  AuditDetailParams,
  AuditQuestionnaireValues,
} from '../../types';
import { getAttachmentType } from '../../utils';

import { AttachmentsUpload } from './AttachmentsUpload';
import { FieldConfig } from './fieldsConfig';

const ATTACHMENT_CONFIG = {
  accept: {
    'image/jpeg': [],
    'image/png': [],
    'application/pdf': [],
  },
  maxSize: 20000000, // 20 MB
};

type Props = {
  name: string;
  field: FieldConfig;
  canAttachFile?: boolean;
  isDisabled?: boolean;
  attachmentsCombination: AttachmentsCombinationType;
};

export const QuestionPanel: FC<Props> = ({
  name,
  canAttachFile,
  isDisabled,
  field,
  attachmentsCombination,
}) => {
  const { t } = useTranslation();
  const { id } = useParams<AuditDetailParams>();
  const formContext = useFormContext<AuditQuestionnaireValues>();
  const [uploadAttachments, uploadAttachmentsState] =
    useUploadAttachmentsMutation();

  const attachmentsValue = formContext.watch(`${name}.attachments`);
  const fieldValue = formContext.watch(`${name}.value`);
  const hasEmptyValue = field.isEmpty(fieldValue);
  const disabled =
    isDisabled || (hasEmptyValue && !field.enableAttachmentsOnStart);

  const handleUploadAttachments = (files: File[]) => {
    if (!id || isDisabled) return;

    uploadAttachments({
      variables: {
        input: {
          files: files.map((file, index) => ({
            data: file,
            attachmentType: getAttachmentType(attachmentsCombination, index),
          })),
          questionId: name,
          questionnaireId: id,
        },
      },
      onCompleted: (data) => {
        formContext.setValue(`${name}.attachments`, [
          ...(attachmentsValue || []),
          ...(data?.uploadAttachments || []),
        ]);
      },
    });
  };

  const handlePasteFromClipboard = (
    event: ClipboardEvent<HTMLTextAreaElement>,
  ) => {
    if (!canAttachFile || isDisabled) return;

    const file = getFileFromPasteEvent(event);
    if (!file) return;

    handleUploadAttachments([file]);
  };

  return (
    <>
      {canAttachFile && (
        <Upload
          buttonSize="sm"
          buttonText={t('audit.auditDetail.uploadFiles')}
          className="w-fit"
          disabled={disabled}
          isUploading={uploadAttachmentsState.loading}
          variant="button"
          isMultiple
          onChange={handleUploadAttachments}
          {...ATTACHMENT_CONFIG}
        />
      )}
      <div className="mt-4 flex flex-col gap-4">
        <TextareaField
          disabled={disabled}
          name={`${name}.note`}
          placeholder={
            canAttachFile
              ? t('audit.auditDetail.addNoteUploadPlaceholder')
              : t('audit.auditDetail.addNotePlaceholder')
          }
          onPaste={handlePasteFromClipboard}
        />
        {!!attachmentsValue?.length && (
          <AttachmentsUpload
            attachmentsCombination={attachmentsCombination}
            isDisabled={isDisabled}
            name={name}
          />
        )}
      </div>
    </>
  );
};
