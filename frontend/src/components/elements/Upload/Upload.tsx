import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
} from 'react';
import {
  DropzoneInputProps,
  DropzoneOptions,
  DropzoneState,
  useDropzone,
} from 'react-dropzone';

import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import {
  buttonBaseStyles,
  buttonIconSizes,
  ButtonProps,
  buttonSizes,
  buttonVariants,
} from '../Button/Button';
import { Icon, IconName } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';

const getInnerInfoMessage = ({
  isDragActive,
  isDragAccept,
  isDragReject,
}: DropzoneState) => {
  if (isDragActive && !isDragAccept && !isDragReject) {
    return 'components.upload.dropFiles';
  }

  if (isDragAccept) {
    return 'components.upload.acceptedFiles';
  }

  if (isDragReject) {
    return 'components.upload.rejectedFiles';
  }

  return 'components.upload.dragAndDrop';
};

export type UploadValue<Multi extends boolean = false> = Multi extends true
  ? File[]
  : File | null;

type RenderArgs<Multi extends boolean = false> = {
  node: ReactNode;
  value?: UploadValue<Multi>;
};

export type UploadProps<Multi extends boolean = false> = {
  value?: UploadValue<Multi>;
  onChange?: (files: UploadValue<Multi>) => void;
  isMultiple?: Multi;
  uploadIconName?: IconName;
  isUploading?: boolean;
  variant?: 'dropzone' | 'button';
  render?: (args: RenderArgs<Multi>) => ReactNode;
  className?: string;
  buttonText?: string;
  buttonSize?: ButtonProps['size'];
} & Pick<DropzoneInputProps, 'onBlur' | 'id' | 'name'> &
  Omit<DropzoneOptions, 'onDrop' | 'multiple'>;

const UploadInner = <Multi extends boolean = false>(
  {
    onChange,
    onBlur,
    isMultiple = false as Multi,
    id,
    name,
    value,
    disabled,
    uploadIconName = 'upload',
    variant = 'dropzone',
    buttonText,
    buttonSize = 'md',
    isUploading,
    render,
    className,
    ...rest
  }: UploadProps<Multi>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const onDrop = useCallback(
    (files: File[]) => {
      onChange?.((isMultiple ? files : files[0]) as UploadValue<Multi>);
    },
    [onChange, isMultiple],
  );

  const isDisabled = disabled || isUploading;
  const isButtonVariant = variant === 'button';
  const { t } = useTranslation();
  const dropzone = useDropzone({
    multiple: isMultiple,
    onDrop,
    disabled: isDisabled,
    ...rest,
    noDrag: isButtonVariant,
  });

  const node = isButtonVariant ? (
    <div
      className={cx(
        buttonBaseStyles,
        buttonVariants.secondary,
        buttonSizes[buttonSize],
        'cursor-pointer',
        !isDisabled && 'hover:border-primary hover:text-primary',
        isDisabled &&
          'cursor-not-allowed border-gray-50 bg-white text-secondary-tint-70 hover:border-gray-50 hover:text-secondary-tint-70',
        className,
      )}
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps({ id, name, onBlur })} />
      {isUploading ? (
        <Spinner size={false} />
      ) : (
        <Icon
          className={cx(
            buttonIconSizes[buttonSize],
            isDisabled ? 'text-secondary-tint-70' : 'text-primary',
          )}
          name={uploadIconName}
        />
      )}
      <Text size={buttonSize} variant="bold">
        {buttonText || t('users.upload')}
      </Text>
    </div>
  ) : (
    <div
      className={cx(
        'flex cursor-pointer flex-col items-center rounded border border-dashed px-12 py-7 text-center transition-colors hover:bg-gray-30 hover:text-primary-shade-40 focus:bg-gray-30 focus:text-primary-shade-40 focus:outline-none focus:ring-0',
        isDisabled &&
          'cursor-not-allowed text-secondary-tint-70 hover:bg-gray-20 hover:text-secondary-tint-70',
        isDisabled ? 'border-gray-60 bg-gray-20' : 'border-gray-90 bg-gray-10',
        className,
      )}
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps({ onBlur, id, name, ref })} />
      {isUploading ? (
        <Spinner className="mb-4 h-14 w-14" size={false} />
      ) : (
        <Icon className="mb-4 h-14 w-14 text-gray-40" name={uploadIconName} />
      )}
      <Text className="mb-2" size="lg" variant="bold">
        {t(getInnerInfoMessage(dropzone))}
      </Text>
      <Text className="text-primary" size="sm">
        {t('components.upload.smallText')}
      </Text>
    </div>
  );

  return render ? <>{render({ value, node })}</> : node;
};

export const Upload = forwardRef(UploadInner) as <
  Multi extends boolean = false,
>(
  props: UploadProps<Multi> & { ref?: Ref<HTMLInputElement> },
) => ReactElement;
