import { FC } from 'react';

import { Image } from '@/components/shared/PdfCreator';

type Props = {
  top?: number;
  right?: number;
};

export const Blur: FC<Props> = ({ top = 0, right = 50 }) => {
  return (
    <Image
      src="/images/reports/blur.png"
      style={{ position: 'absolute', zIndex: 20, width: 320, top, right }}
    />
  );
};
