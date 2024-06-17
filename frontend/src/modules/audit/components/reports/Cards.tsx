import { FC, useMemo } from 'react';

import { Image, StyleSheet, Text, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

export const Cards: FC = () => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardsWrapper: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '32px 54px 54px',
        },
        card: {
          position: 'relative',
          width: 230,
          height: 340,
          marginTop: 30,
          padding: '44px 20px 24px',
          border: '2px solid #E5E3ED',
        },
        cardTextWrapper: {
          display: 'flex',
          height: 280,
          flexDirection: 'column',
          gap: 26,
        },
        cardTitle: {
          fontWeight: 600,
          fontFamily: 'Outfit',
        },
        cardDescription: {
          fontSize: 12,
          fontFamily: 'Outfit',
          lineHeight: 1.75,
        },
        cardExamples: {
          fontSize: 12,
          fontFamily: 'Outfit',
          lineHeight: 1.75,
        },
        cardCheck: {
          position: 'absolute',
          top: -19,
          left: 89,
          width: 38,
        },
        cardCheckBackground: {
          position: 'absolute',
          top: -16,
          left: 92,
          width: 32,
          height: 32,
          backgroundColor: '#fff',
          borderRadius: 16,
          zIndex: 5,
        },
      }),
    [],
  );

  const renderCard = (title: string, description: string, examples: string) => (
    <View key={title} style={styles.card}>
      <Image src="/images/reports/check.png" style={styles.cardCheck} />
      <Text style={styles.cardCheckBackground} />
      <View style={styles.cardTextWrapper}>
        <Text style={styles.cardTitle}>{t(title)}</Text>
        <Text style={styles.cardDescription}>{t(description)}</Text>
        <Text style={styles.cardExamples}>{t(examples)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.cardsWrapper}>
      {[1, 2, 3].map((number) =>
        renderCard(
          `audit.report.card${number}.title`,
          `audit.report.card${number}.description`,
          `audit.report.card${number}.examples`,
        ),
      )}
    </View>
  );
};
