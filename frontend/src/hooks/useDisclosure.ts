import { useCallback, useMemo, useState } from 'react';

export const useDisclosure = (initialValue = false) => {
  const [isOpen, setOpen] = useState(initialValue);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return useMemo(
    () => ({ isOpen, setOpen, toggle, onClose, onOpen }),
    [toggle, isOpen, onClose, onOpen],
  );
};
