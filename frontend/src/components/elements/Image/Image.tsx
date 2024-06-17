import React, { forwardRef, ImgHTMLAttributes, useCallback } from 'react';

export type ImageProps = {
  alt: string;
  fallbackPath?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, fallbackPath, onError, ...rest }, ref) => {
    const handleOnError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (fallbackPath) {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackPath;
        }

        onError?.(event);
      },
      [onError, fallbackPath],
    );

    return <img ref={ref} alt={alt} {...rest} onError={handleOnError} />;
  },
);
