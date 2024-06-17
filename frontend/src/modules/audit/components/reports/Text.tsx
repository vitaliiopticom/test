import React, { PropsWithChildren } from 'react';
import { Style } from '@react-pdf/types';

import { StyleSheet, Text as PDFText } from '@/components/shared/PdfCreator';

type Props = PropsWithChildren<{
  style?: Style;
}>;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 1.75,
    fontFamily: 'Outfit',
  },
});

export const Text: React.FC<Props> = ({ style, children }) => {
  return (
    <PDFText style={[styles.text, ...(style ? [style] : [])]}>
      {children}
    </PDFText>
  );
};
