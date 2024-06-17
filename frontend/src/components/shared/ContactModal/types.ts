type Section = {
  icon: 'phone' | 'envelope';
  label: string;
  labelPrefix?: string;
  value?: string;
};

export type ContactData = {
  title: string;
  description?: string;
  sections?: Section[];
};
