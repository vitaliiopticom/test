import React, { ReactNode, useMemo } from 'react';

import { StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { PresentationImages } from '../PresentationImages';
import { Text } from '../Text';

type Props = {
  images: string[];
  withList?: boolean;
};

const styles = StyleSheet.create({
  presentationWrapper: {
    flexDirection: 'column',
    gap: 30,
  },
  imageWrapper: {
    margin: 'auto',
  },
  image: {
    width: '100%',
    height: 300,
    objectFit: 'cover',
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    color: '#a51271',
    fontWeight: 'bold',
  },
  divider: {
    width: 20,
    height: 2,
    marginBottom: 5,
    backgroundColor: '#a51271',
  },
});

export const PresentationSlide: React.FC<Props> = ({ images, withList }) => {
  const { t } = useTranslation();

  const listItems = useMemo(
    () => [
      t('audit.report.fromOneSide'),
      t('audit.report.fromAnotherSide'),
      t('audit.report.differentEnvironment'),
      t('audit.report.framing'),
      t('audit.report.branding'),
    ],
    [t],
  );

  const listNodesArr = listItems.reduce((acc, item, currentIndex) => {
    return [
      ...acc,
      <Text key={item} style={styles.item}>
        {item}
      </Text>,
      currentIndex !== listItems.length - 1 && (
        <View key={`divider-${item}`} style={styles.divider} />
      ),
    ];
  }, [] as ReactNode[]);

  return (
    <View
      style={[styles.presentationWrapper, { marginTop: withList ? 40 : 80 }]}
    >
      <View style={styles.imageWrapper}>
        <PresentationImages images={images} />
      </View>
      {withList && <View style={styles.linksContainer}>{...listNodesArr}</View>}
    </View>
  );
};
