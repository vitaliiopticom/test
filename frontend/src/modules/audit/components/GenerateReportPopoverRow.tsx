import { FC } from 'react';

import { Button, Icon, IconName } from '@/components/elements';
import { useTranslation } from '@/i18n';

type Props = {
  label: string;
  icon: IconName;
  code: string;
  actionsDisabled: boolean;
  isDownloading: boolean;
  onDownloadPdfReport: (languageCode: string) => void;
};

export const GenerateReportPopoverRow: FC<Props> = ({
  label,
  icon,
  code,
  actionsDisabled,
  isDownloading,
  onDownloadPdfReport,
}) => {
  const { t } = useTranslation();

  return (
    <div key={label} className="flex items-center">
      {icon && <Icon className="my-2.5 mr-2 h-5 w-5" name={icon} />}
      <span className="w-[120px]">{label}</span>
      {/* TODO: Uncomment when BE sending functionality is ready 
      <Button
        disabled={actionsDisabled}
        isLoading={isSending}
        className="mr-2"
        size="sm"
        startIcon="paperPlane"
        variant="secondary"
        onClick={() => console.log('send ' + code)}
      >
        {t('common.send')}
      </Button> */}
      <Button
        disabled={actionsDisabled}
        isLoading={isDownloading}
        size="sm"
        startIcon="downloadCloud"
        variant="secondary"
        onClick={() => {
          onDownloadPdfReport(code);
        }}
      >
        {t('common.download')}
      </Button>
    </div>
  );
};
