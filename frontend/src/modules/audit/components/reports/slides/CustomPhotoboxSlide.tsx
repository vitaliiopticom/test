import React from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { Header } from '../Header';

const carImageSrc = '/images/reports/carTiles.png';
const mobileImageSrc = '/images/reports/mobileTiles.png';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingRight: 20,
    flexDirection: 'row',
  },
  firstColumn: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  firstColumnContainer: {
    backgroundColor: '#fff',
    padding: 30,
  },
  firstColumnHeader: {
    marginBottom: 24,
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 300,
    paddingRight: 35,
    paddingLeft: 40,
  },
  carImage: {
    width: 420,
  },
});

export const CustomPhotoboxSlide: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.flex}>
      <View style={styles.firstColumn}>
        <View style={styles.firstColumnContainer}>
          <Header style={styles.firstColumnHeader}>
            {t('audit.report.customPhotobox')}
          </Header>
          <Image src={carImageSrc} style={styles.carImage} />
        </View>
      </View>
      <View style={styles.secondColumn}>
        <Image src={mobileImageSrc} />
      </View>
    </View>
  );
};
