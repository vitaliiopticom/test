import { FC, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import type { i18n } from 'i18next';

import {
  Document,
  Font,
  StyleSheet,
  Text,
  usePDF,
  View,
} from '@/components/shared/PdfCreator';
import { I18nextProvider, useTranslation } from '@/i18n';
import { openInNewTab } from '@/utils/url';

import { QuestionnaireAnswerImage, ReportDetail } from '../../types';

import { ContactsSlide } from './slides/ContactsSlide';
import { CustomBrandingSlide } from './slides/CustomBrandingSlide';
import { CustomPhotoboxSlide } from './slides/CustomPhotoboxSlide';
import { ImageOptimalization } from './slides/ImageOptimalization';
import { OptipixSlide } from './slides/OptipixSlide';
import { PlugPlaySlide } from './slides/PlugPlaySlide';
import { PresentationSlide } from './slides/PresentationsSlide';
import { ProcessOptimalizationSlide } from './slides/ProcessOptimalizationSlide';
import { AiFeatures } from './AiFeatures';
import { Blur } from './Blur';
import { Cards } from './Cards';
import { CheckMarks } from './CheckMarks';
import { Cover } from './Cover';
import { FullImageWithTitle } from './FullImageWithTitle';
import { ImageTemplates, TemplateImage } from './ImageTemplates';
import { LayoutBeforeAfter } from './LayoutBeforeAfter';
import { Page } from './Page';
import { Phototek } from './Phototek';
import { RenderingComparison } from './RenderingComparison';
import { Scoring } from './Scoring';
import { Thumb } from './Thumb';
import { VinRecognitionContent } from './VinRecognitionContent';

type Props = {
  report: ReportDetail;
  setLoading: (value: boolean) => void;
  i18n: i18n;
};

// IMPORTANT! Always use React.lazy and Suspense to import this module. It is very bundle heavy.
const AuditReportPdf: FC<Props> = ({ report, setLoading, i18n }) => {
  const { t } = useTranslation();

  const styles = useMemo(() => {
    return StyleSheet.create({
      pageTitle: {
        margin: '36px 0 0 53px',
        textTransform: 'uppercase',
        fontFamily: 'Outfit',
        fontSize: 32,
        maxWidth: 450,
        fontWeight: 600,
        color: '#20263D',
      },
      pageSubtitle: {
        marginLeft: 53,
        textTransform: 'uppercase',
        fontFamily: 'Outfit',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#20263D',
      },
      photosWrapper: {
        position: 'relative',
        width: 660,
        height: 382,
        marginTop: 44,
        marginLeft: 54,
        backgroundColor: '#fff',
        padding: 20,
        border: '3px solid #E5E3ED',
        zIndex: 10,
      },
    });
  }, []);

  const filterImagesByCode = useCallback(
    (code: string): QuestionnaireAnswerImage[] => {
      return (
        report.questionAnswers.find((item) => item.code === code)?.images ?? []
      );
    },
    [report.questionAnswers],
  );

  const getSlideImages = useCallback(
    (code: string): TemplateImage[] => {
      return (
        filterImagesByCode(code).reduce((acc, item, index) => {
          let url = new URL(item.thumbnailUri || item.uri);

          if (filterImagesByCode.length <= 2) {
            url = new URL(item.uri);
          }

          const pathParts = url.pathname
            .split('/')
            .map((part) => encodeURIComponent(decodeURIComponent(part)));
          url.pathname = pathParts.join('/');

          const imgSrc = url.toString();

          if (index % 2 === 0) {
            return [...acc, { imgSrc: imgSrc, href: '' }];
          } else {
            const lastItem = acc[acc.length - 1];

            const hrefParts = url.pathname
              .split('/')
              .map((part) => encodeURIComponent(decodeURIComponent(part)));
            url.pathname = hrefParts.join('/');

            const href = url.toString();

            return [
              ...acc.slice(0, acc.length - 1),
              { ...lastItem, href: href },
            ];
          }
        }, [] as TemplateImage[]) || []
      );
    },
    [filterImagesByCode],
  );

  const contactImages = filterImagesByCode('Contacts').map((item) => ({
    imgSrc: item.uri,
    href: item.uri,
  }));
  const environmentImages = getSlideImages('EnvironmentEstetique');
  const reflectionsImages = getSlideImages('Reflections');
  const scalingOrientationImages = getSlideImages('VehicleOrientation');
  const cleanlinessImages = getSlideImages('Cleanliness');
  const harmonyPresentationBad = filterImagesByCode('PresentationHarmony').map(
    (image) => image.uri,
  );

  const pages = [
    //page 2 static
    {
      component: (
        <View>
          <Text
            style={[
              styles.pageTitle,
              { top: 38, fontWeight: 600, maxWidth: 600 },
            ]}
          >
            {t('audit.report.auditAndAdvice')}
          </Text>
          <Text style={[styles.pageSubtitle, { top: 38, fontWeight: 600 }]}>
            {t('audit.report.initialDiagnostic')}
          </Text>
          <CheckMarks />
        </View>
      ),
      isDarkPageNumber: true,
      isTopBgDark: true,
    },
    //page 3 static
    {
      component: (
        <Cover
          customTitleV2={{
            title: t(`audit.type.${report.questionnaireType}`),
            subtitle: t('audit.report.auditPart1'),
          }}
        />
      ),
      isPageNumberHidden: true,
    },
    //page 4 dynamic
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('common.environment')}
          </Text>
          <Thumb type="down" />
          <View style={styles.photosWrapper}>
            <ImageTemplates images={environmentImages} />
          </View>
          <Blur />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 5 static
    {
      component: (
        <View>
          <Text style={styles.pageTitle}>
            {t('common.solution')} {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.pageSubtitle}>{t('common.environment')}</Text>
          <Thumb type="up" />
          <View style={styles.photosWrapper}>
            <LayoutBeforeAfter
              afterImagePath="/images/reports/carAfterEnvironment.jpg"
              beforeImagePath="/images/reports/carBeforeEnvironment.jpg"
              type={report.questionnaireType}
            />
          </View>
          <Blur top={10} />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 6 dynamic
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('audit.report.reflections')}
          </Text>
          <Thumb type="down" />
          <View style={styles.photosWrapper}>
            <ImageTemplates images={reflectionsImages} />
          </View>
          <Blur />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 7 static
    {
      component: (
        <View>
          <Text style={styles.pageTitle}>
            {t('common.solution')} {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.pageSubtitle}>
            {t('audit.report.reflections')}
          </Text>
          <Thumb type="up" />
          <View style={styles.photosWrapper}>
            <LayoutBeforeAfter
              afterImagePath="/images/reports/carAfterReflections.jpg"
              beforeImagePath="/images/reports/carBeforeReflections.jpg"
              type={report.questionnaireType}
            />
          </View>
          <Blur top={10} />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 8 dynamic
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('audit.report.scalingOrientation')}
          </Text>
          <Thumb type="down" />
          <View style={styles.photosWrapper}>
            <ImageTemplates images={scalingOrientationImages} />
          </View>
          <Blur />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 9 static
    {
      component: (
        <View>
          <Text style={styles.pageTitle}>
            {t('common.solution')} {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.pageSubtitle}>
            {t('audit.report.scalingOrientation')}
          </Text>
          <Thumb type="up" />
          <View style={styles.photosWrapper}>
            <LayoutBeforeAfter
              afterImagePath="/images/reports/carAfterScaling.jpg"
              beforeImagePath="/images/reports/carBeforeScaling.jpg"
              type={report.questionnaireType}
            />
          </View>
          <Blur top={10} />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 10 dynamic
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('audit.report.cleanliness')}
          </Text>
          <Thumb type="down" />
          <View style={styles.photosWrapper}>
            <ImageTemplates images={cleanlinessImages} />
          </View>
          <Blur />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 11 static
    {
      component: (
        <View>
          <Text style={styles.pageTitle}>
            {t('common.solution')} {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.pageSubtitle}>
            {t('audit.report.cleanliness')}
          </Text>
          <Thumb type="up" />
          <View style={styles.photosWrapper}>
            <LayoutBeforeAfter
              afterImagePath="/images/reports/carAfterCleaning.jpg"
              beforeImagePath="/images/reports/carBeforeCleaning.png"
              type={report.questionnaireType}
            />
          </View>
          <Blur top={10} />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 12 dynamic
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('audit.report.harmonyAndGeneralPresentation')}
          </Text>
          <Thumb style={{ top: 30 }} type="down" />
          <PresentationSlide images={harmonyPresentationBad} withList />
        </View>
      ),
      isFooter: true,
    },
    //page 13 static
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 60 }]}>
            {t('common.solution')} {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.pageSubtitle}>
            {t('audit.report.harmonyAndGeneralPresentation')}
          </Text>
          <Thumb type="up" />
          <PresentationSlide
            images={['/images/reports/harmonyPresentationGood.png']}
          />
        </View>
      ),
      isFooter: true,
    },
    //page 14
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50, maxWidth: 700 }]}>
            {t('audit.report.estimatedHiddenCosts')}
          </Text>
          <Cards />
        </View>
      ),
      isFooter: true,
    },
    //page 15
    {
      component: (
        <View>
          <Text style={{ ...styles.pageTitle, maxWidth: 700 }}>
            {t('audit.report.scoring')}
          </Text>
          <Text style={styles.pageSubtitle}>{t('audit.type.OPTI_PIX')}</Text>
          <Scoring
            auditGroups={report.groups}
            companyName={report.companyName}
            rating={{
              ratingNumber: report.rating.stars.score,
              ratingMaxNumber: report.rating.stars.max,
              nationalAverage: 4.0, //TODO integrate, 4.0 is mocked
            }}
          />
        </View>
      ),
      isFooter: true,
    },
    //page 16
    {
      component: (
        <Cover
          customTitleV1={{
            title: t(`audit.type.${report.questionnaireType}`),
            subtitle: t('audit.report.productPresentationAndFeatureLine1'),
            subtitle2: t('audit.report.productPresentationAndFeatureLine2'),
          }}
        />
      ),
      isPageNumberHidden: true,
    },
    //page 17
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>OPTI(PIX)</Text>
          <OptipixSlide />
          <Blur right={0} top={40} />
        </View>
      ),
      isRightBgDark: true,
    },
    //page 18
    {
      component: <ProcessOptimalizationSlide />,
      isLeftBgLight: true,
      isRightBottomBgDark: true,
    },
    //page 19
    {
      component: <PlugPlaySlide />,
      isDarkPageNumber: true,
      isLeftTopBgDark: true,
      isRightBottomBgLight: true,
    },
    //page 20
    {
      component: <CustomPhotoboxSlide />,
      isDarkPageNumber: true,
      isLeftBgDark: true,
      isRightBgLight: true,
    },
    //page 21
    {
      component: (
        <View>
          <Text style={{ ...styles.pageTitle, margin: '36px 0 0 53px' }}>
            {t('audit.report.vinRecognition')}
          </Text>
          <VinRecognitionContent />
        </View>
      ),
      isDarkPageNumber: true,
      isLeftBottomBgLight: true,
      isRightTopBgDark: true,
    },
    //page 22
    {
      component: (
        <FullImageWithTitle
          imagePath="/images/reports/reprocessedPhotos.png"
          title={t('audit.report.photosReprocessed')}
        />
      ),
      isDarkPageNumber: true,
      isCenterBottomBgLight: true,
      isRightTopBgDark2: true,
    },
    //page 23
    {
      component: <CustomBrandingSlide />,
      isDarkPageNumber: true,
      isBeforeBgDark: true,
      isAfterBgLight: true,
    },
    //page 24
    {
      component: <ImageOptimalization />,
      isDarkPageNumber: true,
      isCenterLeftBgLight: true,
      isCenterRightBgDark: true,
    },
    //page 25
    {
      component: (
        <View>
          <Text
            style={[styles.pageTitle, { maxWidth: 700, margin: '60px 40px' }]}
          >
            {t('audit.report.realAndQualitativeRendering')}
          </Text>
          <RenderingComparison />
        </View>
      ),
      isDarkPageNumber: true,
      isRightTopBgDark3: true,
      isBottomBgLight: true,
    },
    //page 26
    {
      component: <Phototek />,
      isDarkPageNumber: true,
      isLeftTopBgDark2: true,
      isCenterTopBottomBgLight: true,
    },
    //page 27
    {
      component: (
        <FullImageWithTitle
          imagePath="/images/reports/new360virtual.png"
          title={t('audit.report.new360virtual')}
        />
      ),
      isDarkPageNumber: true,
      isCenterBottomBgLight: true,
      isRightTopBgDark2: true,
    },
    //page 28
    {
      component: <AiFeatures type={report.questionnaireType} />,
      isFooter: true,
    },
    //page 29
    {
      component: (
        <View>
          <Text style={[styles.pageTitle, { marginTop: 50 }]}>
            {t('common.contacts')}
          </Text>
          <ContactsSlide items={contactImages} />
        </View>
      ),
      isFooter: true,
    },
    //page 30
    {
      component: (
        <Cover
          customTitleV1={{
            subtitle: t('audit.report.thankYouLine1'),
            subtitle2: t('audit.report.thankYouLine2'),
          }}
        />
      ),
      isPageNumberHidden: true,
    },
  ];

  const document = (
    <Document>
      <I18nextProvider i18n={i18n}>
        <Page>
          <Cover report={report} />
        </Page>
        {pages.map((page, index) => (
          <Page key={index} index={index} {...page}>
            {page.component}
          </Page>
        ))}
      </I18nextProvider>
    </Document>
  );

  const [instance] = usePDF({ document });

  useEffect(() => {
    setLoading(instance.loading);

    return () => setLoading(false);
  }, [instance.loading, setLoading]);

  useEffect(() => {
    if (!instance.url) return;

    openInNewTab(instance.url);
  }, [instance.url]);

  useLayoutEffect(() => {
    Font.register({
      family: 'Outfit',
      fonts: [
        {
          src: '/fonts/outfit400.ttf',
        },
        {
          src: '/fonts/outfit600.ttf',
          fontWeight: 600,
        },
      ],
    });
  }, []);

  return null;
};

export default AuditReportPdf;
