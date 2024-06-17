import { FC, useMemo } from 'react';

import { Image, StyleSheet, Text, View } from '@/components/shared/PdfCreator';

type Props = {
  ratingNumber: number;
  ratingMaxNumber: number;
  size?: 'sm' | 'lg';
};

export const Rating: FC<Props> = ({
  ratingNumber,
  ratingMaxNumber,
  size = 'lg',
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        ratingStarsWrapper: {
          display: 'flex',
          flexDirection: 'row',
        },
        ratingStarSm: {
          width: 16,
          height: 16,
          marginRight: 4,
        },
        ratingStarLg: {
          width: 34,
          height: 34,
          marginRight: 8,
        },

        ratingNumber: {
          fontWeight: 600,
          fontFamily: 'Outfit',
        },
        fontSm: {
          marginTop: -2,
          marginLeft: 8,
          fontSize: 16,
          color: '#20263D',
        },
        fontLg: {
          marginTop: -4,
          marginLeft: 8,
          fontSize: 32,
          color: '#fff',
        },
      }),
    [],
  );

  const starSize = size === 'sm' ? styles.ratingStarSm : styles.ratingStarLg;
  const renderStars = (length: number, iconPath: string) =>
    Array.from({ length }, (_, index) => (
      <Image key={index} src={iconPath} style={starSize} />
    ));
  const ratingRoundedToHalf = Math.round(ratingNumber * 2) / 2;
  const colorStarsNumber = Math.floor(ratingRoundedToHalf);
  const isHalf = ratingRoundedToHalf > colorStarsNumber;
  const greyStarsNumber = ratingMaxNumber - colorStarsNumber - (isHalf ? 1 : 0);

  return (
    <View style={styles.ratingStarsWrapper}>
      {renderStars(colorStarsNumber, '/images/reports/starFull.png')}
      {isHalf && (
        <Image src="/images/reports/starHalfFull.png" style={starSize} />
      )}
      {renderStars(greyStarsNumber, '/images/reports/starEmpty.png')}
      <Text
        style={[
          styles.ratingNumber,
          size === 'sm' ? styles.fontSm : styles.fontLg,
        ]}
      >
        {ratingNumber.toString().replace('.', ',')}
      </Text>
    </View>
  );
};
