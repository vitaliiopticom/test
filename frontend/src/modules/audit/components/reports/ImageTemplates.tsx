import React, { ReactNode, useMemo } from 'react';
import type { Style } from '@react-pdf/types';

import { Image, Link, StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

type NumberOfImages = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const flexItemPropertiesMap: Record<
  NumberOfImages,
  { width?: number; height?: number }
> = {
  1: {
    width: 600,
    height: 300,
  },
  2: {
    width: 280,
    height: 280,
  },
  3: {
    width: 180,
    height: 180,
  },
  4: {
    width: 140,
    height: 140,
  },
  5: {},
  6: {
    width: 140,
    height: 140,
  },
  7: {
    width: 100,
    height: 100,
  },
  8: {
    width: 100,
    height: 100,
  },
};

export type TemplateImage = {
  imgSrc: string;
  href: string;
};

type Props = {
  images: TemplateImage[];
  hideLinks?: boolean;
};

export const ImageTemplates: React.FC<Props> = ({ images, hideLinks }) => {
  const { t } = useTranslation();

  const numberOfImages =
    images.length > 8 ? 8 : (images.length as NumberOfImages);
  const displayedImages = images.slice(0, numberOfImages);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flex: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          columnGap: 20,
          rowGap: 5,
          width: '100%',
          height: '100%',
        },
        imageLinkWrapper: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'auto',
        },
        imageContainer: {
          backgroundColor: '#F6F5F9',
        },
        image: {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          ...flexItemPropertiesMap[numberOfImages],
        },
        link: {
          width: flexItemPropertiesMap[numberOfImages]?.width ?? 140,
          overflow: 'hidden',
          textAlign: 'center',
          marginTop: 10,
          fontSize: 12,
          color: '#a51271',
          fontFamily: 'Outfit',
        },
        fiveItemsFlex: {
          flexDirection: 'column',
          rowGap: 10,
        },
        fiveItemsFirstRow: {
          width: 150,
          height: 150,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          backgroundColor: '#F6F5F9',
        },
        fiveItemsSecondRow: {
          width: 125,
          height: 125,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#F6F5F9',
        },
        break: {
          flexBasis: '100%',
          height: 0,
        },
      }),
    [numberOfImages],
  );

  const renderImageCard = (
    image: TemplateImage,
    wrapperStyle: Style,
    imageStyle?: Style,
  ) => {
    if (!image?.imgSrc || !image?.href) {
      return;
    }

    return (
      <View key={image.imgSrc} style={styles.imageLinkWrapper}>
        <View style={wrapperStyle}>
          <Image
            cache={false}
            src={image.imgSrc}
            style={[styles?.image, ...(imageStyle ? [imageStyle] : [])]}
          />
        </View>
        {!hideLinks && (
          <Link src={image.href} style={styles.link}>
            {`>> ${t('audit.report.openPhotos')}`}
          </Link>
        )}
      </View>
    );
  };

  const renderFiveItemsLayout = () => {
    const firstRow = displayedImages.slice(0, 2);
    const secondRow = displayedImages.slice(2, 5);

    return (
      <View style={styles.fiveItemsFlex}>
        <View style={[styles.flex]}>
          {firstRow.map((image) =>
            renderImageCard(image, styles.fiveItemsFirstRow),
          )}
        </View>
        <View style={[styles.flex]}>
          {secondRow.map((image) =>
            renderImageCard(image, styles.fiveItemsSecondRow),
          )}
        </View>
      </View>
    );
  };

  const renderItemsLayoutWithBreak = (breakIndex: number) => {
    return (
      <View style={[styles.flex]}>
        {displayedImages.reduce((acc, image, index) => {
          if (index === breakIndex) {
            return [
              ...acc,
              renderImageCard(image, styles.imageContainer),
              <View key={`break-${index}`} style={styles.break} />,
            ];
          }

          return [...acc, renderImageCard(image, styles.imageContainer)];
        }, [] as ReactNode[])}
      </View>
    );
  };

  switch (numberOfImages) {
    case 4:
      return renderItemsLayoutWithBreak(1);
    case 5:
      return renderFiveItemsLayout();
    case 6:
      return renderItemsLayoutWithBreak(2);
    case 7:
    case 8:
      return renderItemsLayoutWithBreak(3);
    default:
      return (
        <View style={styles.flex}>
          {displayedImages.map((image) =>
            renderImageCard(image, styles.imageContainer),
          )}
        </View>
      );
  }
};
