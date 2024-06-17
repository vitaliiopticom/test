import { FC, useMemo } from 'react';

import { StyleSheet, Text, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { LayoutBeforeAfter } from './LayoutBeforeAfter';

type Props = {
  type: string;
};

export const AiFeatures: FC<Props> = ({ type }) => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          marginTop: 33,
          marginLeft: 37,
          fontSize: 32,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontFamily: 'Outfit',
          color: '#20263D',
        },
        imagesWrapper: {
          position: 'relative',
          width: 620,
          height: 450,
          marginTop: 0,
          marginLeft: 8,
          backgroundColor: '#fff',
          padding: 24,
          zIndex: 10,
        },
        list: {
          position: 'absolute',
          top: 50,
          right: 12,
          width: 200,
        },
        chip: {
          width: '100%',
          height: 32,
          marginBottom: 7,
          paddingTop: 7,
          backgroundColor: '#A51271',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 14,
          fontFamily: 'Outfit',
          color: '#fff',
          textAlign: 'center',
        },
        chipLight: {
          backgroundColor: '#E4B8D4',
        },
      }),
    [],
  );

  const texts = [
    {
      name: 'custom3dBox',
      isLight: false,
    },
    {
      name: 'personalizedBranding',
      isLight: false,
    },
    {
      name: 'licensePlateCover',
      isLight: false,
    },
    {
      name: 'actualRendering',
      isLight: false,
    },
    {
      name: 'rimsGroundReflections',
      isLight: false,
    },
    {
      name: 'castShadows',
      isLight: false,
    },
    {
      name: 'antiReflectiveBodywork',
      isLight: false,
    },
    {
      name: '360deg',
      isLight: false,
    },
    {
      name: 'damageDetection',
      isLight: true,
    },
    {
      name: 'damageCorrection',
      isLight: true,
    },
    {
      name: 'polish',
      isLight: true,
    },
  ];

  const list = (
    <View style={styles.list}>
      {texts.map(({ name, isLight }, index) => (
        <Text
          key={index}
          style={[styles.chip, isLight ? styles.chipLight : {}]}
        >
          {t(`audit.report.${name}`)}
        </Text>
      ))}
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>{t('audit.report.aiFeatures')}</Text>
      <View style={styles.imagesWrapper}>
        <LayoutBeforeAfter
          afterImagePath="/images/reports/carAfterEnvironment.jpg"
          beforeImagePath="/images/reports/carBeforeEnvironment.jpg"
          type={type}
          isList
        />
      </View>
      {list}
    </View>
  );
};
