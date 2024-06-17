import React, { PropsWithChildren } from 'react';
import { Style } from '@react-pdf/types';

import { StyleSheet, Text } from '@/components/shared/PdfCreator';

type Props = PropsWithChildren<{
  style?: Style;
}>;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Outfit',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#20263D',
    textTransform: 'uppercase',
  },
});

export const Header: React.FC<Props> = ({ style, children }) => {
  return (
    <Text style={[styles.header, ...(style ? [style] : [])]}>{children}</Text>
  );
};
