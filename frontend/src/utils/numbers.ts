export const parseNumber = (value: string) => {
  try {
    const parsed = parseFloat(value);

    return isNaN(parsed) ? null : parsed;
  } catch {
    return null;
  }
};

export const checkIsEvenNumber = (n: number) => n % 2 === 0;
