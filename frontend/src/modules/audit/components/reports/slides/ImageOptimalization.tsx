import React from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { Header } from '../Header';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    position: 'absolute',
    left: 105,
    top: 0,
    width: 510,
    height: '100vh',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
  },
  imageWrapper: {
    position: 'absolute',
    paddingLeft: 115,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 600,
    height: 430,
    objectFit: 'cover',
  },
});

const imageSrc = '/images/reports/bmwImage.png';

export const ImageOptimalization: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Header style={styles.text}>
        {t('audit.report.imageOptimalization')}
      </Header>
      <View style={styles.imageWrapper}>
        <Image src={imageSrc} style={styles.image} />
      </View>
    </View>
  );
};
