import { FC, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { DragDrop, DragDropItem } from '@/components/elements';
import { useFormContext } from '@/components/shared';
import { UploadFile } from '@/types/file';

import { useDeleteAttachmentMutation } from '../../api/deleteAttachment';
import { useReorderAttachmentsMutation } from '../../api/reorderAttachments';
import {
  ATTACHMENTS_COMBINATION,
  AttachmentsCombinationType,
  AuditDetailParams,
  AuditQuestionnaireValues,
  ReorderAttachment,
} from '../../types';
import { getAttachmentType } from '../../utils';

import { AttachmentsUploadCard } from './AttachmentsUploadCard';

type Props = {
  name: string;
  isDisabled?: boolean;
  attachmentsCombination: AttachmentsCombinationType;
};

export const AttachmentsUpload: FC<Props> = ({
  name,
  isDisabled,
  attachmentsCombination,
}) => {
  const { id } = useParams<AuditDetailParams>();
  const removedFile = useRef<UploadFile>();
  const formContext = useFormContext<AuditQuestionnaireValues>();
  const [deleteAttachment, deleteAttachmentState] =
    useDeleteAttachmentMutation();
  const [reorderAttachments] = useReorderAttachmentsMutation();
  const attachmentsValue = formContext.watch(`${name}.attachments`);

  const handleReorderAttachments = (attachments: DragDropItem[]) => {
    if (!id || isDisabled) return;

    const attachmentsMapped: ReorderAttachment[] = attachments.map(
      (el, index) => ({
        id: el.id,
        attachmentType: getAttachmentType(attachmentsCombination, index),
      }),
    );

    reorderAttachments({
      variables: {
        input: {
          questionId: name,
          questionnaireId: id,
          attachments: attachmentsMapped,
        },
      },
    });
  };

  const handleRemoveAttachments = (file: UploadFile) => {
    if (!id || isDisabled) return;

    removedFile.current = file;
    deleteAttachment({
      variables: {
        input: {
          questionId: name,
          questionnaireId: id,
          uri: file.uri,
          attachmentId: file.id,
        },
      },
      onCompleted: () => {
        const newOrder = attachmentsValue.filter((item) => item.id !== file.id);
        formContext.setValue(`${name}.attachments`, newOrder);
        handleReorderAttachments(newOrder);
        removedFile.current = undefined;
      },
    });
  };

  return (
    <DragDrop
      isDisabled={isDisabled}
      items={attachmentsValue}
      itemsLengthAfterSubtitle={
        attachmentsCombination === ATTACHMENTS_COMBINATION.ONLY_PREVIEWS ? 1 : 2
      }
      renderItem={(item, index) => (
        <AttachmentsUploadCard
          attachmentsCombination={attachmentsCombination}
          handleRemoveAttachments={handleRemoveAttachments}
          index={index}
          isDisabled={isDisabled}
          isLoading={
            deleteAttachmentState.loading && removedFile.current?.id === item.id
          }
          item={item}
        />
      )}
      setItems={(items) => formContext.setValue(`${name}.attachments`, items)}
      onReorderItems={handleReorderAttachments}
    />
  );
};
