import { FC, lazy, Suspense, useState } from 'react';

import { Dropdown, Icon } from '@/components/elements';
import { I18nextProvider, Lang, LANGS, useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { useGetReportQuery } from '../../api/getReport';

const AuditReportPdf = lazy(() => import('./AuditReportPdf'));

type Props = {
  questionnaireId: string;
  children: (isLoading: boolean) => React.ReactNode;
};

export const AuditReportExportButton: FC<Props> = ({
  questionnaireId,
  children,
}) => {
  const { i18n } = useTranslation();
  const [pdfExport, setPdfExport] = useState(0); // TODO find cleaner solution
  const [isLoading, setLoading] = useState(false);
  const [i18nPdfInstance] = useState(() => i18n.cloneInstance());

  const [loadReportDetails, { data }] = useGetReportQuery({
    variables: { input: { questionnaireId } },
    skip: !questionnaireId,
  });

  const reportData = data?.auditReportData;

  const handleLangChange = (lang: Lang) => {
    setLoading(true);
    i18nPdfInstance.changeLanguage(lang.code).then(() => {
      setPdfExport((prev) => prev + 1);
      localStorage.setItem(
        i18n.services.languageDetector.options.lookupLocalStorage,
        i18n.language,
      );
      loadReportDetails();
    });
  };

  return (
    <>
      <Dropdown
        items={LANGS}
        placement="bottom"
        render={({ defaultClassName, item }) => (
          <button
            className={cx('flex items-center gap-2', defaultClassName)}
            disabled={isLoading}
            type="button"
            onClick={() => handleLangChange(item)}
          >
            <Icon className="h-6 w-6" name={item.icon} /> {item.label}
          </button>
        )}
      >
        {children(isLoading)}
      </Dropdown>
      <I18nextProvider i18n={i18nPdfInstance}>
        {pdfExport > 0 && reportData && (
          <Suspense fallback={null}>
            <AuditReportPdf
              key={pdfExport}
              i18n={i18nPdfInstance}
              report={reportData}
              setLoading={setLoading}
            />
          </Suspense>
        )}
      </I18nextProvider>
    </>
  );
};
