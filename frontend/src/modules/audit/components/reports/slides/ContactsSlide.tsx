import React from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';

import type { TemplateImage } from '../ImageTemplates';

const styles = StyleSheet.create({
  layout: {
    marginTop: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  item: {
    backgroundColor: '#F6F5F9',
  },
  image: {
    objectFit: 'contain',
    objectPosition: 'center',
    width: 375,
    height: 230,
  },
});

type Props = {
  items: TemplateImage[];
};

export const ContactsSlide: React.FC<Props> = ({ items }) => {
  const displayedImages = items.slice(0, 2);

  return (
    <View style={styles.layout}>
      {displayedImages.map((image) => (
        <View key={image.imgSrc} style={styles.item}>
          <Image src={image.imgSrc || ''} style={styles.image} />
        </View>
      ))}
    </View>
  );
};
