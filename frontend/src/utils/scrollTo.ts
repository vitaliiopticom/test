export const scrollTo = (element: HTMLElement | null, offset?: number) => {
  if (element) {
    const top =
      element.getBoundingClientRect().top + window.scrollY - (offset ?? 0);

    window.scrollTo({ top, behavior: 'smooth' });
  }
};
