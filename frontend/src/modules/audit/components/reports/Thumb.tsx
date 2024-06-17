import { FC, useMemo } from 'react';
import { Style } from '@react-pdf/types';

import { Image, StyleSheet } from '@/components/shared/PdfCreator';

type Props = {
  type: 'up' | 'down';
  style?: Style;
};

export const Thumb: FC<Props> = ({ type, style }) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        thumb: {
          position: 'absolute',
          width: 114,
        },
        thumbUp: {
          top: 60,
          right: 56,
        },
        thumbDown: {
          top: 80,
          right: 43,
          transform: 'rotate(180deg)',
        },
      }),
    [],
  );

  return (
    <Image
      src="/images/reports/thumbUp.png"
      style={[
        styles.thumb,
        type === 'up' ? styles.thumbUp : styles.thumbDown,
        ...(style ? [style] : []),
      ]}
    />
  );
};
