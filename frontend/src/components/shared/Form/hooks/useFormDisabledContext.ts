import { useContext } from 'react';

import { FormDisabledContext, FormDisabledContextType } from '../Form';

export const useFormDisabledContext = () => {
  const context = useContext<FormDisabledContextType>(FormDisabledContext);

  if (!context) {
    throw new Error('Component must be used inside of Form');
  }

  return context;
};
