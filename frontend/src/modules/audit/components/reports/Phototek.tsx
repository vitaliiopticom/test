import { useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { Trans, useTranslation } from '@/i18n';

import { Text } from './Text';

export const Phototek = () => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        mobileAndDesktop: {
          position: 'absolute',
          width: 571,
          marginTop: 116,
          marginLeft: 10,
        },
        textWrapper: {
          marginTop: 140,
          marginLeft: 600,
        },
        title: {
          marginBottom: 22,
          fontSize: 18,
          fontWeight: 600,
          fontFamily: 'Outfit',
          textTransform: 'uppercase',
        },
        textContent: {
          width: 218,
          marginBottom: 30,
        },
        onRequest: {
          width: 120,
          height: 40,
          textAlign: 'center',
          paddingTop: 9,
          backgroundColor: '#A51271',
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        highlightTextLight: {
          fontWeight: 'bold',
          color: '#A51271',
        },
      }),
    [],
  );

  return (
    <View>
      <Image
        src="/images/reports/mobileAndLaptop.png"
        style={styles.mobileAndDesktop}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{t('audit.report.phototek')}</Text>
        <Text style={styles.textContent}>
          <Trans i18nKey="audit.report.phototekText1">
            You can still access all of your photos in the media library.
            <Text style={styles.highlightTextLight}>(Opti)Content</Text> stores
            original and edited photos. The database belongs to you and you can
            easily find your media content.
          </Trans>
        </Text>
        <Text style={styles.textContent}>
          {t('audit.report.phototekText2')}
        </Text>
        <Text style={styles.onRequest}>{t('audit.report.onRequest')}</Text>
      </View>
    </View>
  );
};
