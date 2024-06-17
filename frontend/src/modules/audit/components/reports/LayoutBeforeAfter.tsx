import { FC, useMemo } from 'react';

import { Image, StyleSheet, Text } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

type Props = {
  beforeImagePath: string;
  afterImagePath: string;
  type: string;
  isList?: boolean;
};

export const LayoutBeforeAfter: FC<Props> = ({
  beforeImagePath,
  afterImagePath,
  type,
  isList,
}) => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        solution: {
          position: 'absolute',
          top: 92,
          right: 94,
          textTransform: 'uppercase',
          fontFamily: 'Outfit',
          fontWeight: 600,
          fontSize: 14,
          color: '#A51271',
        },
        solutionWithlist: {
          top: 170,
          right: 75,
        },
        imageBefore: {
          width: 300,
          height: 228,
        },
        imageAfter: {
          position: 'absolute',
          right: 22,
          bottom: 20,
          width: 300,
          height: 228,
        },
        arrowArc: {
          position: 'absolute',
          top: 66,
          left: 308,
          width: 92,
        },
        arrowArcWithlist: {
          top: 70,
        },
      }),
    [],
  );

  return (
    <>
      <Text style={[styles.solution, isList ? styles.solutionWithlist : {}]}>
        {t('common.solution')} {t(`audit.type.${type}`)}
      </Text>
      <Image src={beforeImagePath} style={styles.imageBefore} />
      <Image src={afterImagePath} style={styles.imageAfter} />
      <Image
        src="/images/reports/arrowArc.png"
        style={[styles.arrowArc, isList ? styles.arrowArcWithlist : {}]}
      />
    </>
  );
};
