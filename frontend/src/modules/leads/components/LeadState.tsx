import { useEffect, useState } from 'react';
import { Dropdown } from '@/components/elements';
import { Button } from '@/components/elements';
// import { useTranslation } from '@/i18n';

import { LeadStateEnum } from '../types/leadTypes';

interface LeadStateProps {
  code: LeadStateEnum;
}

type Props = {
  onChange: (v: any) => void;
  value: string | undefined;
}

const options: { label: string; code: string }[] = [{
  label: 'Choose state',
  code: ''
}];


for (const key in LeadStateEnum) {
  if (LeadStateEnum.hasOwnProperty(key)) {
    const enumKey = key as keyof typeof LeadStateEnum;
    options.push({ label: key, code: LeadStateEnum[enumKey] });
  }
}

/**
 * Component for selecting the lead state.
 */
export const LeadState = ({ onChange, value }: Props) => {
  /**
   * Handles the state change when a new state is selected.
   * @param state - The selected state.
   */
  const handleStateChange = (state: LeadStateProps) => {
    setSelectedState(state.code);
    onChange(state.code);
  };

  const [selectedState, setSelectedState] = useState<LeadStateEnum>((value || '') as LeadStateEnum);
  // const { t } = useTranslation();

  useEffect(() => {
    setSelectedState((value || '') as LeadStateEnum)
  }, [value]);

  return (
    <Dropdown
      items={options}
      render={({ item, defaultClassName }) => (
        <Button
          className={`${defaultClassName} ${
            item.code === selectedState ? 'active' : ''
          }`}
          variant="secondary"
          onClick={() => handleStateChange(item as LeadStateProps)}
        >
          {item.label}
        </Button>
      )}
    >
      {/* A button that displays the currently selected state */}
      <Button variant="secondary" className="whitespace-nowrap">
        {options.find((state) => state.code === selectedState)?.code ||
          options[0].label}
      </Button>
    </Dropdown>
  );
};
