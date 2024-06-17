export type ModalProps<D> = {
  isOpen: boolean;
  onClose: () => void;
  data?: D;
  className?: string;
};
