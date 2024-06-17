import { FC } from 'react';

import {
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
} from '@/components/elements';
import { FetchFile } from '@/components/shared';

type Props = {
  className?: string;
  downloadUri?: string;
  tooltipContent?: TooltipProps['content'];
  tooltipPlacement?: TooltipProps['placement'];
} & Pick<IconButtonProps, 'disabled' | 'isLoading'>;

export const DownloadIconButton: FC<Props> = ({
  downloadUri,
  className,
  isLoading,
  disabled,
  tooltipContent,
  tooltipPlacement = 'top',
}) => {
  return (
    <FetchFile className={className}>
      {(args) => (
        <Tooltip content={tooltipContent} placement={tooltipPlacement}>
          <IconButton
            disabled={!downloadUri || disabled}
            isLoading={args.state.isLoading || isLoading}
            name="downloadCloud"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              args.saveFile(downloadUri);
            }}
          />
        </Tooltip>
      )}
    </FetchFile>
  );
};
