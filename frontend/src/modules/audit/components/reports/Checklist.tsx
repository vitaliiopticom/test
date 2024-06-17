import React, { ReactNode } from 'react';
import { Style } from '@react-pdf/types';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';

import { Text } from './Text';

type Props = {
  items: ReactNode[];
  style?: Style;
  textStyle?: Style;
  checkIconStyle?: Style;
};

export const Checklist: React.FC<Props> = ({
  items,
  style,
  textStyle,
  checkIconStyle = {},
}) => {
  const styles = StyleSheet.create({
    list: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
    },
    checkIcon: {
      width: 15,
      height: 15,
      marginTop: -7,
    },
    listItem: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View
          key={typeof item === 'string' ? item : JSON.stringify(item)}
          style={[styles.listItem, ...(style ? [style] : [])]}
        >
          <Image
            src="/images/reports/check.png"
            style={[styles.checkIcon, checkIconStyle]}
          />
          <Text style={textStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
