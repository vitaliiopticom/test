import {
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from 'react';

import { cx } from '@/utils/classNames';

type VideoType = 'video/mp4' | 'video/webm' | 'video/ogg' | string;

type VideoSource = {
  src: string;
  type?: VideoType;
};

type Props = {
  sources?: VideoSource[];
  fallbackMessage?: ReactElement;
} & VideoHTMLAttributes<HTMLVideoElement>;

export const VideoPlayer = forwardRef<HTMLSourceElement, Props>(
  ({ className, fallbackMessage, src, sources, onError, ...rest }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => videoRef?.current?.load(), [sources]);

    return (
      <>
        {isError && fallbackMessage}
        <video
          ref={videoRef}
          className={cx('w-full rounded-lg object-cover', className)}
          {...rest}
          onError={() => setIsError(true)}
        >
          {sources?.map(({ src, type }, index) => (
            <source
              key={index}
              ref={ref}
              src={src}
              type={type || 'video/mp4'}
            />
          ))}
        </video>
      </>
    );
  },
);
