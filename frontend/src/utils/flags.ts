import en from 'react-phone-number-input/locale/en.json';

const flagsTuples = [
  ...Object.entries(en),
  ['MD', 'Republic of Moldova'],
  ['KR', 'Korea'],
];

export const getFlagUrlByCountryCode = (code: string) => {
  if (!code) return;

  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;
};

export const getFlagUrlByCountryName = (name: string) => {
  if (!name) return;

  const country = flagsTuples.find(
    ([, countryName]) => countryName.toLowerCase() === name.toLowerCase(),
  );

  if (!country?.[0]) return;

  return getFlagUrlByCountryCode(country[0]);
};
