import { useMemo } from 'react';

import { Image, StyleSheet, Text, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

export const RenderingComparison = () => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        imageComparison: {
          width: 768,
          marginLeft: 37,
        },
        textContainer: {
          flexDirection: 'row',
          marginTop: 17,
        },
        item: {
          width: '33%',
          textAlign: 'center',
          fontFamily: 'Outfit',
          color: '#a51271',
          fontWeight: 700,
          fontSize: 14,
        },
        middleItem: {
          paddingLeft: 30,
        },
      }),
    [],
  );

  return (
    <View>
      <Image
        src="/images/reports/renderingComparison.png"
        style={styles.imageComparison}
      />
      <View style={styles.textContainer}>
        <Text style={styles.item}>
          {t('audit.report.renderingComparison.groundReflections')}
        </Text>
        <Text style={[styles.item, styles.middleItem]}>
          {t('audit.report.renderingComparison.polishRims')}
        </Text>
        <Text style={[styles.item, { marginLeft: 25 }]}>
          {t('audit.report.renderingComparison.polishVarnish')}
        </Text>
      </View>
    </View>
  );
};
