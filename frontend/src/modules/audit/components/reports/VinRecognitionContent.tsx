import { FC, useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { Trans, useTranslation } from '@/i18n';

import { Checklist } from './Checklist';
import { Text } from './Text';

export const VinRecognitionContent: FC = () => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        checkListWrapper: {
          display: 'flex',
          position: 'absolute',
          top: 65,
          gap: 25,
          height: 440,
          width: 389,
          backgroundColor: '#FFFFFF',
          paddingLeft: 33,

          paddingTop: 36,
          paddingBottom: 24,
          marginLeft: 50,
          marginTop: 91,
        },
        itemStyle: {
          alignItems: 'flex-start',
          width: 298,
          gap: 14,
        },
        mobileImage: {
          position: 'absolute',
          width: 252,
          top: -77,
          left: 510,
        },
        highlightTextLight: {
          color: '#A51271',
        },
      }),
    [],
  );

  const items = useMemo(
    () => [
      t('audit.report.vinRecognitionText.text1'),
      <Trans i18nKey="audit.report.vinRecognitionText.text2">
        The
        <Text style={styles.highlightTextLight}>artificial intelligence</Text>
        automatically assigns the sequence of photos to the correct folder in
        the vehicle. There is no need to download, save or sort images. No
        desktop folders and no data loss.
      </Trans>,
      <Trans i18nKey="audit.report.vinRecognitionText.text3">
        <Text style={styles.highlightTextLight}>Synchronization</Text> between
        app and library happens automatically.
      </Trans>,
      <Trans i18nKey="audit.report.vinRecognitionText.text4">
        It is possible to use our European configurator Opti(Config), which
        determines the exact equipment of your cars and summarizes it
        automatically
        <Text style={styles.highlightTextLight}>in a sales file</Text>.
      </Trans>,
    ],
    [styles.highlightTextLight, t],
  );

  return (
    <View style={styles.checkListWrapper}>
      <Checklist
        checkIconStyle={{ marginTop: 3 }}
        items={items}
        style={styles.itemStyle}
      />
      <Image src="/images/reports/mobilePhone.png" style={styles.mobileImage} />
    </View>
  );
};
