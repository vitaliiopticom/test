import { FC, useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';

type Props = {
  imagePath1: string;
  imagePath2: string;
};

export const Contacts: FC<Props> = ({ imagePath1, imagePath2 }) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        imagesWrapper: {
          display: 'flex',
          flexDirection: 'row',
          marginTop: 58,
          marginLeft: 54,
        },
        image: {
          width: 360,
          margin: 3,
        },
      }),
    [],
  );

  return (
    <View style={styles.imagesWrapper}>
      <Image src={imagePath1} style={styles.image} />
      <Image src={imagePath2} style={styles.image} />
    </View>
  );
};
