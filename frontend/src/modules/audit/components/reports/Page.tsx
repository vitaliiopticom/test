import { FC, ReactNode, useMemo } from 'react';

import {
  Page as PdfPage,
  StyleSheet,
  Text,
} from '@/components/shared/PdfCreator';

type Props = {
  children: ReactNode;
  index?: number;
  isDarkPageNumber?: boolean;
  isPageNumberHidden?: boolean;
  isBeforeBgDark?: boolean;
  isAfterBgLight?: boolean;
  isBottomBgLight?: boolean;
  isCenterLeftBgLight?: boolean;
  isCenterRightBgDark?: boolean;
  isCenterTopBottomBgLight?: boolean;
  isCenterBottomBgLight?: boolean;
  isLeftBgLight?: boolean;
  isLeftTopBgDark?: boolean;
  isLeftTopBgDark2?: boolean;
  isLeftBgDark?: boolean;
  isLeftBottomBgLight?: boolean;
  isRightBgDark?: boolean;
  isRightBgLight?: boolean;
  isRightBottomBgDark?: boolean;
  isRightBottomBgLight?: boolean;
  isRightBottomDark?: boolean;
  isRightTopBgDark?: boolean;
  isRightTopBgDark2?: boolean;
  isRightTopBgDark3?: boolean;
  isTopBgDark?: boolean;
  isFooter?: boolean;
};

export const Page: FC<Props> = ({
  index,
  isDarkPageNumber,
  isFooter,
  isBeforeBgDark,
  isAfterBgLight,
  isBottomBgLight,
  isCenterLeftBgLight,
  isCenterRightBgDark,
  isCenterTopBottomBgLight,
  isCenterBottomBgLight,
  isLeftBgLight,
  isLeftBottomBgLight,
  isLeftTopBgDark,
  isLeftTopBgDark2,
  isLeftBgDark,
  isRightBgDark,
  isRightBgLight,
  isRightBottomBgDark,
  isRightBottomBgLight,
  isRightTopBgDark,
  isRightTopBgDark2,
  isRightTopBgDark3,
  isTopBgDark,
  isPageNumberHidden,
  children,
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        coverPage: {
          backgroundColor: '#fff',
        },
        pageNumber: {
          position: 'absolute',
          bottom: 12,
          right: 16,
          fontFamily: 'Outfit',
          fontSize: 10,
        },
        fontWhite: {
          color: '#fff',
        },
        fontDark: {
          color: '#20263D',
        },
        isLeftBgLight: {
          position: 'absolute',
          left: 0,
          width: 435,
          height: '100vh',
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isBottomBgLight: {
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 268,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isLeftBottomBgLight: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 509,
          height: 476,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isLeftTopBgDark: {
          position: 'absolute',
          left: 0,
          width: 294,
          height: 300,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isLeftTopBgDark2: {
          position: 'absolute',
          left: 0,
          width: 471,
          height: 122,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 4,
        },
        isLeftBgDark: {
          position: 'absolute',
          left: 0,
          width: 365,
          height: '100vh',
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightBgDark: {
          position: 'absolute',
          right: 0,
          width: 330,
          height: '100vh',
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightBgLight: {
          position: 'absolute',
          right: 36,
          width: 272,
          height: '100vh',
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isRightTopBgDark: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: 294,
          height: 300,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightTopBgDark2: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: 444,
          height: 300,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightTopBgDark3: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: 130,
          height: 327,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightBottomBgDark: {
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 372,
          height: 236,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isRightBottomBgLight: {
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 704,
          height: 294,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isCenterTopBottomBgLight: {
          position: 'absolute',
          left: 25,
          width: 547,
          height: '100vh',
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 4,
        },
        isCenterBottomBgLight: {
          position: 'absolute',
          bottom: 0,
          left: 25,
          width: 760,
          height: 548,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 4,
        },
        isCenterLeftBgLight: {
          position: 'absolute',
          top: 41,
          left: 41,
          width: 381,
          height: 515,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 4,
        },
        isCenterRightBgDark: {
          position: 'absolute',
          top: 41,
          left: 420,
          width: 381,
          height: 515,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 4,
        },
        isBeforeBgDark: {
          position: 'absolute',
          bottom: 0,
          left: 39,
          width: 383,
          height: 543,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isAfterBgLight: {
          position: 'absolute',
          top: 0,
          left: 422,
          width: 379,
          height: 556,
          borderRadius: 0,
          backgroundColor: '#F6F5F9',
          zIndex: 5,
        },
        isTopBgDark: {
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: 100,
          borderRadius: 0,
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        isTopBgWhite: {
          position: 'absolute',
          top: 25,
          width: '94%',
          height: 80,
          marginLeft: 25,
          marginRight: 25,
          borderRadius: 0,
          borderBottom: 'solid transparent',
          backgroundColor: '#FFFFFF',
          zIndex: 5,
        },
        footer: {
          position: 'absolute',
          bottom: 0,
          height: 50,
          width: '100%',
          backgroundColor: '#1D2237',
          zIndex: 5,
        },
        none: {
          display: 'none',
        },
      }),
    [],
  );

  return (
    <PdfPage orientation="landscape" size="A4" style={styles.coverPage}>
      {children}
      {(index || index === 0) && !isPageNumberHidden && (
        <Text
          style={[
            styles.pageNumber,
            styles[isDarkPageNumber ? 'fontDark' : 'fontWhite'],
          ]}
        >
          {index + 2}
        </Text>
      )}
      <Text style={isBottomBgLight ? styles.isBottomBgLight : styles.none} />
      <Text style={isBeforeBgDark ? styles.isBeforeBgDark : styles.none} />
      <Text style={isAfterBgLight ? styles.isAfterBgLight : styles.none} />
      <Text
        style={isCenterLeftBgLight ? styles.isCenterLeftBgLight : styles.none}
      />
      <Text
        style={isCenterRightBgDark ? styles.isCenterRightBgDark : styles.none}
      />
      <Text
        style={
          isCenterTopBottomBgLight
            ? styles.isCenterTopBottomBgLight
            : styles.none
        }
      />
      <Text
        style={
          isCenterBottomBgLight ? styles.isCenterBottomBgLight : styles.none
        }
      />
      <Text
        style={isLeftBottomBgLight ? styles.isLeftBottomBgLight : styles.none}
      />
      <Text style={isLeftBgLight ? styles.isLeftBgLight : styles.none} />
      <Text style={isLeftTopBgDark ? styles.isLeftTopBgDark : styles.none} />
      <Text style={isLeftTopBgDark2 ? styles.isLeftTopBgDark2 : styles.none} />
      <Text style={isLeftBgDark ? styles.isLeftBgDark : styles.none} />
      <Text style={isRightBgDark ? styles.isRightBgDark : styles.none} />
      <Text style={isRightBgLight ? styles.isRightBgLight : styles.none} />
      <Text style={isRightTopBgDark ? styles.isRightTopBgDark : styles.none} />
      <Text
        style={isRightTopBgDark2 ? styles.isRightTopBgDark2 : styles.none}
      />
      <Text
        style={isRightTopBgDark3 ? styles.isRightTopBgDark3 : styles.none}
      />
      <Text
        style={isRightBottomBgDark ? styles.isRightBottomBgDark : styles.none}
      />
      <Text
        style={isRightBottomBgLight ? styles.isRightBottomBgLight : styles.none}
      />
      <Text style={isTopBgDark ? styles.isTopBgDark : styles.none} />
      <Text style={isTopBgDark ? styles.isTopBgWhite : styles.none} />
      <Text style={isFooter ? styles.footer : styles.none} />
    </PdfPage>
  );
};
