import { useState } from 'react';

import { Tooltip } from '@/components/elements';
import {
  AutocompleteDataSelectField,
  RequiredDataAutocompleteSelectFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { COMPANY_TYPE } from '@/modules/companies';

import { useGetCompaniesByDealerQuery } from '../api/getCompaniesByDealer';
import { Dealer } from '../types';

const mapDataToOption = (item: Dealer) => ({
  value: item.id,
  label: item.companyName,
});

type Props<Multi extends boolean> = RequiredDataAutocompleteSelectFieldProps<
  Dealer,
  Multi
>;

export const AUTOCOMPLETE_DEFAULT_OPTIONS = 20;

export const DealerSelect = <Multi extends boolean>(props: Props<Multi>) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data, previousData, loading } = useGetCompaniesByDealerQuery({
    variables: {
      filters: { search, companyType: COMPANY_TYPE.DEALERSHIP },
      paging: { pageIndex: 0, pageSize: AUTOCOMPLETE_DEFAULT_OPTIONS },
    },
    skip: !search.length,
  });

  const items = loading
    ? previousData?.companies?.items
    : data?.companies?.items || [];

  return (
    <Tooltip content={t('audit.dealerFilterTooltip')} placement="top">
      <div>
        <AutocompleteDataSelectField
          data={items}
          isLoading={loading}
          mapDataToOption={mapDataToOption}
          isMultiple
          onQueryChange={setSearch}
          {...props}
        />
      </div>
    </Tooltip>
  );
};
