import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { LANGS } from '@/i18n';
import { DropDownSelectOption } from '@/types/form';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  DropDownSelectOption,
  Multi
>;

const languages = LANGS.map((lang) => ({
  id: lang.code,
  name: lang.label,
}));

export const UserLanguageSelect = <Multi extends boolean>(
  props: Props<Multi>,
) => {
  return <DataSelectField data={languages} {...props} />;
};
