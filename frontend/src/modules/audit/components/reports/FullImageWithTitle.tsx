import { FC, useMemo } from 'react';

import { Image, StyleSheet, Text, View } from '@/components/shared/PdfCreator';

type Props = {
  title: string;
  imagePath: string;
};

export const FullImageWithTitle: FC<Props> = ({ title, imagePath }) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          marginTop: 108,
          marginLeft: 70,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#20263D',
          textTransform: 'uppercase',
        },
        image: {
          position: 'absolute',
          top: 212,
          left: 72,
          width: 657,
        },
      }),
    [],
  );

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Image src={imagePath} style={styles.image} />
    </View>
  );
};
