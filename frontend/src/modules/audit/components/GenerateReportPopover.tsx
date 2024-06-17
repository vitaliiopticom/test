import React, { FC, useState } from 'react';

import { Card, Popover } from '@/components/elements';
import { toast } from '@/components/shared';
import { useFetchFile } from '@/hooks';
import { LANGS, useTranslation } from '@/i18n';

import { useDownloadPdfReportLazyQuery } from '../api/downloadPdfReport';

import { GenerateReportPopoverRow } from './GenerateReportPopoverRow';

type Props = {
  children: React.ReactNode;
  questionnaireId: string;
};

export const GenerateReportPopover: FC<Props> = ({
  questionnaireId,
  children,
}) => {
  const { t } = useTranslation();

  const [downloadPdfReport] = useDownloadPdfReportLazyQuery();

  const { saveFile } = useFetchFile();

  const [targetDownloadLanguageCode, setTargetDownloadLanguageCode] =
    useState<string>();

  // TODO: Uncomment when BE sending functionality is ready
  // const [targetSendLanguageCode, setTargetSendLanguageCode] = useState<string>();

  const handleDownloadPdfReport = (languageCode: string) => {
    setTargetDownloadLanguageCode(languageCode);

    downloadPdfReport({
      variables: {
        downloadPdfReport: {
          questionnaireId,
          languageCode,
        },
      },
      onCompleted: async (data) => {
        const pdfUri = data?.downloadPdfReport.uri;
        try {
          await saveFile(pdfUri);
        } catch {
          toast.error<string>(t('Error.Audit.ReportDownloadFailed'));
        }

        setTargetDownloadLanguageCode(undefined);
      },
      onError: () => {
        setTargetDownloadLanguageCode(undefined);
      },
    });
  };

  return (
    <Popover trigger={children}>
      <Card className="py-4">
        {LANGS.map(({ icon, label, code }) => (
          <GenerateReportPopoverRow
            key={code}
            // TODO: Include check for targetSendLanguageCode when email sending is supported
            actionsDisabled={!!targetDownloadLanguageCode}
            code={code}
            icon={icon}
            //
            isDownloading={targetDownloadLanguageCode === code}
            label={label}
            // TODO: Uncomment when BE sending functionality is ready
            // isSending={targetSendLanguageCode === code}
            onDownloadPdfReport={handleDownloadPdfReport}
          />
        ))}
      </Card>
    </Popover>
  );
};
