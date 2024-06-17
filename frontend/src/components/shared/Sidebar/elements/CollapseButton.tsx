import { ButtonHTMLAttributes, FC } from 'react';

import { Icon } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { useLayout } from '../../Layout/Layout';

type Props = {
  className: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CollapseButton: FC<Props> = ({ className, ...rest }) => {
  const { t } = useTranslation();
  const { isCollapsed, setCollapsed, setMenuOpen } = useLayout();

  return (
    <button
      className={cx(
        'mb-4 ml-3.5 hidden h-9 items-center gap-2 rounded-full bg-secondary-tint-10 text-md font-medium text-white transition-colors hover:bg-secondary-tint-20 focus:bg-secondary-tint-20 focus:outline-none lg:flex',
        className,
        isCollapsed ? ' w-9 pl-2.5 pr-2' : ' py-1 pl-2.5 pr-5',
      )}
      type="button"
      onClick={() => {
        setMenuOpen(false);
        setCollapsed((prev) => !prev);
      }}
      {...rest}
    >
      <Icon className="h-4 w-4" name="collapse" />
      {isCollapsed ? '' : t('common.collapse')}
    </button>
  );
};
