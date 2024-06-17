import React, { useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';

type Props = {
  images: string[];
};

type NumberOfImages = 1 | 2 | 3;

const flexItemPropertiesMap: Record<
  1 | 2 | 3,
  { width?: number; height?: number }
> = {
  1: {
    width: 752,
    height: 300,
  },
  2: {
    width: 250,
    height: 238,
  },
  3: {
    width: 250,
    height: 238,
  },
};

export const PresentationImages: React.FC<Props> = ({ images = [] }) => {
  const numberOfImages = images.length > 3 ? 3 : images.length;
  const displayedImages = images.slice(0, numberOfImages);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flex: {
          display: 'flex',
          flexDirection: 'row',
        },
        imageWrapper: {
          backgroundColor: '#F6F5F9',
        },
        image: {
          objectFit: 'contain',
          objectPosition: 'center',
          ...flexItemPropertiesMap[numberOfImages as NumberOfImages],
        },
      }),
    [numberOfImages],
  );

  return (
    <View style={styles.flex}>
      {displayedImages.map((image) => (
        <View key={image} style={styles.imageWrapper}>
          <Image src={image} style={styles.image} />
        </View>
      ))}
    </View>
  );
};
